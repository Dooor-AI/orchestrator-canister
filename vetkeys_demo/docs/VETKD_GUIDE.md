# VetKD (Verified Key Derivation) - Complete Guide

## 🔐 What is VetKD?

**VetKD (Verified Key Derivation)** is an advanced cryptography system that enables verifiable key derivation using elliptic curves. It is a fundamental technology of the Internet Computer that provides:

- **Cryptographic security** without exposing private keys
- **Aggregated signatures** with high efficiency
- **Native verification** in the IC protocol
- **Transparent integration** with canisters

## 🏗️ How It Works

### 1. VetKD Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Canister      │    │   VetKD         │    │   Subnet        │
│   (Caller)      │───▶│   Subnet        │───▶│   Master Key    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
   Context + Payload    Derivation Request    Derived Key
```

### 2. Derivation Flow

1. **Context**: The caller provides a unique context
2. **Payload**: Specific data for signing
3. **Derivation**: VetKD derives a specific key
4. **Signature**: The derived key signs the data
5. **Verification**: Anyone can verify the signature

### 3. Main Components

#### Application Context
```rust
const DS: &[u8] = b"bls_demo";  // Application domain
```

#### Context Construction
```rust
fn context(principal: Principal) -> Vec<u8> {
    std::iter::once(DS.len() as u8)
        .chain(DS.iter().copied())
        .chain(principal.as_slice().iter().copied())
        .collect()
}
```

## 🔑 Key Types

### BLS12-381
- **Curve**: BLS12-381 (Boneh-Lynn-Shacham)
- **G1**: Group used for signatures
- **G2**: Group used for public keys
- **Size**: 48 bytes for G2 public keys

### BLS12-381 Advantages
- **Aggregated signatures**: Multiple signatures in one
- **Efficient verification**: One verification for multiple signatures
- **Proven security**: Cryptographically secure curve

## 📝 Implemented Features

### 1. Public Key Generation
```rust
#[update]
async fn bls_public_key() -> BlsPk {
    let args = VetKDPublicKeyArgs {
        canister_id: None,
        context: context(ic_cdk::api::msg_caller()),
        key_id: VetKDKeyId { 
            name: KEY_NAME.into(), 
            curve: VetKDCurve::Bls12_381_G2 
        },
    };
    let res = vetkd_public_key(&args).await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("{:?}", e)));
    BlsPk { pk: res.public_key }
}
```

### 2. Data Signing
```rust
#[update]
async fn sign_caller(payload: Vec<u8>, transport_public_key: Vec<u8>) -> BlsSig {
    if ![32, 48].contains(&transport_public_key.len()) {
        ic_cdk::trap("transport_public_key must be 32 (X25519) or 48 (BLS‑G1) bytes");
    }
    
    let mut input = ic_cdk::api::msg_caller().as_slice().to_vec();
    input.extend_from_slice(&payload);

    let args = VetKDDeriveKeyArgs {
        input,
        context: context(ic_cdk::api::msg_caller()),
        transport_public_key,
        key_id: VetKDKeyId { 
            name: KEY_NAME.into(), 
            curve: VetKDCurve::Bls12_381_G2 
        },
    };
    
    let res = vetkd_derive_key(&args).await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("{:?}", e)));
    BlsSig { signature: res.encrypted_key }
}
```

## 🔍 Signature Verification

### Verification Process
1. **Parsing**: Convert signature blob to G1 points
2. **Reconstruction**: Reconstruct the derived key
3. **Verification**: Use pairing to verify the signature
4. **Validation**: Confirm that the signature is valid

### Verification Script
```javascript
// Signature parsing
const E1 = b.slice(0, 48);   // G1 - first part
const E3 = b.slice(144);     // G1 - third part

// Key reconstruction
const k = g1.fromHex(E3).add(g1.fromHex(E1).multiply((r - tsk) % r));

// Verification
const isValid = bls.fields.Fp12.eql(lhs1, rhs1);
```

## 🛡️ Security Aspects

### Implemented Protections
- **Private keys never exposed**: VetKD keeps keys secure
- **Isolated context**: Each caller has their own context
- **Input validation**: Verification of key sizes
- **Secure curves**: Use of cryptographically secure BLS12-381

### Best Practices
- **Unique domain**: Each application should use a unique domain
- **Specific context**: Include relevant information in the context
- **Rigorous validation**: Verify all input parameters
- **Error handling**: Capture and handle errors appropriately

## 🚀 Use Cases

### 1. Identity Signatures
- Verify user identity
- Authentication without exposing private keys
- Aggregated signatures for multiple users

### 2. Integrity Verification
- Sign important data
- Verify transaction integrity
- Ensure message authenticity

### 3. Transport Cryptography
- Transport keys for secure communication
- End-to-end encryption
- Data protection in transit

## 📚 Additional Resources

### Official Documentation
- [VetKD Documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/vetkd/)
- [BLS12-381 Specification](https://tools.ietf.org/html/draft-irtf-cfrg-bls-signature-04)
- [Internet Computer Documentation](https://internetcomputer.org/docs/)

### Reference Implementations
- [ic-vetkeys crate](https://crates.io/crates/ic-vetkeys)
- [VetKD Examples](https://github.com/dfinity/examples/tree/master/rust/vetkd)

### Useful Tools
- [Candid Playground](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/)
- [DFX Documentation](https://internetcomputer.org/docs/current/developer-docs/setup/install/)

## 🔧 Development

### Project Structure
```
vetkeys_demo/
├── src/
│   ├── lib.rs              # Main implementation
│   └── vetkeys_demo.did    # Candid interface
├── scripts/
│   ├── vetkd_check.js      # JavaScript verification
│   ├── gen_transport_key.js # Key generator
│   └── README.md           # Scripts documentation
├── local.sh               # Local script
├── mainnet.sh             # Mainnet script
└── README.md              # Main documentation
```

### Main Dependencies
- `ic-cdk`: IC canisters framework
- `ic-vetkeys`: Official VetKD library
- `candid`: Data serialization
- `@noble/curves`: JavaScript elliptic curves

### JavaScript Scripts
- `scripts/vetkd_check.js`: BLS12-381 signature verification
- `scripts/gen_transport_key.js`: Transport key generation

---

**This guide provides a complete view of VetKD and its implementation on the Internet Computer. For more information, see the official documentation.** 