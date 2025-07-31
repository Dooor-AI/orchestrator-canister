// js/runDemo.js   (ES-modules; package.json must contain "type":"module")
import { HttpAgent, Actor }      from "@dfinity/agent";
import { idlFactory }            from "./vetkeys.did.js";
import { PointG1, utils as bls } from "@noble/bls12-381";

const HOST = "http://127.0.0.1:4943";
const CID  = "uxrrr-q7777-77774-qaaaq-cai";   // <— adjust if needed

/** 1. set-up agent & root key (only for local replica) */
const agent = new HttpAgent({ host: HOST });
if (HOST.includes("127.0.0.1")) await agent.fetchRootKey();

/** 2. build actor */
const can = Actor.createActor(idlFactory, { agent, canisterId: CID });

/** 3. helper to create a 48-byte transport key (BLS G1) */
function newG1Key () {
  const sk  = bls.randomPrivateKey();
  const pk  = PointG1.fromPrivateKey(sk).toRawBytes(true); // compressed = 48 bytes
  return { sk, pk };              // sk never leaves the browser/back-end
}

(async () => {
  console.log("STEP 0  — generate transport key");
  const { pk } = newG1Key();
  console.log("G1 pk first bytes:", pk.slice(0,6), "...");

  console.log("STEP 1  — store certificate hash in the canister");
  await can.add_cert([0xde,0xad,0xbe,0xef]);

  console.log("STEP 2  — ask canister to sign caller");
  const sig1 = await can.sign_caller([1,2,3], [...pk]);
  console.log("VetKD - encrypted key length:", sig1.signature.length);

  console.log("STEP 3  — full shutdown signature (includes cert hash)");
  const shutdown = await can.sign_shutdown(
      [0xaa,0xbb],                 // payload
      [0xde,0xad,0xbe,0xef],       // hash we saved
      [...pk]                      // 48-byte transport key
  );
  console.log("shutdown =", shutdown);
})();
