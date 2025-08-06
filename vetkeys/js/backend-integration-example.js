/**
 * VetKeys Backend Integration Example
 * ===================================
 * 
 * This file demonstrates how to integrate the VetKeys canister into a backend
 * application for signature verification and certificate management.
 * 
 * Features:
 * - Professional class-based architecture
 * - Comprehensive error handling
 * - Production-ready integration patterns
 * - VetKD signature verification
 * - Ed25519 signature validation
 * - Certificate hash management
 * 
 * Use Cases:
 * - Harbor backend integration
 * - API authentication systems
 * - Certificate verification services
 * - Secure deployment authorization
 * 
 * Prerequisites:
 *   npm install @dfinity/agent @dfinity/candid @noble/ed25519
 *   dfx generate vetkeys
 * 
 * @author DOOOR Team
 * @version 1.0.0
 */

import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "./vetkeys.did.js";
import * as ed25519 from "@noble/ed25519";

// Configuration
const CONFIG = {
    MAINNET_HOST: "https://ic0.app",
    MAINNET_CANISTER_ID: "irdox-qiaaa-aaaac-qbleq-cai",
    LOCAL_HOST: "http://127.0.0.1:8000",
    LOCAL_CANISTER_ID: "uxrrr-q7777-77774-qaaaq-cai",
    USE_MAINNET: false, // Set to true for mainnet
    TIMEOUT_MS: 30000, // 30 seconds timeout
    MAX_RETRIES: 3
};

/**
 * Custom error classes for better error handling
 */
class VetKeysError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'VetKeysError';
        this.code = code;
        this.details = details;
    }
}

class SignatureVerificationError extends VetKeysError {
    constructor(message, details = {}) {
        super(message, 'SIGNATURE_VERIFICATION_FAILED', details);
        this.name = 'SignatureVerificationError';
    }
}

class CertificateError extends VetKeysError {
    constructor(message, details = {}) {
        super(message, 'CERTIFICATE_ERROR', details);
        this.name = 'CertificateError';
    }
}

/**
 * Utility functions for the backend integration
 */
const utils = {
    /**
     * Convert Uint8Array to hex string
     * @param {Uint8Array} bytes - Bytes to convert
     * @returns {string} Hex string representation
     */
    toHex: (bytes) => [...bytes].map(b => b.toString(16).padStart(2, "0")).join(""),
    
    /**
     * Convert hex string to Uint8Array
     * @param {string} hex - Hex string to convert
     * @returns {Uint8Array} Byte array
     */
    fromHex: (hex) => new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
    
    /**
     * Hash a string using SHA-256
     * @param {string} data - Data to hash
     * @returns {Promise<Uint8Array>} Hash result
     */
    async hashString(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        return new Uint8Array(hashBuffer);
    },
    
    /**
     * Retry function with exponential backoff
     * @param {Function} fn - Function to retry
     * @param {number} maxRetries - Maximum number of retries
     * @returns {Promise<any>} Function result
     */
    async retry(fn, maxRetries = CONFIG.MAX_RETRIES) {
        let lastError;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                
                if (attempt === maxRetries) {
                    throw error;
                }
                
                // Exponential backoff: 1s, 2s, 4s, 8s...
                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw lastError;
    }
};

/**
 * Mock VetKD decryption function
 * In production, replace with official @dfinity/crypto implementation
 * 
 * @param {Uint8Array} encryptedSignature - Encrypted VetKD signature
 * @param {Uint8Array} privateKeyG1 - User's private G1 key
 * @returns {Uint8Array} Decrypted signature (mock implementation)
 */
function mockDecryptVetKD(encryptedSignature, privateKeyG1) {
    // TODO: Replace with real VetKD decryption
    // import { decryptVetKD } from "@dfinity/crypto";
    console.warn("[MOCK] VetKD decryption - replace with real implementation");
    return encryptedSignature.slice(0, 32);
}

/**
 * VetKeys Backend Integration Class
 * 
 * This class provides a complete interface for integrating VetKeys
 * into backend applications, handling all aspects of signature
 * verification and certificate management.
 */
export class VetKeysBackendIntegration {
    /**
     * Initialize the VetKeys backend integration
     * 
     * @param {Object} options - Configuration options
     * @param {string} options.host - IC host URL (optional)
     * @param {string} options.canisterId - Canister ID (optional)
     * @param {number} options.timeout - Request timeout in ms (optional)
     */
    constructor(options = {}) {
        this.host = options.host || (CONFIG.USE_MAINNET ? CONFIG.MAINNET_HOST : CONFIG.LOCAL_HOST);
        this.canisterId = options.canisterId || (CONFIG.USE_MAINNET ? CONFIG.MAINNET_CANISTER_ID : CONFIG.LOCAL_CANISTER_ID);
        this.timeout = options.timeout || CONFIG.TIMEOUT_MS;
        
        this.agent = null;
        this.canister = null;
        this.isInitialized = false;
        
        // Cache for performance optimization
        this.certificateCache = new Map();
        this.publicKeyCache = null;
    }

    /**
     * Initialize the connection to the VetKeys canister
     * 
     * @throws {VetKeysError} If initialization fails
     */
    async initialize() {
        try {
            this.agent = new HttpAgent({ 
                host: this.host,
                fetchRootKey: !this.host.includes('ic0.app')
            });
            
            this.canister = Actor.createActor(idlFactory, {
                agent: this.agent,
                canisterId: this.canisterId
            });
            
            // Test connection
            await this.testConnection();
            
            this.isInitialized = true;
            console.log(`✅ VetKeys backend integration initialized for canister: ${this.canisterId}`);
            
        } catch (error) {
            throw new VetKeysError(
                `Failed to initialize VetKeys integration: ${error.message}`,
                'INITIALIZATION_FAILED',
                { canisterId: this.canisterId, host: this.host }
            );
        }
    }

    /**
     * Test the connection to the canister
     * 
     * @throws {VetKeysError} If connection test fails
     */
    async testConnection() {
        try {
            await utils.retry(async () => {
                const response = await this.canister.bls_public_key();
                if (!response.pk || response.pk.length === 0) {
                    throw new Error("Invalid public key response");
                }
            });
        } catch (error) {
            throw new VetKeysError(
                `Connection test failed: ${error.message}`,
                'CONNECTION_TEST_FAILED'
            );
        }
    }

    /**
     * Verify a dual signature (VetKD + Ed25519)
     * 
     * @param {Object} signatureData - Signature data to verify
     * @param {Uint8Array} signatureData.payload - Original payload
     * @param {Uint8Array} signatureData.certificateHash - Certificate hash
     * @param {Object} signatureData.signature - Signature object
     * @param {Uint8Array} signatureData.signature.vetkdSig - VetKD signature
     * @param {Uint8Array} signatureData.signature.canisterSig - Ed25519 signature
     * @param {Uint8Array} signatureData.privateKeyG1 - User's private G1 key (for VetKD)
     * @returns {Promise<Object>} Verification result
     * @throws {SignatureVerificationError} If verification fails
     */
    async verifyDualSignature(signatureData) {
        if (!this.isInitialized) {
            throw new VetKeysError("VetKeys integration not initialized", 'NOT_INITIALIZED');
        }

        const { payload, certificateHash, signature, privateKeyG1 } = signatureData;

        try {
            // Step 1: Verify Ed25519 signature (fast verification)
            const ed25519Valid = await this.verifyEd25519Signature(payload, certificateHash, signature.canisterSig);
            
            if (!ed25519Valid) {
                throw new SignatureVerificationError("Ed25519 signature verification failed");
            }

            // Step 2: Verify VetKD signature (threshold verification)
            const vetkdValid = await this.verifyVetKDSignature(
                payload, 
                certificateHash, 
                signature.vetkdSig, 
                privateKeyG1
            );

            if (!vetkdValid) {
                throw new SignatureVerificationError("VetKD signature verification failed");
            }

            return {
                valid: true,
                ed25519Verified: true,
                vetkdVerified: true,
                timestamp: Date.now()
            };

        } catch (error) {
            if (error instanceof SignatureVerificationError) {
                throw error;
            }
            
            throw new SignatureVerificationError(
                `Signature verification failed: ${error.message}`,
                { originalError: error.message }
            );
        }
    }

    /**
     * Verify Ed25519 signature
     * 
     * @param {Uint8Array} payload - Original payload
     * @param {Uint8Array} certificateHash - Certificate hash
     * @param {Uint8Array} signature - Ed25519 signature
     * @returns {Promise<boolean>} True if signature is valid
     */
    async verifyEd25519Signature(payload, certificateHash, signature) {
        try {
            return await utils.retry(async () => {
                return await this.canister.verify_shutdown(
                    Array.from(payload),
                    Array.from(certificateHash),
                    Array.from(signature)
                );
            });
        } catch (error) {
            console.error("Ed25519 verification error:", error);
            return false;
        }
    }

    /**
     * Verify VetKD signature (mock implementation)
     * 
     * @param {Uint8Array} payload - Original payload
     * @param {Uint8Array} certificateHash - Certificate hash
     * @param {Uint8Array} encryptedSignature - Encrypted VetKD signature
     * @param {Uint8Array} privateKeyG1 - User's private G1 key
     * @returns {Promise<boolean>} True if signature is valid
     */
    async verifyVetKDSignature(payload, certificateHash, encryptedSignature, privateKeyG1) {
        try {
            // Mock decryption - replace with real implementation
            const decryptedSignature = mockDecryptVetKD(encryptedSignature, privateKeyG1);
            
            // TODO: Implement real BLS12-381 G2 signature verification
            // For now, return true if decryption succeeds
            return decryptedSignature && decryptedSignature.length > 0;
            
        } catch (error) {
            console.error("VetKD verification error:", error);
            return false;
        }
    }

    /**
     * Get certificate hashes for a user
     * 
     * @param {string} principal - User's Principal (optional, uses caller if not provided)
     * @returns {Promise<Uint8Array[]>} Array of certificate hashes
     * @throws {CertificateError} If certificate retrieval fails
     */
    async getCertificates(principal = null) {
        if (!this.isInitialized) {
            throw new VetKeysError("VetKeys integration not initialized", 'NOT_INITIALIZED');
        }

        try {
            const certificates = await utils.retry(async () => {
                return await this.canister.list_certs(principal ? [principal] : []);
            });

            return certificates.map(cert => new Uint8Array(cert));
            
        } catch (error) {
            throw new CertificateError(
                `Failed to retrieve certificates: ${error.message}`,
                { principal }
            );
        }
    }

    /**
     * Add a certificate hash for the current user
     * 
     * @param {Uint8Array} certificateHash - Certificate hash to add
     * @throws {CertificateError} If certificate addition fails
     */
    async addCertificate(certificateHash) {
        if (!this.isInitialized) {
            throw new VetKeysError("VetKeys integration not initialized", 'NOT_INITIALIZED');
        }

        try {
            await utils.retry(async () => {
                await this.canister.add_cert(Array.from(certificateHash));
            });
            
            // Clear cache to ensure fresh data
            this.certificateCache.clear();
            
        } catch (error) {
            throw new CertificateError(
                `Failed to add certificate: ${error.message}`,
                { certificateHash: utils.toHex(certificateHash) }
            );
        }
    }

    /**
     * Get the VetKD public key
     * 
     * @returns {Promise<Uint8Array>} VetKD public key
     * @throws {VetKeysError} If public key retrieval fails
     */
    async getVetKDPublicKey() {
        if (!this.isInitialized) {
            throw new VetKeysError("VetKeys integration not initialized", 'NOT_INITIALIZED');
        }

        // Return cached value if available
        if (this.publicKeyCache) {
            return this.publicKeyCache;
        }

        try {
            const response = await utils.retry(async () => {
                return await this.canister.bls_public_key();
            });

            this.publicKeyCache = new Uint8Array(response.pk);
            return this.publicKeyCache;
            
        } catch (error) {
            throw new VetKeysError(
                `Failed to retrieve VetKD public key: ${error.message}`,
                'PUBLIC_KEY_RETRIEVAL_FAILED'
            );
        }
    }

    /**
     * Create a signature request for a payload
     * 
     * @param {Uint8Array} payload - Data to sign
     * @param {Uint8Array} certificateHash - Certificate hash
     * @param {Uint8Array} transportPublicKey - Transport public key (BLS G1)
     * @returns {Promise<Object>} Signature request result
     * @throws {VetKeysError} If signature creation fails
     */
    async createSignature(payload, certificateHash, transportPublicKey) {
        if (!this.isInitialized) {
            throw new VetKeysError("VetKeys integration not initialized", 'NOT_INITIALIZED');
        }

        try {
            const signature = await utils.retry(async () => {
                return await this.canister.sign_shutdown(
                    Array.from(payload),
                    Array.from(certificateHash),
                    Array.from(transportPublicKey)
                );
            });

            return {
                vetkdSig: new Uint8Array(signature.vetkd_sig),
                canisterSig: new Uint8Array(signature.canister_sig),
                timestamp: Date.now()
            };
            
        } catch (error) {
            throw new VetKeysError(
                `Failed to create signature: ${error.message}`,
                'SIGNATURE_CREATION_FAILED',
                { 
                    payloadLength: payload.length,
                    certificateHashLength: certificateHash.length,
                    transportKeyLength: transportPublicKey.length
                }
            );
        }
    }

    /**
     * Health check for the VetKeys integration
     * 
     * @returns {Promise<Object>} Health status
     */
    async healthCheck() {
        try {
            if (!this.isInitialized) {
                return { status: 'not_initialized', canisterId: this.canisterId };
            }

            const startTime = Date.now();
            await this.testConnection();
            const responseTime = Date.now() - startTime;

            return {
                status: 'healthy',
                canisterId: this.canisterId,
                host: this.host,
                responseTime,
                timestamp: Date.now()
            };
            
        } catch (error) {
            return {
                status: 'unhealthy',
                canisterId: this.canisterId,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }

    /**
     * Clear internal caches
     */
    clearCache() {
        this.certificateCache.clear();
        this.publicKeyCache = null;
    }
}

/**
 * Harbor-specific integration class
 * Extends the base VetKeys integration with Harbor-specific functionality
 */
export class HarborVetKeysIntegration extends VetKeysBackendIntegration {
    constructor(options = {}) {
        super(options);
        this.authorizedCertificates = new Set();
    }

    /**
     * Authorize a certificate for Harbor operations
     * 
     * @param {Uint8Array} certificateHash - Certificate hash to authorize
     */
    authorizeCertificate(certificateHash) {
        this.authorizedCertificates.add(utils.toHex(certificateHash));
    }

    /**
     * Revoke authorization for a certificate
     * 
     * @param {Uint8Array} certificateHash - Certificate hash to revoke
     */
    revokeCertificate(certificateHash) {
        this.authorizedCertificates.delete(utils.toHex(certificateHash));
    }

    /**
     * Verify if a certificate is authorized for Harbor operations
     * 
     * @param {Uint8Array} certificateHash - Certificate hash to check
     * @returns {boolean} True if certificate is authorized
     */
    isCertificateAuthorized(certificateHash) {
        return this.authorizedCertificates.has(utils.toHex(certificateHash));
    }

    /**
     * Harbor-specific signature verification with certificate authorization
     * 
     * @param {Object} signatureData - Signature data to verify
     * @returns {Promise<Object>} Verification result with Harbor-specific info
     */
    async verifyHarborSignature(signatureData) {
        const { certificateHash } = signatureData;

        // Check certificate authorization
        if (!this.isCertificateAuthorized(certificateHash)) {
            throw new CertificateError(
                "Certificate not authorized for Harbor operations",
                { certificateHash: utils.toHex(certificateHash) }
            );
        }

        // Perform standard verification
        const result = await this.verifyDualSignature(signatureData);

        // Add Harbor-specific information
        return {
            ...result,
            harborAuthorized: true,
            certificateAuthorized: true
        };
    }
}

// Export utility functions and error classes
export { utils, VetKeysError, SignatureVerificationError, CertificateError, mockDecryptVetKD };

// Default export for convenience
export default VetKeysBackendIntegration; 