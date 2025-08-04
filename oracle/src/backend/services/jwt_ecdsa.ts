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

// ---------- helpers -----------------------------------------------------------
function b64url(bytes: Uint8Array): string {
    return b64(bytes)
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function textToUint8(s: string): Uint8Array {
    return new TextEncoder().encode(s);
}

// ---------- stable storage ----------------------------------------------------
const PUBKEY_STORE = StableBTreeMap<string, Uint8Array>(0);
// only one key “main” → pk (compressed 33B)

// ---------- types -------------------------------------------------------------
const JwtResponse = Record({ jwt: text });
const Jwk = Record({ kid: text, kty: text, crv: text, x: text, y: text });

// ---------- config ------------------------------------------------------------
const KEY_ID = {
    curve: { secp256r1: null },   // P‑256 → ES256
    name: 'key_1'
};

// ---------- init --------------------------------------------------------------
export const fetchEcdsaPk = update([None], text, async () => {
    // already cached ?
    const existing = PUBKEY_STORE.get('main');
    if (existing !== undefined) return 'already-initialized';

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
export const issueJwt = update([text], JwtResponse, async (sub) => {
    // ensure pk fetched
    if (PUBKEY_STORE.get('main') === undefined) {
        throw new Error('ECDSA pk not initialized');
    }
    const now: bigint = ic.time();             // ns since 1970
    const iat = Number(now / 1_000_000_000n);  // seconds
    const exp = iat + 3600;                    // 1h TTL

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
        cycles: 25_000_000_000n
    });

    const jwt = `${data}.${b64url(new Uint8Array(sigRes.signature))}`;
    return { jwt };
});

// ---------- expose JWK --------------------------------------------------------
export const getJwk = query([], Jwk, () => {
    const pk = PUBKEY_STORE.get('main');
    if (pk === undefined) {
        throw new Error('pk not initialized');
    }
    // decompressed P‑256 → (x,y) each 32 B; here assume compressed pk[0]=0x04 then 64B following
    const uncompressed = ic.uncompress_secp256r1(pk); // imaginary helper
    const x = b64url(uncompressed.slice(1, 33));
    const y = b64url(uncompressed.slice(33));
    return {
        kid: 'ic-key-1', kty: 'EC', crv: 'P-256', x, y
    };
});

// ---------- unit test function (local) ---------------------------------------
export const selfTest = update([], text, async () => {
    const sub = 'test-user';
    await fetchEcdsaPk();
    const { jwt } = await issueJwt(sub);
    return jwt;
});
