
# VetKeys Private Database Canister
*DOOOR Team – July 2025*

## Overview
This canister implements a **VetKeys-backed private database** solution for the Internet Computer, demonstrating practical usage of the **VetKD API** (Verifiably-Encrypted Threshold Key Derivation) while maintaining a decentralized certificate storage system linked to user identities.

### What Problem Does It Solve?
This implementation addresses the challenge of creating a truly decentralized private database where:
- **No single entity** can decrypt sensitive data alone
- **Threshold cryptography** ensures trustless key management
- **Certificate verification** is tied to user identity without centralized storage
- **Dual signature system** provides cryptographic guarantees against tampering

### Key Features
| Feature | Endpoints | Purpose |
|---------|-----------|---------|
| **Certificate Storage** | `add_cert`, `list_certs` | Store and retrieve certificate hashes linked to user Principal |
| **VetKD Public Key** | `bls_public_key` | Retrieve the subnet's BLS G2 public key |
| **VetKD Signature Derivation** | `sign_caller` | Generate encrypted VetKD signatures for user payloads |
| **Dual Signature System** | `sign_shutdown` | Create combined VetKD + Ed25519 signatures |
| **Signature Verification** | `verify_shutdown` | Verify Ed25519 signatures for integrity checks |

## How It Works

### 1. Certificate Storage Flow
```
User → add_cert(hash) → Canister stores hash linked to Principal
User → list_certs() → Canister returns all hashes for the Principal
```

### 2. Secure Signature Generation
When a user needs to sign important data:

1. **User sends**: `payload + certificate_hash + transport_public_key`
2. **Canister constructs**: `input = caller_principal || payload || certificate_hash`
3. **VetKD derivation**: Calls `vetkd_derive_key()` with the input
4. **Encrypted response**: Returns BLS G2 key encrypted for user's G1 key
5. **Local signature**: Canister also signs `(payload || hash)` with Ed25519
6. **Dual verification**: User decrypts VetKD signature and validates both signatures

### 3. Security Guarantees
- **Tamper detection**: Altering any byte of payload or hash breaks verification
- **Threshold security**: No single party can decrypt VetKD signatures alone
- **Identity binding**: Signatures are cryptographically tied to user Principal
- **Integrity verification**: Ed25519 signature provides additional integrity check

## Architecture

### Stable Memory Structure
```
StableMemory
├─ StableBTreeMap  (Principal → CertHash[≤128 bytes])
└─ StableCell      (Ed25519 Seed 32 bytes)
```

### Key Components
- **Certificate Storage**: BTreeMap linking user Principals to certificate hashes
- **Ed25519 Key Management**: Secure seed storage for local signature generation
- **VetKD Integration**: Threshold key derivation with BLS12-381 G2 curve
- **Transport Key Requirements**: BLS12-381 G1 compressed (48 bytes) required

## Integration Guide

### Prerequisites
```bash
npm install @dfinity/agent @dfinity/candid @noble/bls12-381
```

### Basic Usage Example
```javascript
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Initialize agent
const agent = new HttpAgent({ host: 'https://ic0.app' });
const canisterId = 'irdox-qiaaa-aaaac-qbleq-cai'; // Deployed canister ID

// Add certificate hash
await actor.add_cert(certificateHash);

// List certificates for user
const certificates = await actor.list_certs(Principal.fromText(userPrincipal));

// Generate transport key (BLS G1, 48 bytes)
const transportKey = generateBLSG1Key();

// Sign important data
const signature = await actor.sign_shutdown(
    payload,
    certificateHash,
    transportKey
);

// Verify signature
const isValid = await actor.verify_shutdown(payload, certificateHash, signature.canister_sig);
```

### Complete Integration Script
```javascript
// runDemo.js
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

async function runDemo() {
    // 1. Initialize agent (use fetchRootKey() for local development only)
    const agent = new HttpAgent({ host: 'https://ic0.app' });
    
    // 2. Add certificate
    await actor.add_cert(certificateHash);
    
    // 3. List certificates
    const certs = await actor.list_certs();
    
    // 4. Generate transport key
    const transportKey = generateBLSG1Key();
    
    // 5. Get VetKD signature
    const vetkdSig = await actor.sign_caller(payload, transportKey);
    
    // 6. Get dual signature
    const shutdownSig = await actor.sign_shutdown(payload, certHash, transportKey);
    
    console.log('ShutdownSig:', shutdownSig);
}
```

## Production Deployment

### Deployed Canister Information
- **Canister ID**: `irdox-qiaaa-aaaac-qbleq-cai`
- **Candid Interface**: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=irdox-qiaaa-aaaac-qbleq-cai
- **Network**: Internet Computer Mainnet

### Mainnet Considerations
- **Agent Configuration**: Point to `https://ic0.app` (not localhost)
- **Root Key**: Do NOT call `fetchRootKey()` in production
- **Cycles**: Ensure sufficient cycles (minimum 2T cycles) for VetKD operations
- **Security**: Store `canister_ids.json` securely and commit to version control

### Deployment Commands
```bash
# Create canister on mainnet
dfx canister create vetkeys --network ic

# Build and deploy
dfx build --network ic
dfx deploy --network ic --no-wallet
```

### Security Best Practices
1. **Key Management**: Never expose private keys in client code
2. **Certificate Validation**: Always verify certificate hashes before signing
3. **Transport Keys**: Use proper BLS G1 keys (48 bytes) for VetKD
4. **Error Handling**: Implement proper error handling for all VetKD operations
5. **Monitoring**: Monitor canister cycles and VetKD operation costs

## Technical Specifications

### VetKD Configuration
- **Curve**: BLS12-381 G2
- **Key Name**: "key_1"
- **Context**: Domain-specific context for key derivation
- **Transport Key**: BLS12-381 G1 compressed (48 bytes)

### Signature Formats
- **VetKD Signature**: Encrypted BLS G2 key (variable length)
- **Ed25519 Signature**: 64-byte signature for integrity verification
- **Combined Signature**: `ShutdownSig { vetkd_sig, canister_sig }`

### Performance Considerations
- **VetKD Operations**: Asynchronous and require sufficient cycles
- **Memory Usage**: Efficient stable memory usage with bounded storage
- **Concurrent Access**: Thread-safe operations with proper memory management

---

*This implementation demonstrates the power of VetKeys for creating truly decentralized, private databases on the Internet Computer. The DOOOR Team continues to innovate in the intersection of blockchain technology and decentralized computing.*
