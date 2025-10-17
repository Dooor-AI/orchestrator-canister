## VetKeys Private Database Canister
DOOOR Team — Setember 2025

### Overview
This canister implements a VetKD-backed private database on the
Internet Computer. Clients derive a record-scoped data key using
VetKD, encrypt data client-side (AEAD), and store only an opaque
envelope. The canister never sees plaintext.

### What’s included
- Identity-bound VetKD derivation (BLS12-381 G2)
  - context = len(DS) || DS || msg_caller()
  - input = "db|v1|" || record_id
- Correct transport requirement
  - transport_pk must be G1 compressed (48 bytes)
- Opaque private storage
  - put/get/list/delete per caller in a StableBTreeMap with composite
    key (caller, record_id)
- Stable Candid interface (no Result) compatible with JS demos

### Candid API
- bls_public_key() -> record { pk: blob }
- derive_data_key(record_id: blob, transport_pk: blob)
  -> record { encrypted_key: blob }
- put_record(record_id: blob, envelope: blob)
- get_record(record_id: blob) -> opt blob
- list_record_ids() -> vec blob
- delete_record(record_id: blob) -> bool

### Security properties
- Identity binding through VetKD context (caller principal included)
- Record binding via input prefix "db|v1|" || record_id
- Data-at-rest is opaque: only envelopes are stored
- Access control is per-caller for all DB operations

## How it works
1) Client generates transport keypair (BLS12-381 G1). Public key is 48B
   (compressed) and sent to the canister.
2) Canister calls VetKD derive using the caller-bound context and
   record-bound input, returning an encrypted key for the transport key.
3) Client decrypts the VetKD transport ciphertext locally to obtain a
   32-byte data key.
4) Client performs AEAD (e.g., AES-256-GCM) and stores the envelope via
   put_record. Reads and deletes are scoped to the caller.

Note: The JS demos currently mock the VetKD client-side decryption
pending official client libraries. The storage and API round-trips are
fully functional.

## Demos and tests (JavaScript)
All demos import the generated Candid declarations from
`vetkeys/src/declarations/vetkeys/vetkeys.did.js`.

- local-test-suite.js
  - Complete round-trip: derive → put → list → get → delete
  - Correct handling of Candid opt: get_record returns [] | [blob]

- certificate-vetkd-workflow.js
  - Saves a certificate as an encrypted record and reads it back
  - Outputs: Round-trip OK = true

- backend-integration-example.js
  - Writes, lists, and reads back using opt handling fixed

## Usage

### Prerequisites
```bash
node >= 18
dfx >= 0.27
npm i @dfinity/agent @dfinity/candid @noble/bls12-381
```

### Generate Candid declarations
```bash
dfx generate vetkeys
```

### Local development
```bash
dfx start --background --clean
dfx deploy

cd vetkeys/js
npm i
# Prefer /vetkeys/js/.env; fallback to ../.env is supported by the scripts
node local-test-suite.js
node certificate-vetkd-workflow.js
node backend-integration-example.js
```

Environment variables supported by the JS demos:
- HOST: default http://127.0.0.1:8000 (older dfx). Some setups use 4943.
- CANISTER_ID: if absent, scripts try ../.dfx/local/canister_ids.json
- CERT_PATH: used by certificate-vetkd-workflow.js (optional)

### Transport key generation
JS demos use `@noble/bls12-381` to generate a G1 transport keypair.
Public key is 48 bytes (compressed) and is required by the canister.

### Shell script helper
`vetkeys/scripts/calls.sh` performs a minimal end-to-end using `dfx`:
- Derives a transport G1 public key with Node (esm) under `js/`
- Calls `derive_data_key`, then stores a mock envelope
- Lists, fetches, deletes the record

## Implementation notes
- Subnet key: BLS12-381 G2 (KEY_NAME = "key_1")
- Stable storage: StableBTreeMap keyed by (caller, record_id)
- No plaintext ever leaves the client; the canister stores only envelopes

## Compatibility
- dfx local deploy OK
- JS demos accept ENV via `.env` and rely on `@noble/bls12-381` for
  transport key generation

## Links
- Candid UI (replace with your deployed canister id):
  `https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=<CANISTER_ID>`

---
This canister demonstrates identity-bound VetKD derivation and a simple,
private, envelope-based data store suitable for client-side AEAD flows.
