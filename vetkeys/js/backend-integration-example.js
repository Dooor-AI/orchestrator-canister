/**
 * VetKeys Private-DB — Backend Integration Example
 * Dooor Team — 2025
 *
 * This example shows how a backend service can:
 *  1) Derive a record-scoped data key via VetKD (encrypted to a BLS12-381 G1 transport key, 48 bytes)
 *  2) (Client step) Decrypt that encrypted key locally (TODO: integrate VetKD client lib)
 *  3) Encrypt application data (AEAD) and store it as an opaque envelope
 *  4) Fetch and decrypt the envelope later
 *
 * Canister API (Candid):
 *  - bls_public_key() -> BlsPk
 *  - derive_data_key(record_id: blob, transport_pk_g1_48B: blob) -> EncryptedKey
 *  - put_record(record_id: blob, envelope: blob)
 *  - get_record(record_id: blob) -> opt blob   (JS shape: [] | [Uint8Array])
 *  - list_record_ids() -> vec blob
 *  - delete_record(record_id: blob) -> bool
 */

import 'dotenv/config';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../src/declarations/vetkeys/vetkeys.did.js';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import * as bls from '@noble/bls12-381';

/** ====== Configuration ====== */
// Se não tiver /js/.env completo, tenta ../.env também
if (!process.env.HOST || !process.env.CANISTER_ID) {
  const rootEnv = path.resolve(process.cwd(), '../.env');
  if (existsSync(rootEnv)) {
    const dotenv = await import('dotenv');
    dotenv.config({ path: rootEnv });
  }
}

const HOST = process.env.DFX_NETWORK === 'ic'
  ? 'https://ic0.app'
  : (process.env.HOST || 'http://127.0.0.1:8000'); // dfx 0.27 => 8000; 0.28+ costuma 4943

let CANISTER_ID = process.env.CANISTER_ID
  || (existsSync('../.dfx/local/canister_ids.json')
      ? JSON.parse(readFileSync('../.dfx/local/canister_ids.json', 'utf8')).vetkeys?.local
      : null);

if (!CANISTER_ID) {
  throw new Error('Set CANISTER_ID env var or deploy locally so .dfx/local/canister_ids.json exists.');
}

/**
 * Generate a BLS12-381 G1 transport keypair.
 * Returns:
 *  - sk: 32-byte secret (Uint8Array)
 *  - pk: 48-byte compressed G1 public key (Uint8Array)
 */
function generateTransportG1() {
  // Para demo: secret aleatório. Em produção, gerencie esse segredo com segurança.
  const sk = randomBytes(32);
  const pk = bls.getPublicKey(sk); // 48 bytes, G1 compressed
  return { sk, pk };
}

/**
 * Placeholder: decrypt VetKD `encrypted_key` using your transport secret.
 * Replace this with the official VetKD client-side decryption when wiring for real.
 *
 * @param {Uint8Array} encryptedKey - opaque blob from canister (VetKD transport ciphertext)
 * @param {Uint8Array} transportSkG1 - 32B BLS secret used to derive the transport key
 * @returns {Uint8Array} 32-byte data key (demo mock)
 */
function decryptVetKDEncryptedKey(encryptedKey, transportSkG1) {
  // TODO: integrate VetKD client decrypt. For demo, we return a stable mock key.
  return new Uint8Array(32).fill(7);
}

/**
 * AEAD helpers (AES-256-GCM used as an example).
 * Envelope layout (recommended): nonce(12) || ciphertext || tag(16).
 */
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

async function main() {
  // Agent & actor
  const agent = new HttpAgent({ host: HOST });
  if (HOST.includes('127.0.0.1')) await agent.fetchRootKey();
  const can = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

  // Example record_id (namespace your IDs however you like)
  const recordIdStr = 'user:profile:v1';
  const recordId = new TextEncoder().encode(recordIdStr);

  // 1) Derive a record-scoped data key, encrypted to our BLS12-381 G1 public key (48 bytes)
  const { sk: transportSk, pk: transportPk } = generateTransportG1();
  const enc = await can.derive_data_key(Array.from(recordId), Array.from(transportPk));
  const encrypted_key = new Uint8Array(enc.encrypted_key);

  // 2) Decrypt VetKD transport envelope client-side (TODO: real impl)
  const dataKey = decryptVetKDEncryptedKey(encrypted_key, transportSk);

  // 3) Encrypt and store (we never send plaintext to the canister)
  const plaintext = Buffer.from(JSON.stringify({ hello: 'private world', ts: Date.now() }));
  const envelope = aeadEncrypt(Buffer.from(dataKey), plaintext);
  await can.put_record(Array.from(recordId), Array.from(envelope));
  console.log('Stored record:', recordIdStr);

  // 4) List and fetch
  const ids = await can.list_record_ids();
  console.log('Your record_ids:', ids.map((b) => Buffer.from(b).toString()));

  const out = await can.get_record(Array.from(recordId));
  // Candid opt -> [] | [value]
  if (!Array.isArray(out) || out.length === 0) {
    throw new Error('record missing (opt None)');
  }
  const fetched = Buffer.from(out[0]);

  const decrypted = aeadDecrypt(Buffer.from(dataKey), fetched);
  console.log('Decrypted payload:', decrypted.toString());

  // Optional delete:
  // await can.delete_record(Array.from(recordId));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
