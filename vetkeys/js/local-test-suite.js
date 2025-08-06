/**
 * VetKeys Local Test Suite
 * ========================
 * 
 * Comprehensive test suite for the VetKeys Private Database Canister.
 * This file provides thorough testing of all canister functions during local development.
 * 
 * Features:
 * - Complete function testing with error handling
 * - Certificate storage and retrieval tests
 * - VetKD signature generation and validation
 * - Ed25519 signature verification
 * - Security scenario testing
 * - Performance benchmarking
 * 
 * Prerequisites:
 *   npm install @dfinity/agent @dfinity/candid @noble/bls12-381 @noble/ed25519 chalk
 *   dfx generate vetkeys
 *   dfx start --background --clean
 *   dfx deploy
 * 
 * Usage:
 *   node local-test-suite.js
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
        header: (msg) => console.log(chalk.cyan.bold("\n" + "=".repeat(50) + "\n" + msg + "\n" + "=".repeat(50))),
        section: (msg) => console.log(chalk.magenta.bold("\n--- " + msg + " ---"))
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
 * Test suite class for comprehensive canister testing
 */
class VetKeysTestSuite {
    constructor() {
        this.agent = null;
        this.canister = null;
        this.testResults = {
            passed: 0,
            failed: 0,
            total: 0
        };
    }

    /**
     * Initialize the test environment
     */
    async initialize() {
        utils.log.header("VetKeys Local Test Suite");

        const host = CONFIG.USE_MAINNET ? CONFIG.MAINNET_HOST : CONFIG.LOCAL_HOST;
        const canisterId = CONFIG.USE_MAINNET ? CONFIG.MAINNET_CANISTER_ID : CONFIG.LOCAL_CANISTER_ID;

        utils.log.info(`Connecting to ${CONFIG.USE_MAINNET ? 'mainnet' : 'local'} environment`);
        utils.log.info(`Host: ${host}`);
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

        utils.log.success("Test environment initialized successfully");
    }

    /**
     * Run a test and track results
     * @param {string} testName - Name of the test
     * @param {Function} testFn - Test function to execute
     */
    async runTest(testName, testFn) {
        this.testResults.total++;
        try {
            utils.log.section(testName);
            await testFn();
            this.testResults.passed++;
            utils.log.success(`${testName} - PASSED`);
        } catch (error) {
            this.testResults.failed++;
            utils.log.error(`${testName} - FAILED: ${error.message}`);
            console.error(error);
        }
    }

    /**
     * Test certificate storage operations
     */
    async testCertificateStorage() {
        const testHash1 = [0xde, 0xad, 0xbe, 0xef];
        const testHash2 = [0xca, 0xfe, 0xba, 0xbe];
        const testHash3 = [0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0];

        // Test adding certificates
        utils.log.info("Adding test certificate 1...");
        await this.canister.add_cert(testHash1);

        utils.log.info("Adding test certificate 2...");
        await this.canister.add_cert(testHash2);

        utils.log.info("Adding test certificate 3...");
        await this.canister.add_cert(testHash3);

        // Test listing certificates
        utils.log.info("Retrieving certificate list...");
        const certificates = await this.canister.list_certs([]);

        if (certificates.length !== 3) {
            throw new Error(`Expected 3 certificates, got ${certificates.length}`);
        }

        utils.log.info(`Found ${certificates.length} certificates`);
        certificates.forEach((cert, index) => {
            utils.log.info(`Certificate ${index + 1}: ${utils.hex(cert)}`);
        });
    }

    /**
     * Test VetKD public key retrieval
     */
    async testVetKDPublicKey() {
        utils.log.info("Retrieving VetKD public key...");
        const response = await this.canister.bls_public_key();

        if (!response.pk || response.pk.length === 0) {
            throw new Error("VetKD public key is empty");
        }

        utils.log.info(`VetKD Public Key (${response.pk.length} bytes): ${utils.hex(response.pk.slice(0, 8))}...`);
    }

    /**
     * Test VetKD signature generation
     */
    async testVetKDSignature() {
        const transportKey = generateTransportKey();
        const payload = [0x11, 0x22, 0x33, 0x44, 0x55];

        utils.log.info("Generating transport key...");
        utils.log.info(`Transport PK: ${utils.hex(transportKey.pk.slice(0, 8))}...`);

        utils.log.info("Requesting VetKD signature...");
        const signature = await this.canister.sign_caller(payload, [...transportKey.pk]);

        if (!signature.signature || signature.signature.length === 0) {
            throw new Error("VetKD signature is empty");
        }

        utils.log.info(`VetKD Signature (${signature.signature.length} bytes): ${utils.hex(signature.signature.slice(0, 8))}...`);
    }

    /**
     * Test dual signature system (VetKD + Ed25519)
     */
    async testDualSignature() {
        const transportKey = generateTransportKey();
        const payload = [0x99, 0x88, 0x77, 0x66];
        const certHash = [0xde, 0xad, 0xbe, 0xef];

        utils.log.info("Testing dual signature system...");
        utils.log.info(`Payload: ${utils.hex(payload)}`);
        utils.log.info(`Certificate Hash: ${utils.hex(certHash)}`);

        const shutdownSig = await this.canister.sign_shutdown(payload, certHash, [...transportKey.pk]);

        if (!shutdownSig.vetkd_sig || !shutdownSig.canister_sig) {
            throw new Error("Dual signature missing components");
        }

        utils.log.info(`VetKD Signature: ${shutdownSig.vetkd_sig.length} bytes`);
        utils.log.info(`Ed25519 Signature: ${shutdownSig.canister_sig.length} bytes`);

        // Test Ed25519 verification
        utils.log.info("Verifying Ed25519 signature...");
        const isValid = await this.canister.verify_shutdown(payload, certHash, shutdownSig.canister_sig);

        if (!isValid) {
            throw new Error("Ed25519 signature verification failed");
        }

        utils.log.success("Ed25519 signature verification successful");
    }

    /**
     * Test security scenarios
     */
    async testSecurityScenarios() {
        const transportKey = generateTransportKey();
        const originalPayload = [0x11, 0x22, 0x33];
        const originalHash = [0xde, 0xad, 0xbe, 0xef];
        const tamperedPayload = [0x99, 0x88, 0x77];

        utils.log.info("Testing security scenarios...");

        // Get original signature
        const originalSig = await this.canister.sign_shutdown(originalPayload, originalHash, [...transportKey.pk]);

        // Test tampered payload verification (should fail)
        utils.log.info("Testing tampered payload verification (should fail)...");
        const tamperedValid = await this.canister.verify_shutdown(tamperedPayload, originalHash, originalSig.canister_sig);

        if (tamperedValid) {
            throw new Error("Tampered payload verification should have failed");
        }

        utils.log.success("Tampered payload correctly rejected");

        // Test tampered hash verification (should fail)
        const tamperedHash = [0xca, 0xfe, 0xba, 0xbe];
        utils.log.info("Testing tampered hash verification (should fail)...");
        const tamperedHashValid = await this.canister.verify_shutdown(originalPayload, tamperedHash, originalSig.canister_sig);

        if (tamperedHashValid) {
            throw new Error("Tampered hash verification should have failed");
        }

        utils.log.success("Tampered hash correctly rejected");
    }

    /**
     * Test error handling
     */
    async testErrorHandling() {
        utils.log.info("Testing error handling...");

        // Test invalid transport key size
        try {
            const invalidKey = [0x01, 0x02, 0x03]; // Too small
            await this.canister.sign_caller([0x01], invalidKey);
            throw new Error("Should have rejected invalid transport key size");
        } catch (error) {
            if (error.message.includes("transport_public_key")) {
                utils.log.success("Invalid transport key size correctly rejected");
            } else {
                throw error;
            }
        }
    }

    /**
     * Run performance benchmarks
     */
    async testPerformance() {
        utils.log.info("Running performance benchmarks...");

        const transportKey = generateTransportKey();
        const payload = [0x11, 0x22, 0x33, 0x44, 0x55];
        const certHash = [0xde, 0xad, 0xbe, 0xef];

        const iterations = 5;
        const startTime = Date.now();

        for (let i = 0; i < iterations; i++) {
            await this.canister.sign_shutdown(payload, certHash, [...transportKey.pk]);
        }

        const endTime = Date.now();
        const avgTime = (endTime - startTime) / iterations;

        utils.log.info(`Average signature time: ${avgTime.toFixed(2)}ms`);
        utils.log.success("Performance benchmark completed");
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        await this.runTest("Certificate Storage", () => this.testCertificateStorage());
        await this.runTest("VetKD Public Key", () => this.testVetKDPublicKey());
        await this.runTest("VetKD Signature", () => this.testVetKDSignature());
        await this.runTest("Dual Signature System", () => this.testDualSignature());
        await this.runTest("Security Scenarios", () => this.testSecurityScenarios());
        await this.runTest("Error Handling", () => this.testErrorHandling());
        await this.runTest("Performance Benchmark", () => this.testPerformance());

        this.printResults();
    }

    /**
     * Print test results summary
     */
    printResults() {
        utils.log.header("Test Results Summary");
        utils.log.info(`Total Tests: ${this.testResults.total}`);
        utils.log.success(`Passed: ${this.testResults.passed}`);
        utils.log.error(`Failed: ${this.testResults.failed}`);

        const successRate = ((this.testResults.passed / this.testResults.total) * 100).toFixed(1);
        utils.log.info(`Success Rate: ${successRate}%`);

        if (this.testResults.failed === 0) {
            utils.log.success("🎉 All tests passed! VetKeys canister is working correctly.");
        } else {
            utils.log.warning("⚠️  Some tests failed. Please check the errors above.");
        }
    }
}

/**
 * Main execution function
 */
async function main() {
    const testSuite = new VetKeysTestSuite();

    try {
        await testSuite.initialize();
        await testSuite.runAllTests();
    } catch (error) {
        utils.log.error(`Test suite failed to initialize: ${error.message}`);
        console.error(error);
        process.exit(1);
    }
}

// Run the test suite
main().catch(console.error);

export { VetKeysTestSuite, generateTransportKey, utils }; 