/**
 * Configuration constants for the Dooor ICP Canister
 * Contains all external service URLs and HTTP request settings
 */

// External API endpoints configuration
export const URLS = {
    // Trusted Execution Environment endpoints
    TEE_SECURITY: 'https://api-tee.dooor.ai/v1/tee/security-config',
    TEE_CONNECT: 'https://api-tee.dooor.ai/v1/tee/connect',
    
    // Large Language Model service endpoints
    LLM_MODELS: 'https://dev-backend-production-6f42.up.railway.app/v1/llm-models',
    LLM_MODEL_BY_ID: 'https://dev-backend-production-6f42.up.railway.app/v1/llm-models',
    LLM_SET_DEFAULT: 'https://dev-backend-production-6f42.up.railway.app/v1/llm-models'
} as const;

// HTTP request configuration settings
export const HTTP_SETTINGS = {
    // Maximum response size for HTTP requests (500KB)
    MAX_RESPONSE_BYTES: 500_000n,
    
    // Cycles allocation for HTTP outcalls (60 billion cycles)
    CYCLES: 60_000_000_000n
} as const;

// TEE (Trusted Execution Environment) configuration
export const TEE_CONFIG = {
    PROJECT_ID: 'dooor-core',
    ZONE: 'us-central1-a',
    INSTANCE_NAME: 'tee-vm1'
} as const;

// Service endpoints mapping for internal use
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