// JWTService — ES256K (secp256k1) via t-ECDSA do IC, formatando JWT em JWS compact.
// - fetchEcdsaPk: busca e cacheia a public key (SEC1 comprimida, 33 bytes)
// - issueJwt / issueJwtAt / issueJwtAtWith: emite JWT com iss/sub/iat/nbf/exp/jti (+aud/htm/htu/bod)
// - getCompressedPk: retorna a pk comprimida
// - configureKey/configureCycles: configuráveis em runtime (agnóstico para grant)
// - selfTest: fluxo de teste local
//
// Notas de protocolo:
// • sign_with_ecdsa retorna assinatura como r||s (64 bytes, cada um 32B big-endian). NÃO é DER.
// • No JWS/JOSE para ES256K, a assinatura deve ser r||s em base64url.
// • TTL curto (5 min) + jti p/ anti-replay.
//
// Dependências: "azle" ^0.32.0, "js-sha256" ^0.11.0

import { IDL, call, canisterSelf, Principal } from 'azle';
import { sha256 } from 'js-sha256';

// ----------------------------- Constantes ------------------------------
const MGMT = 'aaaaa-aa'; // management canister
const TTL_SECONDS = 300; // 5 minutos
const DEFAULT_SIGN_CYCLES = 27_000_000_000n; // >= custo típico

// -------------------------- Helpers utilitárias ------------------------
const te = new TextEncoder();

/**
 * Converts Uint8Array to Base64URL string without using Buffer or btoa
 * @param {Uint8Array} u8 - Input byte array to encode
 * @returns {string} Base64URL encoded string
 */
function b64url(u8: Uint8Array): string {
  const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let out = '';
  for (let i = 0; i < u8.length; i += 3) {
    const a = u8[i] ?? 0;
    const b = u8[i + 1] ?? 0;
    const c = u8[i + 2] ?? 0;
    const t = (a << 16) | (b << 8) | c;
    out += table[(t >>> 18) & 63] + table[(t >>> 12) & 63] +
      (i + 1 < u8.length ? table[(t >>> 6) & 63] : '=') +
      (i + 2 < u8.length ? table[t & 63] : '=');
  }
  return out.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/**
 * Computes SHA-256 hash of input and returns as Uint8Array
 * @param {Uint8Array} input - Input data to hash
 * @returns {Uint8Array} 32-byte SHA-256 hash
 */
function sha256u8(input: Uint8Array): Uint8Array {
  return Uint8Array.from(sha256.array(input));
}

/**
 * Creates canonical JSON string with stable field order for header/payload
 * @param {Record<string, unknown>} obj - Object to stringify
 * @param {string[]} order - Array defining field order
 * @returns {string} Canonical JSON string
 */
function stableStringify(obj: Record<string, unknown>, order: string[]): string {
  const o: Record<string, unknown> = {};
  for (const k of order) if (obj[k] !== undefined) o[k] = obj[k];
  return JSON.stringify(o);
}

/**
 * Generates unique JTI with entropy from raw_rand + extra data
 * @param {string} extra - Additional data to include in JTI generation
 * @returns {Promise<string>} Unique JWT ID for anti-replay protection
 */
async function generateJti(extra: string): Promise<string> {
  try {
    const bytes = await call<[], Uint8Array>(MGMT, 'raw_rand', {
      paramIdlTypes: [],
      returnIdlType: IDL.Vec(IDL.Nat8),
      args: [],
      cycles: 0n
    });
    const h = sha256u8(Uint8Array.from([...bytes.slice(0, 16), ...te.encode(extra)]));
    return b64url(h).slice(0, 22);
  } catch {
    const h = sha256u8(te.encode(extra));
    return b64url(h).slice(0, 22);
  }
}

// -------------------------- IDL t-ECDSA -------------------------------
const KeyId = IDL.Record({
  curve: IDL.Variant({ secp256k1: IDL.Null }),
  name: IDL.Text
});
const EcdsaPublicKeyArgs = IDL.Record({
  canister_id: IDL.Opt(IDL.Principal),
  derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
  key_id: KeyId
});
const EcdsaPublicKeyReply = IDL.Record({
  public_key: IDL.Vec(IDL.Nat8),
  chain_code: IDL.Vec(IDL.Nat8)
});
const SignWithEcdsaArgs = IDL.Record({
  message_hash: IDL.Vec(IDL.Nat8), // 32B SHA-256
  derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
  key_id: KeyId
});
const SignWithEcdsaReply = IDL.Record({
  signature: IDL.Vec(IDL.Nat8) // r||s (64B) para secp256k1
});

// ------------------------------ Serviço -------------------------------
export class JWTService {
  private cachedPk: Uint8Array | null = null; // SEC1 comprimida (33B)
  private keyName: string = 'key_1';          // configure via jwt_configureKey
  private cyclesForSign: bigint = DEFAULT_SIGN_CYCLES;

  /**
   * Configures the ECDSA key name for JWT signing operations
   * @param {string} name - Key name identifier (max 64 characters)
   * @throws {Error} When key name is invalid or too long
   */
  configureKey(name: string) {
    if (!name || name.length > 64) throw new Error('invalid key name');
    this.keyName = name;
    this.cachedPk = null;
  }

  /**
   * Configures the cycles allocation for ECDSA signing operations
   * @param {bigint} cycles - Number of cycles to allocate (must be >= 0)
   * @throws {Error} When cycles value is negative
   */
  configureCycles(cycles: bigint) {
    if (cycles < 0n) throw new Error('cycles must be >= 0');
    this.cyclesForSign = cycles;
  }

  /**
   * Fetches and caches the ECDSA public key from the management canister
   * @returns {Promise<string>} Status message indicating success or already initialized
   * @throws {Error} When public key format is unexpected or invalid
   */
  async fetchEcdsaPk(): Promise<string> {
    if (this.cachedPk) return 'already-initialized';

    const argsVal = {
      canister_id: [canisterSelf() as Principal],
      derivation_path: [] as Uint8Array[],
      key_id: { curve: { secp256k1: null }, name: this.keyName }
    };

    const reply = await call<[typeof argsVal], any>(MGMT, 'ecdsa_public_key', {
      paramIdlTypes: [EcdsaPublicKeyArgs],
      returnIdlType: EcdsaPublicKeyReply,
      args: [argsVal],
      cycles: 0n
    });

    const pk = Uint8Array.from(reply.public_key as number[]);
    if (pk.length !== 33 || (pk[0] !== 0x02 && pk[0] !== 0x03)) {
      throw new Error('unexpected public key format (expect 33B compressed)');
    }
    this.cachedPk = pk;
    return 'ok';
  }

  /**
   * Returns the cached compressed ECDSA public key
   * @returns {Uint8Array} Compressed public key (33 bytes, SEC1 format)
   * @throws {Error} When public key is not initialized
   */
  getCompressedPk(): Uint8Array {
    if (!this.cachedPk) throw new Error('ECDSA pk not initialized (call jwt_fetchEcdsaPk)');
    return new Uint8Array(this.cachedPk);
  }

  /**
   * Issues a JWT token using current timestamp (useful for local development)
   * @param {string} sub - Subject claim for the JWT token
   * @returns {Promise<{ jwt: string }>} JWT token object
   */
  async issueJwt(sub: string): Promise<{ jwt: string }> {
    const nowSec = BigInt(Math.floor(Date.now() / 1000));
    return this.issueJwtAt(sub, nowSec);
  }

  /**
   * Issues a JWT token with specified timestamp (deterministic/recommended)
   * @param {string} sub - Subject claim for the JWT token
   * @param {bigint} nowSec - Unix timestamp in seconds
   * @returns {Promise<{ jwt: string }>} JWT token object
   */
  async issueJwtAt(sub: string, nowSec: bigint): Promise<{ jwt: string }> {
    return this.issueJwtAtWith({
      sub,
      nowSec,
      aud: undefined,
      htm: undefined,
      htu: undefined,
      bod: undefined
    });
  }

  /**
   * Issues a JWT token with additional claims for request binding
   * @param {Object} params - JWT parameters including subject, timestamp, and optional binding claims
   * @param {string} params.sub - Subject claim for the JWT token
   * @param {bigint} params.nowSec - Unix timestamp in seconds
   * @param {string} [params.aud] - Audience claim for token validation
   * @param {string} [params.htm] - HTTP method for request binding
   * @param {string} [params.htu] - Canonical URL for request binding
   * @param {string} [params.bod] - Base64URL(SHA-256(body)) for POST requests
   * @returns {Promise<{ jwt: string }>} JWT token object
   * @throws {Error} When subject is empty or public key is not initialized
   */
  async issueJwtAtWith(params: {
    sub: string;
    nowSec: bigint;
    aud?: string;
    htm?: string;   // HTTP method uppercase
    htu?: string;   // canonical URL
    bod?: string;   // base64url(sha256(body)) se houver body
  }): Promise<{ jwt: string }> {
    const { sub, nowSec, aud, htm, htu, bod } = params;

    if (!sub || sub.trim().length === 0) throw new Error('invalid-argument: sub-empty');
    if (!this.cachedPk) {
      const r = await this.fetchEcdsaPk();
      if (r !== 'ok' && r !== 'already-initialized') throw new Error('pk-not-initialized');
    }

    const iat = Number(nowSec);
    const nbf = iat;
    const exp = iat + TTL_SECONDS;

    const iss = (canisterSelf() as Principal).toText();
    const jti = await generateJti(`${iss}.${sub}.${iat}`);

    // Header/payload com ordem estável
    const headerStr = stableStringify({ alg: 'ES256K', typ: 'JWT' }, ['alg', 'typ']);
    const payloadStr = stableStringify(
      { iss, sub, aud, iat, nbf, exp, jti, htm, htu, bod },
      ['iss', 'sub', 'aud', 'iat', 'nbf', 'exp', 'jti', 'htm', 'htu', 'bod']
    );

    const headerB64 = b64url(te.encode(headerStr));
    const payloadB64 = b64url(te.encode(payloadStr));
    const signingInput = `${headerB64}.${payloadB64}`;

    // Hash SHA-256 do signing input
    const digest = sha256u8(te.encode(signingInput)); // 32B

    // Chamada t-ECDSA: assinatura r||s (64 bytes)
    const sArgsVal = {
      message_hash: Array.from(digest),
      derivation_path: [] as Uint8Array[],
      key_id: { curve: { secp256k1: null }, name: this.keyName }
    };

    const sReply = await call<[typeof sArgsVal], any>(MGMT, 'sign_with_ecdsa', {
      paramIdlTypes: [SignWithEcdsaArgs],
      returnIdlType: SignWithEcdsaReply,
      args: [sArgsVal],
      cycles: this.cyclesForSign
    });

    const sig = Uint8Array.from(sReply.signature as number[]);
    if (sig.length !== 64) {
      throw new Error('unexpected signature length (expect 64B r||s)');
    }

    const sigB64 = b64url(sig);
    return { jwt: `${signingInput}.${sigB64}` };
  }

  /**
   * Performs a self-test of the JWT/ECDSA system for local validation
   * @returns {Promise<string>} JWT token string for testing purposes
   */
  async selfTest(): Promise<string> {
    await this.fetchEcdsaPk();
    const { jwt } = await this.issueJwt('test-user');
    return jwt;
  }

  /**
   * Returns the compressed ECDSA public key in hexadecimal format
   * @returns {string} Compressed public key as hex string (66 characters, 0x02/0x03 prefix)
   */
  getCompressedPkHex(): string {
    const pk = this.getCompressedPk();
    let hex = '';
    for (let i = 0; i < pk.length; i++) {
      const h = pk[i].toString(16).padStart(2, '0');
      hex += h;
    }
    return hex;
  }
}
