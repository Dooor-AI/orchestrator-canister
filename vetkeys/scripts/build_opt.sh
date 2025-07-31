#!/usr/bin/env bash
set -euo pipefail
cargo build --release --target wasm32-unknown-unknown
wasm-opt -Oz -o \
  target/wasm32-unknown-unknown/release/vetkeys_demo_opt.wasm \
  target/wasm32-unknown-unknown/release/vetkeys_demo.wasm
echo "WASM otimizado salvo em target/*_opt.wasm"
