// src/ecdsa.ts
// ============================================================================
// ECDSA JWT Module (Azle 0.32 + experimental-deps)
// - fetchEcdsaPk(): busca e cacheia a chave pública (secp256k1, comprimida 33B)
// - issueJwt(sub): emite JWT ES256K (header.alg="ES256K") assinado via t-ECDSA
// - getCompressedPk(): expõe a pk comprimida para verificação off-chain
// - selfTest(): emite um token de teste (usa função interna, não chama export)
// ----------------------------------------------------------------------------
// Refs (Azle 0.32):
// • Imports “runtime” a partir de 'azle/experimental'. 
//   (ver docs de “Canister version”, “Management canister examples”) 
// • Management canister IDL de 'azle/canisters/management'.
// • Stable structures: usar `new StableBTreeMap(...)`.
// • t-ECDSA: sign_with_ecdsa / ecdsa_public_key e key_id.curve { secp256k1: null }.
// ============================================================================

import {
    Canister, ic, update, query, text, blob, Record, StableBTreeMap
  } from 'azle/experimental';
  import { managementCanister } from 'azle/canisters/management';
  import { sha256 } from '@cosmjs/crypto';
  
  // ------------------------------- Constantes ----------------------------------
  const JWT_TTL_SECONDS = 3600;               // 1 hora
  const ECDSA_SIGNATURE_CYCLES = 25_000_000_000n;
  const KEY_ID = {
    curve: { secp256k1: null as null },       // ES256K
    name: 'key_1'
  };
  
  // ------------------------------- Helpers -------------------------------------
  function b64urlFromBytes(u8: Uint8Array): string {
    const s = Buffer.from(u8).toString('base64');
    return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlFromText(s: string): string {
    return b64urlFromBytes(new TextEncoder().encode(s));
  }
  function nowSeconds(): number {
    return Number(ic.time() / 1_000_000_000n);
  }
  
  // -------------------------- Stable storage (pk) -------------------------------
  /**
   * Guarda a pk ECDSA (secp256k1) comprimida (33 bytes) sob a chave "main".
   * MemoryId = 0 (ajuste se já usar esse id noutro módulo).
   */
  const PK_STORE = new StableBTreeMap<string, Uint8Array>(0);
  
  // ----------------------------- Tipos Candid ----------------------------------
  const JwtResponse = Record({ jwt: text });
  
  // ----------------------- Funções internas (reuso) ----------------------------
  async function ensurePk(): Promise<void> {
    const got = PK_STORE.get('main');
    if ('Some' in got) return;
  
    const res = await ic.call(managementCanister.ecdsa_public_key, {
      args: [{
        canister_id: { None: null },     // Opt<Principal> = None
        derivation_path: [] as blob[],
        key_id: KEY_ID
      }]
    });
  
    // res.public_key é blob (Uint8Array). Esperado: 33B (comprimida)
    PK_STORE.insert('main', res.public_key);
  }
  
  async function signHashK1(hash32: Uint8Array): Promise<Uint8Array> {
    const sigRes = await ic.call(managementCanister.sign_with_ecdsa, {
      args: [{
        message_hash: hash32,            // blob (Uint8Array)
        derivation_path: [] as blob[],
        key_id: KEY_ID
      }],
      cycles: ECDSA_SIGNATURE_CYCLES
    });
    return sigRes.signature;             // Uint8Array (r||s)
  }
  
  async function issueJwtInternal(sub: string): Promise<string> {
    await ensurePk();
  
    const header = { alg: 'ES256K', typ: 'JWT' };
    const iat = nowSeconds();
    const exp = iat + JWT_TTL_SECONDS;
    const payload = { sub, iat, exp };
  
    const h = b64urlFromText(JSON.stringify(header));
    const p = b64urlFromText(JSON.stringify(payload));
    const data = `${h}.${p}`;
  
    // Hash SHA-256 do header.payload
    const hash = sha256(new TextEncoder().encode(data)); // Uint8Array(32)
    const sig = await signHashK1(hash);
  
    return `${data}.${b64urlFromBytes(sig)}`;
  }
  
  // ------------------------------- Exports Azle --------------------------------
  
  // 1) Inicialização idempotente: busca/caches a pk
  export const fetchEcdsaPk = update([], text, async () => {
    await ensurePk();
    return 'ok';
  });
  
  // 2) Emite JWT ES256K assinado via t-ECDSA
  export const issueJwt = update([text], JwtResponse, async (sub: string) => {
    const jwt = await issueJwtInternal(sub);
    return { jwt };
  });
  
  // 3) Expor a pk comprimida (33B) para verificação off-chain
  export const getCompressedPk = query([], blob, () => {
    const got = PK_STORE.get('main');
    if ('None' in got) {
      ic.trap('ECDSA pk not initialized. Call fetchEcdsaPk first.');
    }
    // @ts-ignore unwrap do Opt
    return got.Some as Uint8Array;
  });
  
  // 4) Self-test local (não use o export `issueJwt` aqui!)
  export const selfTest = update([], text, async () => {
    return await issueJwtInternal('test-user');
  });
  
  // ----------------------- (Opcional) Canister wrapper -------------------------
  /**
   * Se preferir expor tudo via default Canister(), descomente o bloco abaixo e
   * importe este módulo no seu index, OU exporte nomeado como está.
   */
  // export default Canister({
  //   fetchEcdsaPk,
  //   issueJwt,
  //   getCompressedPk,
  //   selfTest
  // });
  