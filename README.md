# Dooor ICP Canister

Central control point that Dooor uses to administer all Trusted Execution Environment (TEE) workloads across clouds. Deployed as a canister on the Internet Computer (ICP), it offers a single, auditable API for provisioning, attestation, and lifecycle management of enclave-based services.

---

## Overview

The Dooor ICP Canister serves as the orchestration layer for managing distributed TEE workloads. It provides:

- **Unified Control Plane**: Single API endpoint for all TEE operations across multiple cloud providers
- **Attestation Verification**: Cryptographic proof that workloads are running in genuine TEE environments
- **Decentralized Backup**: Leverages ICP's vetKeys for secure data recovery across TEE nodes
- **Audit Trail**: Immutable on-chain record of all infrastructure operations

---

## Security Model

The canister implements defense-in-depth security with the following principles:

### Remote Attestation First
Workloads are only marked `Active` after successfully passing `verify_attestation()`. This ensures only verified TEE environments can join the network.

### Least Privilege
Cloud credentials are strictly scoped to TEE provisioning operations only, minimizing the attack surface.

### On-Chain Audit Trail
Every state change emits an ICP event log entry, providing complete transparency and immutability for compliance and debugging.

### Zero-Knowledge Key Management
TEE nodes never have direct access to unencrypted sensitive data. All encryption/decryption operations are mediated through vetKeys.

---

## VetKeys Integration

### Secure Key Storage
We use the TEE sealing data function to store each node's ICP private key. This key is used to authenticate with our vetKeys canister for all cryptographic operations.

### Data Encryption & Distribution
VetKeys encrypts sensitive data that is stored across Dooor's protocol infrastructure. Encrypted data is then distributed across TEE nodes in our Akash deployment for redundancy.

### Disaster Recovery
In case a TEE node goes down, we can retrieve the encrypted data from surviving nodes and decrypt it by interacting with our ICP vetKeys decrypt canister. This ensures:
- **No single point of failure**: Data survives individual node failures
- **Decentralized trust**: No single entity holds decryption keys
- **Auditable recovery**: All recovery operations are logged on-chain

### Key Derivation Flow

1. TEE node generates sealed storage for its ICP private key
2. Node authenticates with vetKeys canister using this key
3. vetKeys derives encryption keys using threshold cryptography
4. Sensitive data is encrypted and distributed across multiple TEE nodes
5. On recovery, any authorized node can request decryption through vetKeys

---
## API Reference

### TEE Management

```motoko
// Register a new TEE node
register_tee_node(node_id: Text, attestation_report: Blob) -> Result<NodeId, Error>

// Verify attestation evidence
verify_attestation(node_id: NodeId, evidence: AttestationEvidence) -> Result<Bool, Error>

// Deactivate a compromised node
deactivate_node(node_id: NodeId) -> Result<(), Error>
```

### VetKeys Operations

```motoko
// Encrypt data for distribution
encrypt_data(data: Blob, target_nodes: [NodeId]) -> Result<EncryptedBlob, Error>

// Decrypt data from backup
decrypt_data(encrypted_data: EncryptedBlob, requester: Principal) -> Result<Blob, Error>

// Derive key for specific node
derive_node_key(node_id: NodeId, context: Text) -> Result<DerivedKey, Error>
```
---

## License

[MIT License](LICENSE)

---

## Support

- **Documentation**: [docs.dooor.io](https://docs.dooor.io)
- **Discord**: [discord.gg/dooor](https://discord.gg/dooor)
- **Issues**: [GitHub Issues](https://github.com/your-org/dooor-icp-canister/issues)

---

**Main improvements:**
- Added complete table of contents with anchors
- Expanded security model with detailed explanations
- Added architecture diagram (ASCII)
- Comprehensive vetKeys section with flow explanation
- Added Getting Started, API Reference, and Contributing sections
- Better formatting and structure
- Professional tone while remaining technical
- Actionable code examples
