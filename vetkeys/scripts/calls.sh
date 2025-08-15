#!/usr/bin/env bash
set -euo pipefail

# Minimal end-to-end calls for VetKeys Private DB
# - Uses identity-bound VetKD derivation
# - Requires transport_pk = BLS12-381 G1 compressed (48 bytes)

# Optional local deploy
# dfx deploy vetkeys

CID="$(dfx canister id vetkeys)"

echo "==> Generating transport_public_key BLS12-381 G1 (48 bytes) via Node (esm) under /js"
TPK_HEX="$(cd js && node ./emit-transport-g1.mjs)"

RID_HEX="$(echo -n "user:profile" | hexdump -v -e '/1 "0x%02x; "')"

echo "==> Deriving data-key (record_id='user:profile') via VetKD (G2) + G1 transport"
dfx canister call "$CID" derive_data_key "(vec { $RID_HEX }, vec { $TPK_HEX })"

echo "==> Storing encrypted envelope (mock bytes)"
ENV_HEX="0x01; 0x02; 0x03; 0x04;"
dfx canister call "$CID" put_record "(vec { $RID_HEX }, vec { $ENV_HEX })"

echo "==> Listing record_ids for caller"
dfx canister call "$CID" list_record_ids

echo "==> Fetching envelope"
dfx canister call "$CID" get_record "(vec { $RID_HEX })"

echo "==> Deleting record"
dfx canister call "$CID" delete_record "(vec { $RID_HEX })"
