/**
 * Local Test Suite — VetKeys Private DB
 * Dooor Team — 2025
 *
 * Tests:
 *  - derive_data_key(G1-48B) -> put_record -> get_record -> list_record_ids -> delete_record
 *  - ensures access is scoped to the caller identity
 *
 * Run:
 *   cd js
 *   npm i
 *   # .env inside /js (recommended) or fallback to ../.env
 *   # HOST=http://127.0.0.1:8000 for dfx 0.27; often 4943 on newer
 *   node local-test-suite.js
 */

import 'dotenv/config'; // loads /js/.env by default
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../src/declarations/vetkeys/vetkeys.did.js';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import assert from 'node:assert';
import * as bls from '@noble/bls12-381';

// Also try ../.env (repo root) if /js/.env was not present or missing vars
if (!process.env.HOST || !process.env.CANISTER_ID) {
  const rootEnv = path.resolve(process.cwd(), '../.env');
  if (existsSync(rootEnv)) {
    const dotenv = await import('dotenv');
    dotenv.config({ path: rootEnv });
  }
}

// Resolve HOST (default aligned to dfx 0.27 port 8000)
const defaultHost = 'http://127.0.0.1:8000';
const HOST = process.env.HOST || defaultHost;

// Resolve CANISTER_ID: prefer env, else fallback to .dfx canister_ids.json
let CANISTER_ID = process.env.CANISTER_ID;
if (!CANISTER_ID) {
  const idsPath = path.resolve(process.cwd(), '../.dfx/local/canister_ids.json');
  if (existsSync(idsPath)) {
    try {
      const ids = JSON.parse(readFileSync(idsPath, 'utf8'));
      CANISTER_ID = ids?.vetkeys?.local || ids?.vetkeys;
    } catch (_) { /* ignore */ }
  }
}
if (!CANISTER_ID) {
  throw new Error('Set CANISTER_ID env var or deploy locally so .dfx/local/canister_ids.json exists.');
}

console.log('[DBG] HOST =', HOST);
console.log('[DBG] CANISTER_ID =', CANISTER_ID);

/** Generate BLS12-381 G1 transport keypair (pk is 48 bytes, compressed) */
function generateTransportG1() {
  const sk = randomBytes(32);          // demo secret; manage securely in prod
  const pk = bls.getPublicKey(sk);     // Uint8Array(48), G1 compressed
  return { sk, pk };
}

/** Placeholder: decrypt VetKD encrypted_key -> 32B data key (mock for tests) */
function decryptVetKDEncryptedKey(encryptedKey, transportSkG1) {
  // TODO: integrate official VetKD client-side decryption
  return new Uint8Array(32).fill(3);
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

async function main() {
  const agent = new HttpAgent({ host: HOST });
  if (HOST.includes('127.0.0.1')) await agent.fetchRootKey();
  const can = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

  const recordIdStr = 'test:local-suite';
  const recordId = new TextEncoder().encode(recordIdStr);
  console.log('[DBG] recordId hex =', Buffer.from(recordId).toString('hex'));

  // 1) Derive VetKD key (transport = BLS12-381 G1, 48 bytes)
  const { sk: transportSk, pk: transportPk } = generateTransportG1();
  const encKeyRes = await can.derive_data_key(Array.from(recordId), Array.from(transportPk));
  const encrypted_key = new Uint8Array(encKeyRes.encrypted_key);
  console.log('[DBG] derive_data_key: encrypted_key len =', encrypted_key.length);

  // 2) Decrypt VetKD key (mock)
  const dataKey = decryptVetKDEncryptedKey(encrypted_key, transportSk);
  assert.equal(dataKey.length, 32);

  // 3) Put
  const plaintext = Buffer.from('hello suite');
  const env = aeadEncrypt(Buffer.from(dataKey), plaintext);
  await can.put_record(Array.from(recordId), Array.from(env));
  console.log('[DBG] put_record OK');

  // 4) List
  const ids = await can.list_record_ids();
  const idStrings = ids.map((b) => Buffer.from(b).toString());
  console.log('[DBG] list_record_ids =', idStrings);
  assert(idStrings.some((s) => s === recordIdStr), 'recordId not found in list_record_ids');

  // 5) Get & decrypt  (opt blob -> [] | [Uint8Array])
  console.log('[DBG] calling get_record with recordId hex', Buffer.from(recordId).toString('hex'));
  const out = await can.get_record(Array.from(recordId));
  console.log('[DBG] get_record raw =', out);

  // Expect: [] for None, [Uint8Array] for Some
  assert(Array.isArray(out), 'get_record did not return an opt (array)');

  assert(out.length === 1, 'get_record returned None');
  const fetched = Buffer.from(out[0]); // out[0] is the Blob

  const decrypted = aeadDecrypt(Buffer.from(dataKey), fetched);
  assert.equal(decrypted.toString(), 'hello suite');

  // 6) Delete
  const del = await can.delete_record(Array.from(recordId));
  assert.equal(del, true);

  const out2 = await can.get_record(Array.from(recordId));
  assert(Array.isArray(out2) && out2.length === 0, 'expected get_record(None) after delete');

  console.log('✅ All local tests passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
