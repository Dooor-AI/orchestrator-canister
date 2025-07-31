// harbor_backend_demo.js
// --------------------------------------------------------
// Example backend routine (Node.js) for the Harbor app.
// It receives a `ShutdownSig` object returned by the
// vetkeys canister and verifies:
//
//   1. The BLS VetKD part (after decrypting with the
//      user's transport SECRET KEY – a 32‑byte scalar).
//   2. The Ed25519 signature made by the canister.
//
// NOTE
// ----
// The VetKD encryption scheme is ECIES‑style and handled
// for you by the Internet Computer.  In a real project you
// would call `@dfinity/crypto` helpers that ship with the
// official JS agent.  Here we mock that decryption step so
// you can plug the correct code later.
//
// Dependencies:
//   npm i @noble/bls12-381 @noble/ed25519 @dfinity/agent
// --------------------------------------------------------

import { PointG1, utils as bls }   from "@noble/bls12-381";
import * as ed25519                from "@noble/ed25519";
import { HttpAgent, Actor }        from "@dfinity/agent";
import { idlFactory }              from "./vetkeys.did.js";

// ----------- 1.  CONFIG ---------------------------------------------------
const HOST        = "https://ic0.app";               // mainnet boundary
const CANISTER_ID = "ypruq-lyaaa-aaaae-qffxa-cai";   // vetkeys canister

// The user's transport keypair (generated in the frontend):
//   • pk  = 48‑byte compressed G1  (Uint8Array)
//   • sk  = 32‑byte scalar
//
// In a real app the SK lives in a secure store; here we mock.
const transportSk = Uint8Array.from([
  /* 32 bytes generated with noble randomPrivateKey()            */
  0x12,0x34,0x56,0x78,0x9a,0xbc,0xde,0xf0,0xaa,0xbb,0xcc,0xdd,0xee,0xff,0x99,0x88,
  0x77,0x66,0x55,0x44,0x33,0x22,0x11,0x00,0xfe,0xdc,0xba,0x98,0x76,0x54,0x32,0x10
]);

// ----------- 2.  AGENT / ACTOR -------------------------------------------
const agent = new HttpAgent({ host: HOST });
const can   = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

// ----------- 3.  MOCK – decrypt VetKD ------------------------------------
function decryptVetKD(encryptedKey, sk) {
  /*  encryptedKey: Uint8Array – 96 bytes (BLS G2)
   *  sk          : Uint8Array – 32 bytes scalar
   *
   *  The real algorithm performs a pairing + HKDF derivation.
   *  Replace this with the official helper when DFINITY ships it.
   */
  console.warn("[mock] VetKD decrypt called – returning fake 32B key\n");
  return encryptedKey.slice(0, 32);   // <- placeholder only
}

// ----------- 4.  Verify local Ed25519 signature --------------------------
async function verifyEd25519(msgBytes, signature, canisterPk) {
  return ed25519.verify(signature, msgBytes, canisterPk);
}

// ----------- 5.  Main flow -----------------------------------------------
(async () => {
  // (A) fetch a ShutdownSig from the canister (here we call for demo)
  const payload = [0x99, 0x88];
  const cert    = [0xde, 0xad, 0xbe, 0xef];
  const { pkG1 } = (() => {
    // derive public key from our secret
    const pk = PointG1.fromPrivateKey(transportSk).toRawBytes(true);
    return { pkG1: Array.from(pk) };
  })();

  const sigObj = await can.sign_shutdown(payload, cert, pkG1);
  console.log("ShutdownSig from canister:", sigObj);

  // (B) decrypt VetKD part
  const decrypted = decryptVetKD(sigObj.vetkd_sig, transportSk);
  console.log("Decrypted VetKD key (mock):", decrypted);

  // (C) verify local Ed25519 signature
  //     – we need the canister's Ed25519 PUBLIC key.
  //       In this demo we ask the canister to expose it via view
  //       (you would normally hard‑code or fetch once and cache).
  const canPk = await can.get_ed25519_pk();   // imagine this query exists

  const msg = Uint8Array.from([...payload, ...cert]);
  const ok  = await verifyEd25519(msg, sigObj.canister_sig, canPk);
  console.log("Ed25519 signature valid?", ok);

  if (ok /* && VetKD proof is valid */) {
    console.log("✅  All good – Harbor can now shut down the service.");
  } else {
    console.log("❌  Verification failed – abort.");
  }
})();
