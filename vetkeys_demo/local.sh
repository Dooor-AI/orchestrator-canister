rustup target add wasm32-unknown-unknown         # (se ainda não)
cargo update                                     # gera Cargo.lock com as features

dfx stop ; dfx start --background --clean        # réplica zerada
dfx canister create vetkeys_demo
dfx build && dfx deploy

# chamadas:
dfx canister call vetkeys_demo bls_public_key '( )'
dfx canister call vetkeys_demo sign_caller '( vec {1;2;3} )'
