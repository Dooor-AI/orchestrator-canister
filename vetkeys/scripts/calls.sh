#!/usr/bin/env bash
# Assumindo dfx já iniciado e canister implantado localmente

CID=$(dfx canister id vetkeys_demo)

echo "==> Add cert (hash f00dbabe)"
dfx canister call $CID add_cert '(vec { 0xf0; 0x0d; 0xba; 0xbe })'

echo "==> List certs (caller)"
dfx canister call $CID list_certs '(null)'

echo "==> Obter pk VetKD"
dfx canister call $CID bls_public_key '( )'

# Gera transport key (X25519) de teste via openssl
TPK=$(openssl genpkey -algorithm X25519 | \
      openssl pkey -pubout -outform DER | tail -c +13 | hexdump -v -e '/1 "0x%02x; "')

echo "==> Assinar shutdown"
dfx canister call $CID sign_shutdown "(vec { 0x01; 0x02 }, vec { 0xf0; 0x0d; 0xba; 0xbe }, vec { $TPK })"
