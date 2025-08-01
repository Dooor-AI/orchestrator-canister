# VetKeys JavaScript Integration Guide
*DOOOR Team – July 2025*

## Overview
This directory contains JavaScript files for testing, demonstrating, and integrating with the VetKeys Private Database Canister.

## File Structure
```
js/
├── README.md                           # This file
├── vetkeys.did.js                      # Generated Candid interface
├── local-test-suite.js                 # Comprehensive local testing
├── certificate-vetkd-workflow.js       # Practical workflow demonstration
└── backend-integration-example.js      # Backend integration patterns
```

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
**Purpose**: Comprehensive testing of all canister functions during local development.

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

**Features**:
- Complete function testing with error handling
- Certificate storage and retrieval tests
- VetKD signature generation and validation
- Ed25519 signature verification
- Security scenario testing
- Performance benchmarking

### 2. Certificate + VetKD Workflow
**Purpose**: Demonstrates the practical implementation of the VetKeys workflow.

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

**Features**:
- Step-by-step workflow demonstration
- Certificate management examples
- Dual signature system showcase
- Security testing scenarios
- Real-world simulation

### 3. Backend Integration Example
**Purpose**: Shows how to integrate VetKeys into backend applications.

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
Each file has a configuration section at the top:

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

# 2. Generate Candid interface
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
- **Purpose**: Comprehensive testing framework
- **Use Case**: Development and CI/CD testing
- **Features**: Automated test execution, result reporting, performance metrics

### `certificate-vetkd-workflow.js`
- **Purpose**: Educational demonstration
- **Use Case**: Understanding the VetKeys workflow
- **Features**: Step-by-step explanations, real-world scenarios

### `backend-integration-example.js`
- **Purpose**: Production-ready integration
- **Use Case**: Backend application integration
- **Features**: Error handling, retry logic, caching, Harbor-specific extensions

### `vetkeys.did.js`
- **Purpose**: Generated Candid interface
- **Use Case**: Type-safe canister communication
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

*This integration guide is maintained by the DOOOR Team for the VetKeys Private Database Canister.* 