#!/usr/bin/env node
// Verificação local de JWT ES256K (secp256k1) sem WebCrypto, usando @noble/secp256k1.
// Uso: node scripts/verify_es256k.mjs <PK_HEX_COMPRESSED> <JWT> [HTM] [HTU] [AUD]
import * as secp from '@noble/secp256k1';
import { createHash } from 'node:crypto';

function b64uToBytes(str) {
  const s = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4 === 2 ? '==' : s.length % 4 === 3 ? '=' : '';
  return Uint8Array.from(Buffer.from(s + pad, 'base64'));
}
function hexToBytes(hex) {
  const h = (hex || '').trim().replace(/^0x/i, '').toLowerCase();
  if (h.length % 2) throw new Error(`hex length must be even, got ${h.length}`);
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

const [,, pkHex, jwt, HTM = 'GET', HTU = 'https://example.com/models', AUD = 'dooor-llm'] = process.argv;
if (!pkHex || !jwt) {
  console.error('usage: verify_es256k.mjs <PK_HEX_COMPRESSED> <JWT> [HTM] [HTU] [AUD]');
  process.exit(2);
}

const parts = jwt.split('.');
if (parts.length !== 3) throw new Error('JWT must have 3 parts');

const [hB64, pB64, sB64] = parts;
const header = JSON.parse(Buffer.from(b64uToBytes(hB64)).toString('utf8'));
const payload = JSON.parse(Buffer.from(b64uToBytes(pB64)).toString('utf8'));

if (header.alg !== 'ES256K') throw new Error(`alg != ES256K (${header.alg})`); // ES256K = ECDSA/secp256k1.
if (payload.aud && AUD && payload.aud !== AUD) throw new Error(`aud mismatch: ${payload.aud} != ${AUD}`);
if (payload.htm && HTM && payload.htm !== HTM) throw new Error(`htm mismatch: ${payload.htm} != ${HTM}`);
if (payload.htu && HTU && payload.htu !== HTU) throw new Error(`htu mismatch: ${payload.htu} != ${HTU}`);

const signingInput = Buffer.from(`${hB64}.${pB64}`, 'utf8');
const msgHash = createHash('sha256').update(signingInput).digest();

const sig = b64uToBytes(sB64);
if (sig.length !== 64) throw new Error(`signature must be 64-byte r||s, got ${sig.length}`); // JWS usa r||s.

const pub = hexToBytes(pkHex); // 33 bytes (SEC1 compressed 0x02/0x03 + X).
const ok = secp.verify(secp.Signature.fromCompact(sig), msgHash, pub);

console.log(JSON.stringify({ ok, header, payload }, null, 2));
process.exit(ok ? 0 : 1);
