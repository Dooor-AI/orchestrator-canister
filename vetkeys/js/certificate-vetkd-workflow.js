/**
 * VetKeys “Certificate” Workflow — Private DB
 * Dooor Team — 2025
 *
 * This script stores a certificate (PEM/DER bytes) as an encrypted record:
 * - record_id = "cert:<sha256(certBytes)>"
 * - derive_data_key(record_id, transport_pk[G1-48B]) -> encrypted_key (opaque)
 * - client (TODO) decrypts encrypted_key to a 32B data key
 * - encrypts the certificate (AEAD) -> envelope
 * - put_record / get_record round-trip
 *
 * NOTE: The canister never sees plaintext or private keys.
 */

import 'dotenv/config';
import path from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../src/declarations/vetkeys/vetkeys.did.js';
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto';
import * as bls from '@noble/bls12-381';

/** ===== env / defaults ===== */
// Try local .env in /js; if missing vars, also try ../.env (repo root)
if (!process.env.HOST || !process.env.CANISTER_ID || !process.env.CERT_PATH) {
  const rootEnv = path.resolve(process.cwd(), '../.env');
  if (existsSync(rootEnv)) {
    const dotenv = await import('dotenv');
    dotenv.config({ path: rootEnv });
  }
}

const HOST = process.env.HOST || 'http://127.0.0.1:8000'; // dfx 0.27 usa 8000; 0.28+ costuma 4943
const CANISTER_ID = process.env.CANISTER_ID;
if (!CANISTER_ID) throw new Error('Set CANISTER_ID env var or provide ../.env');
const CERT_PATH = process.env.CERT_PATH || './example.cert';

/** ===== helpers ===== */

/** Build record_id = "cert:<sha256(cert)>" */
function recordIdForCert(certBytes) {
  const h = createHash('sha256').update(certBytes).digest('hex');
  return new TextEncoder().encode(`cert:${h}`);
}

/** Generate BLS12-381 G1 transport keypair (pk is 48 bytes, compressed) */
function generateTransportG1() {
  const sk = randomBytes(32);      // demo secret; gerencie com segurança em prod
  const pk = bls.getPublicKey(sk); // Uint8Array(48), G1 compressed
  return { sk, pk };
}

/** Placeholder: decrypt VetKD `encrypted_key` -> 32B data key (mock) */
function decryptVetKDEncryptedKey(encryptedKey, transportSkG1) {
  // TODO: integrar decriptação real do VetKD; por enquanto, chave estável
  return new Uint8Array(32).fill(9);
}

/** AEAD (AES-256-GCM): envelope = nonce(12) || ciphertext || tag(16) */
function aeadEncrypt(key32, plaintext) {
  const nonce = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key32, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([nonce, ciphertext, tag]);
}

function aeadDecrypt(key32, envelope) {
  const nonce = envelope.subarray(0, 12);
  const tag = envelope.subarray(envelope.length - 16);
  const ciphertext = envelope.subarray(12, envelope.length - 16);
  const decipher = createDecipheriv('aes-256-gcm', key32, nonce);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

/** ===== main ===== */
async function main() {
  // 0) Cert path: auto-generate demo file if missing
  if (!existsSync(CERT_PATH)) {
    console.warn(`[warn] CERT_PATH "${CERT_PATH}" not found. Creating a demo PEM...`);
    const demo = `-----BEGIN CERTIFICATE-----
MIIBxDCCAWmgAwIBAgIUdemoDemoDemoDemoDemoDemoDemoDAKBggqhkjOPQQDAjARMQ8wDQYDVQQD
DAZWZXRLZXlzMB4XDTI1MDEwMTAwMDAwMFoXDTI1MDEwMjAwMDAwMFowETEPMA0GA1UEAwwGVmV0S2
V5czBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABKJtXk1H8l4v8P7C5zQ8q8T1c0r1X0Y8lV9kJ3Yw
g0kH3C1zJ3gJ7s7Q4j5J0D0y3fQ6wJ3u6y4dG7e9c9E3qSjUzBRMB0GA1UdDgQWBBSdemoDemoDemo
DemoDemoDemoDemoLTAfBgNVHSMEGDAWgBSdemoDemoDemoDemoDemoDemoDemoLTAPBgNVHRMBAf8E
BTADAQH/MAoGCCqGSM49BAMCA0gAMEUCIQD7t0QmQy7x9f4B8jRk0g3n3p8m4m5ZpQp9p3bHfS9QxQ
IgIY7lH0W0p0b3lUo3o1tFq8aHq2C2o5nYx1lq8k4x2k=
-----END CERTIFICATE-----\n`;
    writeFileSync(CERT_PATH, demo);
  }

  const agent = new HttpAgent({ host: HOST });
  if (HOST.includes('127.0.0.1')) await agent.fetchRootKey();
  const can = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

  // 1) Load certificate and derive record_id
  const certBytes = readFileSync(CERT_PATH);
  const recordId = recordIdForCert(certBytes);

  // 2) Derive VetKD encrypted data key for this record_id, using G1 (48B) transport pk
  const { sk: transportSk, pk: transportPk } = generateTransportG1();
  const enc = await can.derive_data_key(Array.from(recordId), Array.from(transportPk));
  const encrypted_key = new Uint8Array(enc.encrypted_key);

  // 3) Client-side decrypt (TODO real impl) -> 32B data key
  const dataKey = decryptVetKDEncryptedKey(encrypted_key, transportSk);

  // 4) Encrypt certificate and store envelope
  const envelope = aeadEncrypt(Buffer.from(dataKey), certBytes);
  await can.put_record(Array.from(recordId), Array.from(envelope));
  console.log('Certificate saved under record_id:', Buffer.from(recordId).toString());

  // 5) Fetch and decrypt round-trip
  const out = await can.get_record(Array.from(recordId));
  // Candid opt -> [] | [value]
  if (!Array.isArray(out) || out.length === 0) throw new Error('missing record (opt None)');
  const fetched = Buffer.from(out[0]);

  const plain = aeadDecrypt(Buffer.from(dataKey), fetched);
  const ok = Buffer.compare(Buffer.from(certBytes), plain) === 0;
  console.log('Round-trip OK? ', ok);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
