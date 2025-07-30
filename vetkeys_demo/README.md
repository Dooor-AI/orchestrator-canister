# VetKD Demo - Internet Computer

[![Deployed on IC](https://img.shields.io/badge/Deployed%20on-Internet%20Computer-blue?logo=internet-computer)](https://internetcomputer.org/)
[![Canister ID](https://img.shields.io/badge/Canister%20ID-ypruq--lyaaa--aaaae--qffxa--cai-green)](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=ypruq-lyaaa-aaaae-qffxa-cai)

A complete demonstration of **VetKD (Verified Key Derivation)** implemented on the Internet Computer, showing how to use BLS12-381 cryptography for verifiable signatures.

## 🚀 Project Status

✅ **Deployed on Mainnet**  
🔗 **Canister ID**: `ypruq-lyaaa-aaaae-qffxa-cai`  
🌐 **Candid Interface**: [Access](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=ypruq-lyaaa-aaaae-qffxa-cai)

## 📋 What is VetKD?

**VetKD (Verified Key Derivation)** is an advanced cryptography system that enables:

- **Verifiable key derivation** using BLS12-381 elliptic curves
- **Aggregated signatures** with high efficiency
- **Cryptographic verification** without exposing private keys
- **Native integration** with the Internet Computer

## 🛠️ Features

### 🔑 BLS Public Key Generation
```bash
dfx canister call vetkeys_demo bls_public_key '( )'
```
Returns the BLS12-381 public key from the VetKD subnet.

### ✍️ Data Signing
```bash
dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, transport_public_key )'
```
Signs data using the caller's principal and a transport key.

### ✅ Signature Verification
JavaScript script to verify BLS12-381 signatures:
```bash
npm run check
```

### 🔑 Transport Key Generation
Script to generate BLS12-381 G1 keys:
```bash
npm run generate-key
```

## 🏗️ Architecture

```
vetkeys_demo/
├── src/
│   └── lib.rs              # Main canister (Rust)
├── scripts/
│   ├── vetkd_check.js      # Signature verification (JavaScript)
│   ├── gen_transport_key.js # Transport key generator
│   └── README.md           # Scripts documentation
├── local.sh               # Local deployment script
├── mainnet.sh             # Mainnet deployment script
└── dfx.json               # DFX configuration
```

## 🚀 How to Run

### Prerequisites

1. **DFX SDK** (latest version)
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **Rust** (with wasm32 target)
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustup target add wasm32-unknown-unknown
   ```

3. **Node.js** (for verification)
   ```bash
   npm install
   ```

### 🏠 Local Execution

1. **Start local replica**:
   ```bash
   ./local.sh
   ```

2. **Test functionality**:
   ```bash
   # Generate public key
   dfx canister call vetkeys_demo bls_public_key '( )'
   
   # Sign data
   dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, vec {149;31;167;74;45;217;113;136;77;124;168;203;7;103;149;217;75;152;46;77;238;23;66;51;63;125;122;212;211;7;206;93;14;247;83;94;59;22;21;98;88;199;157;214;6;241;31;114} )'
   ```

### 🌐 Mainnet Deployment

1. **Configure identity**:
   ```bash
   dfx identity new mainnet
   dfx identity use mainnet
   ```

2. **Deploy**:
   ```bash
   ./mainnet.sh
   ```

3. **Test on mainnet**:
   ```bash
   dfx canister --network ic call vetkeys_demo bls_public_key '( )'
   ```

## 🔍 Signature Verification

The project includes JavaScript scripts to verify BLS12-381 signatures:

```bash
npm run check
```

The `scripts/vetkd_check.js` script implements:
- BLS12-381 signature parsing
- Cryptographic verification using elliptic curves
- G2 public key validation
- G1 signature verification

### 🔑 Transport Key Generation
Script to generate BLS12-381 G1 keys:
```bash
npm run generate-key
```

The `scripts/gen_transport_key.js` script implements:
- Random BLS12-381 G1 key generation
- DFX-compatible format
- Automatic key validation
- Usage examples

## 📊 Usage Examples

### 1. Get Public Key
```bash
dfx canister call vetkeys_demo bls_public_key '( )'
```

**Response**:
```
(
  record {
    pk = blob "\91\e9\98\ac\5b\dc\38\b1\27\98\88\c1\38\97\b3\0d\2a\3e\64\71\39\28\4b\a4\c0\bb\ae\65\a0\95\8d\f6\27\52\fd\5e\01\d6\78\04\72\a9\3e\5f\63\8a\80\13\18\c3\a3\d3\2b\07\59\21\d6\89\c1\bc\0b\c9\e9\94\55\59\bf\22\83\17\d4\c6\4f\3b\bd\27\12\45\0d\fe\10\4b\85\07\28\cb\54\ba\ae\fd\b1\ec\08\49\96\ae";
  },
)
```

### 2. Sign Data
```bash
dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, vec {149;31;167;74;45;217;113;136;77;124;168;203;7;103;149;217;75;152;46;77;238;23;66;51;63;125;122;212;211;7;206;93;14;247;83;94;59;22;21;98;88;199;157;214;6;241;31;114} )'
```

**Response**:
```
(
  record {
    signature = blob "\b0\ed\f6\4e\22\e4\fb\43\e3\af\71\c3\96\d7\63\2c\50\56\19\8b\c0\70\4e\22\09\09\7b\07\3f\a5\cb\72\24\d1\91\f0\22\9c\de\b2\fd\c1\f1\b2\d6\bc\09\83\a9\78\ae\3b\c0\fd\72\c5\5a\d0\52\40\35\f2\6a\27\88\60\82\3c\dd\d9\77\e1\99\b7\af\2e\8a\bc\7a\91\20\e4\2a\54\4b\f4\1b\1f\f7\04\71\d6\ef\cd\84\89\19\7f\d2\67\8d\bd\e5\99\1c\6b\38\5b\5d\31\22\1c\ad\06\69\b3\df\28\58\e1\b6\f7\73\22\34\44\68\b1\4d\4d\a1\f9\7d\b3\59\73\e9\03\8a\f5\02\54\a7\27\b3\cf\71\27\90\4b\e0\fd\04\01\e5\5f\0e\7a\9e\dc\4f\67\4d\f5\ca\f4\21\5c\63\48\36\0b\ca\f4\da\30\3b\40\c7\6f\dd\75\02\93\5e\0c\08\51\e7\f8\97\4f";
  },
)
```

## 🔧 Technical Configuration

### Rust Dependencies
- `ic-cdk`: IC canisters framework
- `ic-vetkeys`: Official VetKD library
- `candid`: Data serialization
- `serde`: Serialization/deserialization

### JavaScript Dependencies
- `@noble/curves`: Elliptic curves implementation
- `@dfinity/principal`: IC principals manipulation

## 📁 Scripts

For more information about JavaScript scripts, see documentation in `scripts/README.md`.

### Available Commands
```bash
npm run check          # Verify BLS12-381 signatures
npm run generate-key   # Generate transport keys
```

## 🛡️ Security

- **Private keys never exposed**: VetKD keeps private keys secure
- **Cryptographic verification**: All signatures are verifiable
- **Isolated context**: Each caller has their own derivation context
- **Secure curves**: Use of BLS12-381, a cryptographically secure elliptic curve

## 📚 Additional Documentation

- [VetKD Documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/vetkd/)
- [Internet Computer Documentation](https://internetcomputer.org/docs/)
- [BLS12-381 Specification](https://tools.ietf.org/html/draft-irtf-cfrg-bls-signature-04)

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the `LICENSE` file for more details.

## 📞 Contact

For questions or suggestions about this demo, open an issue in the repository.

---

**Developed with ❤️ for the Internet Computer community** 