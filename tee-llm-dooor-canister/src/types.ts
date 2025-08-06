/**
 * Type definitions for the Dooor ICP Canister
 * Contains interfaces for API responses and service configurations
 */

/**
 * HTTP request configuration interface for ICP outcalls
 * Defines the structure for making HTTP requests to external services
 */
export interface HttpRequestConfig {
    url: string;
    method: 'get' | 'post';
    headers?: Array<{ name: string; value: string }>;
    body?: [] | [Uint8Array | number[]];
}

/**
 * Individual LLM model response interface
 * Represents a single language model with its metadata and capabilities
 */
export interface LLMModelResponse {
    id: string;
    name: string;
    provider: string;
    capabilities: string[];
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

/**
 * LLM models list response interface
 * Represents a paginated list of language models with metadata
 */
export interface LLMModelsListResponse {
    models: LLMModelResponse[];
    total: number;
    page: number;
    limit: number;
}

/**
 * LLM default model response interface
 * Represents the response when setting or retrieving the default model
 */
export interface LLMDefaultModelResponse {
    success: boolean;
    message: string;
    defaultModel: {
        id: string;
        name: string;
        provider: string;
    };
}

/**
 * TEE infrastructure validation report interface
 * Comprehensive report containing all TEE validation results and security assessments
 */
export interface TEEInfrastructureReport {
    timestamp: string;
    validation_status: 'PASSED' | 'FAILED' | 'ERROR';
    infrastructure_summary: {
        trusted: boolean;
        hardware: string;
        project: string;
        instance: string;
        zone: string;
        tee_authentic?: boolean;
        firewall_secure?: boolean;
        overall_trusted?: boolean;
        whitelisted_domains?: number;
        firewall_active?: boolean;
    };
    security_assessment?: {
        jwt_validation: {
            valid: boolean;
            errors?: string[];
        };
        security_validation: {
            valid: boolean;
            errors?: string[];
            warnings?: string[];
        };
    };
    compliance_report?: {
        tee_authentic: boolean;
        firewall_secure: boolean;
        overall_trusted: boolean;
    };
    errors?: string[];
    warnings?: string[];
    error_message?: string;
}

/**
 * TEE service configuration interface
 * Defines the configuration parameters for TEE validation services
 */
export interface TEEServiceConfig {
    projectId: string;
    zone: string;
    instanceName: string;
}

/**
 * Service endpoints mapping interface
 * Provides semantic mapping between service types and their operations
 */
export interface ServiceEndpoints {
    tee: {
        security: string;
        connect: string;
    };
    llm: {
        models: string;
        modelById: string;
        setDefault: string;
    };
}

/**
 * Service error interface for error handling
 * Standardized error structure for service-level errors
 */
export interface ServiceError {
    code: string;
    message: string;
    timestamp: string;
    service: 'LLM' | 'TEE';
    endpoint?: string;
}

/**
 * Generic API response interface
 * Standardized response structure for all API endpoints
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ServiceError;
    message?: string;
} 