/**
 * Certificate + VetKD Workflow Demonstration
 * =========================================
 * 
 * This file demonstrates the practical implementation of the VetKeys-backed
 * private database workflow, showing how certificates and VetKD work together
 * to create a secure, decentralized system.
 * 
 * Workflow Overview:
 * 1. User stores certificate hashes linked to their Principal
 * 2. When signing important data, user provides payload + certificate hash + transport key
 * 3. Canister creates dual signatures (VetKD + Ed25519) for maximum security
 * 4. User verifies both signatures to ensure data integrity and authenticity
 * 
 * Security Features Demonstrated:
 * - Threshold cryptography with VetKD
 * - Certificate-based verification
 * - Tamper detection through dual signatures
 * - Identity binding through Principal
 * - Transport key encryption
 * 
 * Prerequisites:
 *   npm install @dfinity/agent @dfinity/candid @noble/bls12-381 @noble/ed25519 chalk
 *   dfx generate vetkeys
 *   dfx start --background --clean
 *   dfx deploy
 * 
 * Usage:
 *   node certificate-vetkd-workflow.js
 * 
 * @author DOOOR Team
 * @version 1.0.0
 */

import chalk from "chalk";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "./vetkeys.did.js";
import { PointG1, utils as bls } from "@noble/bls12-381";
import * as ed25519 from "@noble/ed25519";

// Configuration
const CONFIG = {
    LOCAL_HOST: "http://127.0.0.1:4943",   // porta correta da réplica
    MAINNET_HOST: "https://ic0.app",
    LOCAL_CANISTER_ID: "uxrrr-q7777-77774-qaaaq-cai",
    MAINNET_CANISTER_ID: "irdox-qiaaa-aaaac-qbleq-cai",
    USE_MAINNET: false
};

// Utility functions
const utils = {
    hex: (u8) => [...u8].map(b => b.toString(16).padStart(2, "0")).join(" "),
    pause: (ms) => new Promise(r => setTimeout(r, ms)),
    log: {
        info: (msg) => console.log(chalk.blue("ℹ️  " + msg)),
        success: (msg) => console.log(chalk.green("✅ " + msg)),
        warning: (msg) => console.log(chalk.yellow("⚠️  " + msg)),
        error: (msg) => console.log(chalk.red("❌ " + msg)),
        header: (msg) => console.log(chalk.cyan.bold("\n" + "=".repeat(60) + "\n" + msg + "\n" + "=".repeat(60))),
        section: (msg) => console.log(chalk.magenta.bold("\n--- " + msg + " ---")),
        step: (msg) => console.log(chalk.blue("🔹 " + msg)),
        result: (msg) => console.log(chalk.green("📋 " + msg))
    }
};

/**
 * Generates a new BLS12-381 G1 key pair for transport encryption
 * @returns {Object} Object containing secret key (sk) and public key (pk)
 */
function generateTransportKey() {
    const sk = bls.randomPrivateKey();
    const pk = PointG1.fromPrivateKey(sk).toRawBytes(true);
    return { sk, pk };
}

/**
 * Mock VetKD decryption function (placeholder for real implementation)
 * In a real scenario, this would use the user's private G1 key to decrypt
 * the VetKD signature and verify the BLS12-381 G2 signature.
 * 
 * @param {Uint8Array} encryptedSignature - The encrypted VetKD signature
 * @param {Uint8Array} privateKeyG1 - User's private G1 key
 * @returns {Uint8Array} Decrypted signature (mock implementation)
 */
function mockDecryptVetKD(encryptedSignature, privateKeyG1) {
    // This is a placeholder - in reality, you would:
    // 1. Use the private G1 key to decrypt the VetKD signature
    // 2. Verify the BLS12-381 G2 signature against the derived public key
    // 3. Return the verification result
    
    utils.log.warning("[MOCK] VetKD decryption - replace with real implementation");
    return encryptedSignature.slice(0, 32); // Mock: return first 32 bytes
}

/**
 * Workflow demonstration class
 */
class CertificateVetKDWorkflow {
    constructor() {
        this.agent = null;
        this.canister = null;
        this.userCertificates = [];
        this.transportKey = null;
    }

    /**
     * Initialize the workflow environment
     */
    async initialize() {
        utils.log.header("Certificate + VetKD Workflow Demonstration");
        
        const host = CONFIG.USE_MAINNET ? CONFIG.MAINNET_HOST : CONFIG.LOCAL_HOST;
        const canisterId = CONFIG.USE_MAINNET ? CONFIG.MAINNET_CANISTER_ID : CONFIG.LOCAL_CANISTER_ID;
        
        utils.log.info(`Environment: ${CONFIG.USE_MAINNET ? 'Mainnet' : 'Local Development'}`);
        utils.log.info(`Canister ID: ${canisterId}`);
        
        this.agent = new HttpAgent({ host });
        
        if (host.includes("127.0.0.1")) {
            utils.log.info("Fetching root key for local environment...");
            await this.agent.fetchRootKey();
        }
        
        this.canister = Actor.createActor(idlFactory, { 
            agent: this.agent, 
            canisterId: canisterId 
        });
        
        // Generate transport key for the session
        this.transportKey = generateTransportKey();
        utils.log.success("Workflow environment initialized");
    }

    /**
     * Step 1: Certificate Management
     * Demonstrates storing and retrieving certificate hashes
     */
    async demonstrateCertificateManagement() {
        utils.log.section("Step 1: Certificate Management");
        
        // Simulate different types of certificates
        const certificates = [
            { name: "SSL Certificate", hash: [0xde, 0xad, 0xbe, 0xef, 0x01, 0x02, 0x03, 0x04] },
            { name: "Code Signing Certificate", hash: [0xca, 0xfe, 0xba, 0xbe, 0x05, 0x06, 0x07, 0x08] },
            { name: "Identity Certificate", hash: [0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0] }
        ];
        
        utils.log.step("Storing certificate hashes...");
        
        for (const cert of certificates) {
            utils.log.info(`Adding ${cert.name}...`);
            await this.canister.add_cert(cert.hash);
            this.userCertificates.push(cert);
            await utils.pause(500); // Small delay for demonstration
        }
        
        utils.log.step("Retrieving stored certificates...");
        const storedCerts = await this.canister.list_certs([]);
        
        utils.log.result(`Found ${storedCerts.length} certificates:`);
        storedCerts.forEach((cert, index) => {
            utils.log.info(`  ${index + 1}. ${this.userCertificates[index].name}: ${utils.hex(cert)}`);
        });
        
        utils.log.success("Certificate management demonstration completed");
    }

    /**
     * Step 2: VetKD Public Key Retrieval
     * Shows how to get the VetKD public key for verification
     */
    async demonstrateVetKDPublicKey() {
        utils.log.section("Step 2: VetKD Public Key Retrieval");
        
        utils.log.step("Requesting VetKD public key...");
        const response = await this.canister.bls_public_key();
        
        utils.log.result(`VetKD Public Key (${response.pk.length} bytes):`);
        utils.log.info(`  ${utils.hex(response.pk.slice(0, 16))}...`);
        
        utils.log.info("This public key can be used to verify VetKD signatures");
        utils.log.success("VetKD public key retrieved successfully");
    }

    /**
     * Step 3: Basic VetKD Signature
     * Demonstrates simple VetKD signature generation
     */
    async demonstrateBasicVetKDSignature() {
        utils.log.section("Step 3: Basic VetKD Signature");
        
        const payload = [0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88];
        
        utils.log.step("Generating basic VetKD signature...");
        utils.log.info(`Payload: ${utils.hex(payload)}`);
        utils.log.info(`Transport Key: ${utils.hex(this.transportKey.pk.slice(0, 8))}...`);
        
        const signature = await this.canister.sign_caller(payload, [...this.transportKey.pk]);
        
        utils.log.result(`VetKD Signature (${signature.signature.length} bytes):`);
        utils.log.info(`  ${utils.hex(signature.signature.slice(0, 16))}...`);
        
        utils.log.info("This signature is encrypted for the transport key");
        utils.log.success("Basic VetKD signature generated successfully");
    }

    /**
     * Step 4: Dual Signature System
     * Demonstrates the complete dual signature workflow
     */
    async demonstrateDualSignatureSystem() {
        utils.log.section("Step 4: Dual Signature System");
        
        const payload = [0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22];
        const certHash = this.userCertificates[0].hash; // Use first certificate
        
        utils.log.step("Creating dual signature (VetKD + Ed25519)...");
        utils.log.info(`Payload: ${utils.hex(payload)}`);
        utils.log.info(`Certificate: ${this.userCertificates[0].name}`);
        utils.log.info(`Certificate Hash: ${utils.hex(certHash)}`);
        
        const shutdownSig = await this.canister.sign_shutdown(payload, certHash, [...this.transportKey.pk]);
        
        utils.log.result("Dual Signature Components:");
        utils.log.info(`  VetKD Signature: ${shutdownSig.vetkd_sig.length} bytes`);
        utils.log.info(`  Ed25519 Signature: ${shutdownSig.canister_sig.length} bytes`);
        
        // Verify Ed25519 signature immediately
        utils.log.step("Verifying Ed25519 signature...");
        const isValid = await this.canister.verify_shutdown(payload, certHash, shutdownSig.canister_sig);
        
        if (isValid) {
            utils.log.success("Ed25519 signature verification successful");
        } else {
            utils.log.error("Ed25519 signature verification failed");
        }
        
        utils.log.success("Dual signature system demonstration completed");
    }

    /**
     * Step 5: Security Testing
     * Demonstrates tamper detection and security features
     */
    async demonstrateSecurityFeatures() {
        utils.log.section("Step 5: Security Testing");
        
        const originalPayload = [0x11, 0x22, 0x33, 0x44];
        const originalHash = this.userCertificates[1].hash;
        
        utils.log.step("Creating original signature...");
        const originalSig = await this.canister.sign_shutdown(originalPayload, originalHash, [...this.transportKey.pk]);
        
        // Test 1: Tampered payload
        utils.log.step("Testing tampered payload detection...");
        const tamperedPayload = [0x99, 0x88, 0x77, 0x66];
        const tamperedValid = await this.canister.verify_shutdown(tamperedPayload, originalHash, originalSig.canister_sig);
        
        if (!tamperedValid) {
            utils.log.success("✅ Tampered payload correctly rejected");
        } else {
            utils.log.error("❌ Tampered payload incorrectly accepted");
        }
        
        // Test 2: Tampered certificate hash
        utils.log.step("Testing tampered certificate hash detection...");
        const tamperedHash = [0xca, 0xfe, 0xba, 0xbe, 0x99, 0x88, 0x77, 0x66];
        const tamperedHashValid = await this.canister.verify_shutdown(originalPayload, tamperedHash, originalSig.canister_sig);
        
        if (!tamperedHashValid) {
            utils.log.success("✅ Tampered certificate hash correctly rejected");
        } else {
            utils.log.error("❌ Tampered certificate hash incorrectly accepted");
        }
        
        // Test 3: Valid verification
        utils.log.step("Testing valid signature verification...");
        const validCheck = await this.canister.verify_shutdown(originalPayload, originalHash, originalSig.canister_sig);
        
        if (validCheck) {
            utils.log.success("✅ Valid signature correctly accepted");
        } else {
            utils.log.error("❌ Valid signature incorrectly rejected");
        }
        
        utils.log.success("Security testing completed");
    }

    /**
     * Step 6: Complete Workflow Simulation
     * Simulates a real-world scenario
     */
    async demonstrateCompleteWorkflow() {
        utils.log.section("Step 6: Complete Workflow Simulation");
        
        // Simulate a real-world scenario: signing a deployment manifest
        const deploymentManifest = {
            version: "1.0.0",
            timestamp: Date.now(),
            resources: { cpu: "2", memory: "4GB", storage: "100GB" },
            image: "nginx:latest"
        };
        
        const manifestBytes = new TextEncoder().encode(JSON.stringify(deploymentManifest));
        const manifestHash = Array.from(manifestBytes);
        const certHash = this.userCertificates[2].hash; // Use identity certificate
        
        utils.log.step("Simulating deployment manifest signing...");
        utils.log.info(`Manifest: ${JSON.stringify(deploymentManifest, null, 2)}`);
        utils.log.info(`Certificate: ${this.userCertificates[2].name}`);
        
        const signature = await this.canister.sign_shutdown(manifestHash, certHash, [...this.transportKey.pk]);
        
        utils.log.result("Deployment signature created:");
        utils.log.info(`  VetKD Signature: ${signature.vetkd_sig.length} bytes`);
        utils.log.info(`  Ed25519 Signature: ${signature.canister_sig.length} bytes`);
        
        // Verify the signature
        const isValid = await this.canister.verify_shutdown(manifestHash, certHash, signature.canister_sig);
        
        if (isValid) {
            utils.log.success("✅ Deployment manifest signature verified successfully");
            utils.log.info("This signature can now be used to authorize the deployment");
        } else {
            utils.log.error("❌ Deployment manifest signature verification failed");
        }
        
        utils.log.success("Complete workflow simulation finished");
    }

    /**
     * Step 7: VetKD Decryption Simulation
     * Shows how VetKD signatures would be decrypted and verified
     */
    async demonstrateVetKDDecryption() {
        utils.log.section("Step 7: VetKD Decryption Simulation");
        
        const payload = [0xaa, 0xbb, 0xcc, 0xdd];
        const certHash = this.userCertificates[0].hash;
        
        utils.log.step("Creating signature for VetKD decryption demonstration...");
        const signature = await this.canister.sign_shutdown(payload, certHash, [...this.transportKey.pk]);
        
        utils.log.step("Simulating VetKD decryption...");
        utils.log.info("In a real implementation, you would:");
        utils.log.info("  1. Use your private G1 key to decrypt the VetKD signature");
        utils.log.info("  2. Verify the BLS12-381 G2 signature");
        utils.log.info("  3. Confirm the signature matches the expected data");
        
        // Mock decryption
        const decryptedSignature = mockDecryptVetKD(signature.vetkd_sig, this.transportKey.sk);
        
        utils.log.result("VetKD Decryption (Mock):");
        utils.log.info(`  Encrypted: ${signature.vetkd_sig.length} bytes`);
        utils.log.info(`  Decrypted: ${utils.hex(decryptedSignature.slice(0, 8))}...`);
        
        utils.log.warning("Note: This is a mock implementation. Real VetKD decryption");
        utils.log.warning("requires the official @dfinity/crypto library.");
        
        utils.log.success("VetKD decryption simulation completed");
    }

    /**
     * Run the complete workflow demonstration
     */
    async runCompleteDemonstration() {
        try {
            await this.initialize();
            
            await this.demonstrateCertificateManagement();
            await utils.pause(1000);
            
            await this.demonstrateVetKDPublicKey();
            await utils.pause(1000);
            
            await this.demonstrateBasicVetKDSignature();
            await utils.pause(1000);
            
            await this.demonstrateDualSignatureSystem();
            await utils.pause(1000);
            
            await this.demonstrateSecurityFeatures();
            await utils.pause(1000);
            
            await this.demonstrateCompleteWorkflow();
            await utils.pause(1000);
            
            await this.demonstrateVetKDDecryption();
            
            utils.log.header("Workflow Demonstration Completed Successfully");
            utils.log.success("🎉 All demonstrations completed successfully!");
            utils.log.info("This shows how VetKeys creates a secure, decentralized");
            utils.log.info("private database with threshold cryptography.");
            
        } catch (error) {
            utils.log.error(`Demonstration failed: ${error.message}`);
            console.error(error);
            process.exit(1);
        }
    }
}

/**
 * Main execution function
 */
async function main() {
    const workflow = new CertificateVetKDWorkflow();
    await workflow.runCompleteDemonstration();
}

// Run the demonstration
main().catch(console.error);

export { CertificateVetKDWorkflow, generateTransportKey, mockDecryptVetKD, utils }; 