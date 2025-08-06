/**
 * Configuration constants for the Dooor ICP Canister
 * Contains all external service URLs and HTTP request settings
 */

// External API endpoints configuration

const API_URL = 'https://api-tee.dooor.ai/v1'

/**
 * External service URLs for TEE and LLM operations
 * Provides centralized configuration for all API endpoints
 */
export const URLS = {
    // Trusted Execution Environment endpoints
    TEE_SECURITY: `${API_URL}/tee/security-config`,
    TEE_CONNECT: `${API_URL}/tee/connect`,
    
    // Large Language Model service endpoints
    LLM_MODELS: `${API_URL}/llm-models`,
    LLM_MODEL_BY_ID: `${API_URL}/llm-models`,
    LLM_SET_DEFAULT: `${API_URL}/llm-models`
} as const;

/**
 * HTTP request configuration settings for ICP outcalls
 * Defines limits and resource allocation for external API calls
 */
export const HTTP_SETTINGS = {
    // Maximum response size for HTTP requests (500KB)
    MAX_RESPONSE_BYTES: 500_000n,
    
    // Cycles allocation for HTTP outcalls (60 billion cycles)
    CYCLES: 60_000_000_000n
} as const;

/**
 * TEE (Trusted Execution Environment) configuration constants
 * Defines the specific TEE instance and project settings
 */
export const TEE_CONFIG = {
    PROJECT_ID: 'dooor-core',
    ZONE: 'us-central1-a',
    INSTANCE_NAME: 'tee-vm1'
} as const;

/**
 * Service endpoints mapping for internal use
 * Provides semantic mapping between service types and their operations
 */
export const ENDPOINT_MAPPING = {
    LLM: {
        GET_ALL: 'getAllModels',
        GET_BY_ID: 'getModelById',
        SET_DEFAULT: 'setDefaultModel'
    },
    TEE: {
        VALIDATE_INFRASTRUCTURE: 'validateTeeInfrastructure'
    }
} as const; 