# VetKeys JavaScript Integration Guide
DOOOR Team – July 2025

## Overview
JS demos and integration helpers for the VetKeys Private DB canister.
They exercise identity-bound VetKD derivation (BLS12-381 G2), use a
correct transport public key (G1 compressed, 48 bytes), and interact
with the stable Candid interface used by the canister and tests.

## File Structure
```
js/
├── README.md                           # This file
├── local-test-suite.js                 # Comprehensive local testing
├── certificate-vetkd-workflow.js       # Practical workflow demonstration
├── backend-integration-example.js      # Backend integration patterns
└── emit-transport-g1.mjs               # Emits 48B G1 transport PK (hex list)
```

Generated Candid interface used by these scripts:
`../src/declarations/vetkeys/vetkeys.did.js` (created by `dfx generate vetkeys`).

## Prerequisites

### 1. Install Dependencies
```bash
npm install @dfinity/agent @dfinity/candid @noble/bls12-381 @noble/ed25519 chalk
```

### 2. Generate Candid Interface
```bash
dfx generate vetkeys
```

### 3. Start Local Environment (for local testing)
```bash
dfx start --background --clean
dfx deploy
```

### 4. Configure package.json
Make sure your `package.json` has:
```json
{
  "type": "module"
}
```

## Running the Files

### 1. Local Test Suite
**Purpose**: End-to-end round-trip and access control checks.

```bash
# Run all tests
node local-test-suite.js

# Expected output:
# ==================================================
# VetKeys Local Test Suite
# ==================================================
# ℹ️  Connecting to local environment
# ℹ️  Host: http://127.0.0.1:4943
# ℹ️  Canister ID: uxrrr-q7777-77774-qaaaq-cai
# ✅ Test environment initialized successfully
# ... (test results)
```

**What it verifies**:
- VetKD derivation using context = len(DS)||DS||msg_caller() and
  input = "db|v1|"||record_id (server-side), transport G1 pk = 48B
- put/get/list/delete using composite key (caller, record_id)
- get_record opt handling: [] | [blob]

### 2. Certificate + VetKD Workflow
**Purpose**: Save and read a certificate as an encrypted record.

```bash
# Run workflow demonstration
node certificate-vetkd-workflow.js

# Expected output:
# ==============================================================
# Certificate + VetKD Workflow Demonstration
# ==============================================================
# ℹ️  Environment: Local Development
# ℹ️  Canister ID: uxrrr-q7777-77774-qaaaq-cai
# ✅ Workflow environment initialized
# ... (step-by-step demonstration)
```

**Result**:
- Round-trip OK = true

### 3. Backend Integration Example
**Purpose**: Backend patterns using the stable Candid interface.

```bash
# This file is a module - import it in your code
# Example usage:
```

```javascript
import { VetKeysBackendIntegration, HarborVetKeysIntegration } from './backend-integration-example.js';

// Initialize integration
const vetKeys = new VetKeysBackendIntegration({
    useMainnet: false, // Set to true for mainnet
    timeout: 30000
});

await vetKeys.initialize();

// Verify signatures
const result = await vetKeys.verifyDualSignature({
    payload: new Uint8Array([0x11, 0x22, 0x33]),
    certificateHash: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
    signature: {
        vetkdSig: new Uint8Array([...]),
        canisterSig: new Uint8Array([...])
    },
    privateKeyG1: new Uint8Array([...])
});
```

## Configuration

### Environment Selection
Each file supports ENV via `/vetkeys/js/.env` or falls back to `../.env`.

```javascript
const CONFIG = {
    LOCAL_HOST: "http://127.0.0.1:4943",
    MAINNET_HOST: "https://ic0.app",
    LOCAL_CANISTER_ID: "uxrrr-q7777-77774-qaaaq-cai",
    MAINNET_CANISTER_ID: "irdox-qiaaa-aaaac-qbleq-cai",
    USE_MAINNET: false // Set to true for mainnet
};
```

### Switching Between Local and Mainnet

**For Local Development:**
```javascript
USE_MAINNET: false
```

**For Mainnet Testing:**
```javascript
USE_MAINNET: true
```

## Quick Start Guide

### 1. First Time Setup
```bash
# 1. Install dependencies
npm install @dfinity/agent @dfinity/candid @noble/bls12-381 @noble/ed25519 chalk

# 2. Generate Candid interface (required by the JS files)
dfx generate vetkeys

# 3. Start local environment
dfx start --background --clean
dfx deploy

# 4. Run test suite
node local-test-suite.js
```

### 2. Workflow Demonstration
```bash
# After successful test suite
node certificate-vetkd-workflow.js
```

### 3. Backend Integration
```bash
# Use the backend integration in your application
# See examples in backend-integration-example.js
```

## Troubleshooting

### Common Issues

**1. Module Import Errors**
```bash
# Error: Cannot use import statement outside a module
# Solution: Add to package.json
{
  "type": "module"
}
```

**2. Canister Not Found**
```bash
# Error: Canister not found
# Solution: Check if dfx is running and canister is deployed
dfx canister status vetkeys
```

**3. Root Key Issues**
```bash
# Error: Root key not found
# Solution: For local development, ensure fetchRootKey() is called
# This is handled automatically in the files
```

**4. Network Connection Issues**
```bash
# Error: Network connection failed
# Solution: Check your internet connection and IC network status
# For mainnet: https://dashboard.internetcomputer.org/
```

### Debug Mode
Add debug logging by modifying the configuration:

```javascript
const CONFIG = {
    // ... existing config
    DEBUG: true
};
```

## File Descriptions

### `local-test-suite.js`
- **Purpose**: Round-trip and access scope tests
- **Notes**: Uses mock client-side VetKD decrypt; validates opt handling

### `certificate-vetkd-workflow.js`
- **Purpose**: Save/read a certificate as an encrypted record
- **Notes**: Outputs Round-trip OK = true

### `backend-integration-example.js`
- **Purpose**: Backend integration example (writes, lists, reads back)
- **Notes**: Opt reading is corrected

### `vetkeys.did.js`
- **Purpose**: Generated Candid interface used by the JS files
- **Generated by**: `dfx generate vetkeys`

## Security Notes

1. **Never expose private keys** in client-side code
2. **Use environment variables** for sensitive configuration
3. **Validate all inputs** before sending to canister
4. **Implement proper error handling** in production code
5. **Monitor canister cycles** for mainnet deployments

## Performance Tips

1. **Cache public keys** to reduce network calls
2. **Use connection pooling** for high-traffic applications
3. **Implement retry logic** with exponential backoff
4. **Monitor response times** and optimize accordingly

## Support

For issues and questions:
- Check the main README.md in the project root
- Review the Rust canister documentation
- Check Internet Computer documentation: https://internetcomputer.org/docs

---

This integration guide is maintained by the DOOOR Team for the VetKeys
Private Database Canister.