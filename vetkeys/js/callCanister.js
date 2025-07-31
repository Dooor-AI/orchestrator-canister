// callCanister.js – exemplo NodeJS (backend)
// npm install @dfinity/agent @dfinity/principal tweetnacl@1.0.3

import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from './vetkeys_demo.idl.js';   // gerado pelo dfx

const CANISTER_ID = process.env.CANISTER_ID ||
                    'ypruq-lyaaa-aaaae-qffxa-cai';     // mainnet demo

(async () => {
  // 1. Cria Agent (Mainnet → usar boundary nodes)
  const agent = new HttpAgent({ host: 'https://ic0.app' });
  // opcional: await agent.fetchRootKey(); // só em local

  // 2. Actor
  const canister = Actor.createActor(idlFactory, {
    agent,
    canisterId: CANISTER_ID,
  });

  // 3. Exemplo – listar certificados do caller anônimo
  const certs = await canister.list_certs([]);
  console.log('Certs anon:', certs);

  // 4. Assinar um shutdown
  const payload = new Uint8Array([1, 2, 3]);
  const certHash = new Uint8Array([0xf0, 0x0d, 0xba, 0xbe]);

  // Transport key – X25519 key-pair
  const nacl = await import('tweetnacl');   // ESM dynamic import
  const keyPair = nacl.box.keyPair();
  const tpk = keyPair.publicKey;            // Uint8Array(32)

  const sig = await canister.sign_shutdown(
    [...payload], [...certHash], [...tpk]
  );

  console.log('ShutdownSig:', sig);

  // 5. Descriptografar vetkd_sig → fora do escopo deste demo
})();
