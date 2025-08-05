// src/backend/services/jwt_ecdsa.ts
// -----------------------------------------------------------------------------
// AZLE module that provides: 1) one‑time initialization to fetch the subnet
//    ECDSA public key (P‑256), 2) an update call that issues ES256 JWTs signed
//    via threshold‑ECDSA, 3) a query to expose the public key in JWK format.
// -----------------------------------------------------------------------------
// Refs:
// • IC t‑ECDSA API – sign_with_ecdsa, ecdsa_public_key          (docs) ([internetcomputer.org](https://internetcomputer.org/docs/building-apps/network-features/signatures/t-ecdsa?utm_source=chatgpt.com))
// • Azle sign_with_ecdsa example                                ([demergent-labs.github.io](https://demergent-labs.github.io/azle/reference/management_canister/sign_with_ecdsa.html?utm_source=chatgpt.com))
// • JWT ES256 structure & base64url rules                      ([stackoverflow.com](https://stackoverflow.com/questions/66437795/jwt-generate-token-with-algorithm-es256?utm_source=chatgpt.com), [stackoverflow.com](https://stackoverflow.com/questions/5234581/base64url-decoding-via-javascript?utm_source=chatgpt.com), [gist.github.com](https://gist.github.com/sdesalas/4bc58e1bd6d79daf5236de4ed91fbd5a?utm_source=chatgpt.com))

import {
    blob, text, nat64, update, query, ic, Opt, None, Record, StableBTreeMap,
} from 'azle';
import { managementCanister } from 'azle/canisters/management';
import { sha256 } from '@cosmjs/crypto';   // lightweight sha‑2 impl
import { encode as b64 } from 'base64-arraybuffer';

// ---------- constants ---------------------------------------------------------
const JWT_TOKEN_TTL_SECONDS = 3600; // 1 hour token lifetime
const ECDSA_SIGNATURE_CYCLES = 25_000_000_000n; // cycles required for ECDSA signing
const NANOSECONDS_TO_SECONDS = 1_000_000_000n; // conversion factor
const P256_COMPRESSED_KEY_LENGTH = 33; // compressed P-256 key size in bytes
const P256_UNCOMPRESSED_KEY_LENGTH = 65; // uncompressed P-256 key size in bytes
const P256_COORDINATE_LENGTH = 32; // x,y coordinate length in bytes

// ---------- helpers -----------------------------------------------------------
/**
 * Converts bytes to base64url encoding by replacing URL-unsafe characters.
 * @param {Uint8Array} bytes - The bytes to encode.
 * @returns {string} Base64url encoded string.
 */
function b64url(bytes: Uint8Array): string {
    return b64(bytes)
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Converts text string to Uint8Array for cryptographic operations.
 * @param {string} s - The text string to convert.
 * @returns {Uint8Array} UTF-8 encoded bytes.
 */
function textToUint8(s: string): Uint8Array {
    return new TextEncoder().encode(s);
}

// ---------- stable storage ----------------------------------------------------
const PUBKEY_STORE = StableBTreeMap<string, Uint8Array>(0);
// only one key "main" → pk (compressed 33B)

// ---------- types -------------------------------------------------------------
const JwtResponse = Record({ jwt: text });
const Jwk = Record({ kid: text, kty: text, crv: text, x: text, y: text });

// ---------- config ------------------------------------------------------------
const KEY_ID = {
    curve: { secp256r1: null },   // P‑256 → ES256
    name: 'key_1'
};

// ---------- init --------------------------------------------------------------
/**
 * Fetches and caches the ECDSA public key from the Internet Computer subnet.
 * This function must be called once before issuing JWTs to initialize the public key.
 * @param {Opt<null>} _ - Unused parameter (required by Azle update signature).
 * @returns {Promise<string>} Status message indicating initialization result.
 */
export const fetchEcdsaPk = update([None], text, async (_: Opt<null>) => {
    // Check if already cached to avoid redundant API calls
    const existing = PUBKEY_STORE.get('main');
    if (existing !== undefined) {
        return 'already-initialized';
    }

    const res = await ic.call(managementCanister.ecdsa_public_key, {
        args: [{
            canister_id: Opt(None),
            derivation_path: [],
            key_id: KEY_ID
        }]
    });
    
    PUBKEY_STORE.insert('main', res.public_key);
    return 'ok';
});

// ---------- issue JWT ---------------------------------------------------------
/**
 * Issues an ES256 JWT token signed using threshold-ECDSA.
 * The token contains the provided subject and has a 1-hour expiration.
 * @param {string} sub - The subject identifier for the JWT token.
 * @returns {Promise<{jwt: string}>} Object containing the signed JWT token.
 * @throws {Error} When ECDSA public key is not initialized.
 */
export const issueJwt = update([text], JwtResponse, async (sub: string) => {
    // Ensure public key is fetched before signing to prevent runtime errors
    if (PUBKEY_STORE.get('main') === undefined) {
        throw new Error('ECDSA public key not initialized. Call fetchEcdsaPk first.');
    }
    
    const now: bigint = ic.time();             // ns since 1970
    const iat = Number(now / NANOSECONDS_TO_SECONDS);  // seconds
    const exp = iat + JWT_TOKEN_TTL_SECONDS;   // 1h TTL

    const header = { alg: 'ES256', typ: 'JWT' };
    const payload = { sub, iat, exp };

    const headerB64 = b64url(textToUint8(JSON.stringify(header)));
    const payloadB64 = b64url(textToUint8(JSON.stringify(payload)));
    const data = `${headerB64}.${payloadB64}`;
    const hash = sha256(textToUint8(data));

    const sigRes = await ic.call(managementCanister.sign_with_ecdsa, {
        args: [{
            message_hash: Array.from(hash),
            derivation_path: [],
            key_id: KEY_ID
        }],
        cycles: ECDSA_SIGNATURE_CYCLES
    });

    const jwt = `${data}.${b64url(new Uint8Array(sigRes.signature))}`;
    return { jwt };
});

// ---------- expose JWK --------------------------------------------------------
/**
 * Returns the ECDSA public key in JWK (JSON Web Key) format.
 * This allows external systems to verify JWT signatures issued by this canister.
 * @returns {{kid: string, kty: string, crv: string, x: string, y: string}} JWK object containing the public key.
 * @throws {Error} When public key is not initialized.
 */
export const getJwk = query([], Jwk, () => {
    const pk = PUBKEY_STORE.get('main');
    if (pk === undefined) {
        throw new Error('Public key not initialized. Call fetchEcdsaPk first.');
    }
    
    // Decompress P-256 key to get x,y coordinates for JWK format
    // Note: This assumes the key is in compressed format (33 bytes)
    if (pk.length !== P256_COMPRESSED_KEY_LENGTH) {
        throw new Error(`Invalid public key length: expected ${P256_COMPRESSED_KEY_LENGTH}, got ${pk.length}`);
    }
    
    // For compressed P-256 keys, we need to decompress to get x,y coordinates
    // This is a simplified implementation - in production, use proper P-256 decompression
    const uncompressed = decompressSecp256r1(pk);
    const x = b64url(uncompressed.slice(1, P256_COORDINATE_LENGTH + 1));
    const y = b64url(uncompressed.slice(P256_COORDINATE_LENGTH + 1));
    
    return {
        kid: 'ic-key-1', 
        kty: 'EC', 
        crv: 'P-256', 
        x, 
        y
    };
});

/**
 * Decompresses a compressed P-256 public key to get x,y coordinates.
 * This is a placeholder implementation - replace with proper P-256 decompression.
 * @param {Uint8Array} compressedKey - The compressed P-256 public key.
 * @returns {Uint8Array} The uncompressed public key with x,y coordinates.
 */
function decompressSecp256r1(compressedKey: Uint8Array): Uint8Array {
    // TODO: Implement proper P-256 decompression
    // This is a placeholder that should be replaced with actual implementation
    // or use a library that provides P-256 decompression
    throw new Error('P-256 decompression not implemented. Use a proper cryptographic library.');
}

// ---------- unit test function (local) ---------------------------------------
/**
 * Performs a self-test of the JWT functionality.
 * This function fetches the public key, issues a test JWT, and returns it for verification.
 * @returns {Promise<string>} A test JWT token for the subject 'test-user'.
 */
export const selfTest = update([], text, async () => {
    const sub = 'test-user';
    await fetchEcdsaPk();
    const { jwt } = await issueJwt(sub);
    return jwt;
});
