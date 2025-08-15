// src/backend/services/jwt_ecdsa.ts
// -----------------------------------------------------------------------------
// Azle module: emite JWT ES256K (secp256k1) usando t-ECDSA do IC.
// - fetchEcdsaPk(): busca e cacheia a PK (comprimida, 33 B) do subnet
// - issueJwt(sub): emite JWT (alg=ES256K) assinado via sign_with_ecdsa
// - getCompressedPk(): retorna a PK comprimida (blob) para verificação off-chain
// - selfTest(): emite um token de teste
// -----------------------------------------------------------------------------

import {
    blob, text, update, query, ic, Record, StableBTreeMap
} from 'azle';
import { managementCanister } from 'azle/canisters/management';
import { sha256 } from '@cosmjs/crypto';

// ------------ Constantes ------------------------------------------------------
const JWT_TTL_S = 3600;                  // 1h
const ECDSA_FEE = 25_000_000_000n;       // cycles p/ assinatura
const KEY_ID = {                           // tipagens do Azle: secp256k1
    curve: { secp256k1: null as null },
    name: 'key_1'
};

// ------------ Helpers ---------------------------------------------------------
function b64urlFromBytes(u8: Uint8Array): string {
    // base64url sem padding
    let s = Buffer.from(u8).toString('base64');
    return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlFromText(s: string): string {
    return b64urlFromBytes(new TextEncoder().encode(s));
}
function nowSeconds(): number {
    return Number(ic.time() / 1_000_000_000n);
}

// ------------ Stable storage --------------------------------------------------
// Guarda **somente** a pk comprimida (33 B) sob chave "main"
const PK_STORE = StableBTreeMap<string, Uint8Array>(0);

// ------------ Tipos Candid ----------------------------------------------------
const JwtResponse = Record({ jwt: text });

// ------------ Helpers internos (não-exportados) ------------------------------
async function _ensurePk(): Promise<void> {
    // Se já tem, nada a fazer
    const got = PK_STORE.get('main');
    if ('Some' in got) return;

    const res = await ic.call(managementCanister.ecdsa_public_key, {
        args: [{
            // canister_id é Opt<Principal> → queremos None: passe { None: null }
            canister_id: { None: null },
            derivation_path: [] as blob[],
            key_id: KEY_ID
        }]
    });
    // res.public_key é blob (Uint8Array)
    PK_STORE.insert('main', res.public_key);
}

async function _signHashK1(hash32: Uint8Array): Promise<Uint8Array> {
    const sigRes = await ic.call(managementCanister.sign_with_ecdsa, {
        args: [{
            message_hash: hash32,              // blob, não number[]
            derivation_path: [] as blob[],
            key_id: KEY_ID
        }],
        cycles: ECDSA_FEE
    });
    return sigRes.signature;               // Uint8Array (r||s)
}

function _makeJwtES256K(sub: string, sig: Uint8Array): string {
    const header = { alg: 'ES256K', typ: 'JWT' };
    const iat = nowSeconds();
    const exp = iat + JWT_TTL_S;
    const payload = { sub, iat, exp };

    const h = b64urlFromText(JSON.stringify(header));
    const p = b64urlFromText(JSON.stringify(payload));
    const data = `${h}.${p}`;
    const sigB64 = b64urlFromBytes(sig);
    return `${data}.${sigB64}`;
}

// ------------ Exports (Azle) --------------------------------------------------

// 1) Inicializa/cacheda a pk (idempotente)
export const fetchEcdsaPk = update([], text, async () => {
    await _ensurePk();
    return 'ok';
});

// Função interna que gera o JWT (não exportada)
async function _issueJwtInternal(sub: string): Promise<string> {
    await _ensurePk();

    // header.payload -> sha256 -> sign_with_ecdsa
    const header = { alg: 'ES256K', typ: 'JWT' };
    const iat = nowSeconds();
    const exp = iat + JWT_TTL_S;
    const payload = { sub, iat, exp };

    const h = b64urlFromText(JSON.stringify(header));
    const p = b64urlFromText(JSON.stringify(payload));
    const data = `${h}.${p}`;
    const hash = sha256(new TextEncoder().encode(data));  // Uint8Array(32)

    const sig = await _signHashK1(hash);
    return `${data}.${b64urlFromBytes(sig)}`;
}

// 2) Emite JWT ES256K (export update)
export const issueJwt = update([text], JwtResponse, async (sub: string) => {
    const jwt = await _issueJwtInternal(sub);
    return { jwt };
});

// 3) Expor pk comprimida (33 B) para verificação off-chain
export const getCompressedPk = query([], blob, () => {
    const got = PK_STORE.get('main');
    if ('None' in got) {
        ic.trap('ECDSA pk not initialized. Call fetchEcdsaPk first.');
    }
    // @ts-ignore (unwrap Opt)
    return got.Some as Uint8Array;
});

// 4) Teste local (não chama issueJwt exportado!)
export const selfTest = update([], text, async () => {
    const jwt = await _issueJwtInternal('test-user');
    return jwt;
});
