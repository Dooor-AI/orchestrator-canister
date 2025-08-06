dfx stop ; dfx start --background --clean  --network ic

dfx canister create vetkeys_demo --network ic
dfx build   --network ic
dfx deploy  --network ic --no-wallet

# usar:
dfx canister --network ic call vetkeys_demo bls_public_key '( )'
dfx canister --network ic call vetkeys_demo sign_caller '( vec {1;2;3} )'
