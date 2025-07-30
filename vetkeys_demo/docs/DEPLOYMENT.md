# Deployment Guide - VetKD Demo

## 🚀 Mainnet Deployment

### Prerequisites

1. **DFX SDK** installed and updated
2. **Configured identity** with ICP to pay for cycles
3. **Rust toolchain** with wasm32 target

### Step by Step

#### 1. Configure Identity

```bash
# Create new identity for mainnet
dfx identity new mainnet

# Use the identity
dfx identity use mainnet

# Check balance (optional)
dfx ledger --network ic balance
```

#### 2. Automatic Deployment

```bash
# Run deployment script
./mainnet.sh
```

The script executes:
- `dfx canister create vetkeys_demo --network ic`
- `dfx build --network ic`
- `dfx deploy --network ic --no-wallet`

#### 3. Manual Deployment

```bash
# Create canister
dfx canister create vetkeys_demo --network ic

# Build
dfx build --network ic

# Deploy
dfx deploy --network ic --no-wallet
```

### Deployment Verification

```bash
# Check status
dfx canister --network ic status vetkeys_demo

# Test functionality
dfx canister --network ic call vetkeys_demo bls_public_key '( )'
```

## 🏠 Local Deployment

### Prerequisites

1. **DFX SDK** installed
2. **Rust toolchain** with wasm32 target

### Execution

```bash
# Run local script
./local.sh
```

The script executes:
- `rustup target add wasm32-unknown-unknown`
- `cargo update`
- `dfx stop ; dfx start --background --clean`
- `dfx canister create vetkeys_demo`
- `dfx build && dfx deploy`

### Local Testing

```bash
# Generate public key
dfx canister call vetkeys_demo bls_public_key '( )'

# Sign data
dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, vec {149;31;167;74;45;217;113;136;77;124;168;203;7;103;149;217;75;152;46;77;238;23;66;51;63;125;122;212;211;7;206;93;14;247;83;94;59;22;21;98;88;199;157;214;6;241;31;114} )'
```

## 📊 Canister Information

### Mainnet
- **Canister ID**: `ypruq-lyaaa-aaaae-qffxa-cai`
- **Candid Interface**: [Access](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=ypruq-lyaaa-aaaae-qffxa-cai)
- **Status**: ✅ Active

### Local
- **Canister ID**: Automatically generated
- **Interface**: Available via `dfx canister id vetkeys_demo`

## 🔧 Configurations

### dfx.json
```json
{
  "canisters": {
    "vetkeys_demo": {
      "type": "rust",
      "package": "vetkeys_demo",
      "main": "src/lib.rs",
      "candid": "src/vetkeys_demo.did"
    }
  },
  "networks": {
    "local": {},
    "ic": {
      "providers": ["https://ic0.app/"]
    }
  },
  "version": 1
}
```

### Cargo.toml
```toml
[package]
name = "vetkeys_demo"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
ic-cdk = "0.18"
ic-cdk-macros = "0.18"
ic-vetkeys = "0.3"
candid = "0.10"
serde = { version = "1", features = ["derive"] }
getrandom = { version = "0.2", features = ["js"] }
```

## 🛠️ Troubleshooting

### Error: "Cannot find canister id"
```bash
# Check if canister exists
dfx canister --network ic id vetkeys_demo

# If it doesn't exist, create it
dfx canister create vetkeys_demo --network ic
```

### Error: "Unable to route management canister request"
- Verify that the VetKD key is configured correctly
- Confirm that the subnet supports VetKD

### Build Error
```bash
# Clear cache
dfx stop
dfx start --background --clean

# Rebuild
dfx build --network ic
```

## 📈 Monitoring

### Check Cycles
```bash
dfx canister --network ic status vetkeys_demo
```

### Canister Logs
```bash
dfx canister --network ic call vetkeys_demo bls_public_key '( )'
```

## 🔄 Updates

### Canister Upgrade
```bash
# Build new version
dfx build --network ic

# Deploy upgrade
dfx deploy --network ic --no-wallet
```

### Rollback
```bash
# Deploy previous version
dfx deploy --network ic --no-wallet
```

## 📋 Deployment Checklist

- [ ] DFX SDK updated
- [ ] Rust toolchain configured
- [ ] Identity configured (mainnet)
- [ ] Sufficient ICP for cycles
- [ ] Successful build
- [ ] Deployment completed
- [ ] Tests working
- [ ] Candid interface accessible 