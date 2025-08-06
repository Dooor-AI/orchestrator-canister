// src/backend/services/jwt_ecdsa.ts
//
// JWTService: emite JWT ES256K (secp256k1) usando t-ECDSA do IC.
// - fetchEcdsaPk()        → obtém e cacheia a pk comprimida (33 B)
// - issueJwt(sub)         → cria header.payload, hash SHA-256 e assina via sign_with_ecdsa
// - getCompressedPk()     → retorna a pk para verificadores externos (compressed)
// - selfTest()            → gera um token de teste
//
// Azle 0.32: usamos decorators só no index; aqui é uma classe "service".
// Chamadas ao management canister via fetch("icp://aaaaa-aa/<method>")
// com Candid encodado/decodado usando IDL.encode/IDL.decode.
// Docs: decorators/IDL e fetch icp://  → ver referências na resposta.

import { IDL } from 'azle';
// Azle carrega js-sha256 como dependência; importamos daqui:
import { sha256 } from 'js-sha256';

// ---------------- Config ----------------
const MGMT = 'aaaaa-aa'; // management canister
const KEY_ID = { curve: { secp256k1: null }, name: 'key_1' };
const JWT_TTL_SECONDS = 3600;

// IDL types para os métodos t-ECDSA
const KeyId = IDL.Record({
  curve: IDL.Variant({ secp256k1: IDL.Null }),
  name: IDL.Text
});
const EcdsaPublicKeyArgs = IDL.Record({
  canister_id: IDL.Opt(IDL.Principal),
  derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)), // vec<blob>
  key_id: KeyId
});
const EcdsaPublicKeyReply = IDL.Record({
  public_key: IDL.Vec(IDL.Nat8),
  chain_code: IDL.Vec(IDL.Nat8)
});

const SignWithEcdsaArgs = IDL.Record({
  message_hash: IDL.Vec(IDL.Nat8),            // 32 bytes (SHA-256)
  derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
  key_id: KeyId
});
const SignWithEcdsaReply = IDL.Record({
  signature: IDL.Vec(IDL.Nat8)                // DER (ASN.1)
});

// ---------------- Utils ----------------
const te = new TextEncoder();

// Base64url encoding function (replaces Buffer usage)
const b64url = (u8: Uint8Array): string => {
  const base64 = btoa(String.fromCharCode(...u8));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Converte DER (ASN.1) ECDSA → r||s (64 bytes) para JWS/JWT ES256K
function derToJose(der: Uint8Array): Uint8Array {
  // DER: 30 len 02 rlen r 02 slen s
  if (der[0] !== 0x30) throw new Error('ECDSA DER: bad sequence');
  let offset = 2; // pula 0x30 e len
  if (der[1] & 0x80) offset = 2 + (der[1] & 0x7f); // len longa

  if (der[offset] !== 0x02) throw new Error('ECDSA DER: bad int r');
  const rLen = der[offset + 1];
  const r = der.slice(offset + 2, offset + 2 + rLen);

  let sOff = offset + 2 + rLen;
  if (der[sOff] !== 0x02) throw new Error('ECDSA DER: bad int s');
  const sLen = der[sOff + 1];
  const s = der.slice(sOff + 2, sOff + 2 + sLen);

  // Remove zeros à esquerda e left-pad para 32 bytes
  const trim = (x: Uint8Array) => {
    let i = 0; while (i < x.length - 1 && x[i] === 0) i++;
    return x.slice(i);
  };
  const leftPad32 = (x: Uint8Array) => {
    if (x.length > 32) throw new Error('ECDSA part > 32 bytes');
    const out = new Uint8Array(32);
    out.set(x, 32 - x.length);
    return out;
  };
  const R = leftPad32(trim(r));
  const S = leftPad32(trim(s));
  const out = new Uint8Array(64);
  out.set(R, 0);
  out.set(S, 32);
  return out;
}

// ---------------- Service ----------------
export class JWTService {
  private cachedPk?: Uint8Array; // compressed (33 bytes)

  /**
   * Obtém e cacheia a P-256k1 compressed public key do subnet (33 B)
   * @returns {Promise<string>} Status da inicialização
   */
  async fetchEcdsaPk(): Promise<string> {
    if (this.cachedPk) return 'already-initialized';

    const args = {
      canister_id: [],           // None
      derivation_path: [],       // vazio
      key_id: KEY_ID
    };
    const body = IDL.encode([EcdsaPublicKeyArgs], [args]);
    const res = await fetch(`icp://${MGMT}/ecdsa_public_key`, { method: 'POST', body });
    if (!res.ok) throw new Error(`ecdsa_public_key HTTP ${res.status}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    const decoded = IDL.decode([EcdsaPublicKeyReply], buf.buffer);
    const reply = decoded[0] as unknown as { public_key: Uint8Array };
    this.cachedPk = new Uint8Array(reply.public_key);
    return 'ok';
  }

  /**
   * Emite JWT ES256K (sub, iat, exp). Assinatura t-ECDSA → DER → r||s → base64url
   * @param {string} sub - Subject do JWT
   * @returns {Promise<{ jwt: string }>} JWT assinado
   */
  async issueJwt(sub: string): Promise<{ jwt: string }> {
    if (!this.cachedPk) await this.fetchEcdsaPk();

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + JWT_TTL_SECONDS;
    const header = { alg: 'ES256K', typ: 'JWT' };
    const payload = { sub, iat, exp };

    const h = b64url(te.encode(JSON.stringify(header)));
    const p = b64url(te.encode(JSON.stringify(payload)));
    const data = `${h}.${p}`;

    // sha256 → 32 bytes
    const hashHex = sha256.update(te.encode(data)).hex();
    const hash = Uint8Array.from(hashHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

    const sArgs = {
      message_hash: hash,
      derivation_path: [],
      key_id: KEY_ID
    };
    const sBody = IDL.encode([SignWithEcdsaArgs], [sArgs]);
    const sRes = await fetch(`icp://${MGMT}/sign_with_ecdsa`, { method: 'POST', body: sBody });
    if (!sRes.ok) throw new Error(`sign_with_ecdsa HTTP ${sRes.status}`);
    const sBuf = new Uint8Array(await sRes.arrayBuffer());
    const sDecoded = IDL.decode([SignWithEcdsaReply], sBuf.buffer);
    const sReply = sDecoded[0] as unknown as { signature: Uint8Array };

    // converter DER → JOSE (r||s) e b64url
    const jose = derToJose(new Uint8Array(sReply.signature));
    const sigB64 = b64url(jose);

    return { jwt: `${data}.${sigB64}` };
  }

  /**
   * Retorna a chave pública comprimida (33 B) para verificação off-chain
   * @returns {Uint8Array} Chave pública comprimida
   */
  getCompressedPk(): Uint8Array {
    if (!this.cachedPk) throw new Error('ECDSA pk not initialized (call fetchEcdsaPk)');
    return new Uint8Array(this.cachedPk);
  }

  /**
   * Gera um token de teste
   * @returns {Promise<string>} JWT de teste
   */
  async selfTest(): Promise<string> {
    await this.fetchEcdsaPk();
    const { jwt } = await this.issueJwt('test-user');
    return jwt;
  }
}
