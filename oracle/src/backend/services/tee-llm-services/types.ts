/**
 * Type definitions for the Dooor ICP Canister
 * Contains interfaces for API responses and service configurations
 */

// HTTP request configuration interface
export interface HttpRequestConfig {
    url: string;
    method: 'get' | 'post';
    headers?: Array<{ name: string; value: string }>;
    body?: [] | [Uint8Array | number[]];
}

// LLM service response interfaces
export interface LLMModelResponse {
    id: string;
    name: string;
    provider: string;
    capabilities: string[];
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface LLMModelsListResponse {
    models: LLMModelResponse[];
    total: number;
    page: number;
    limit: number;
}

export interface LLMDefaultModelResponse {
    success: boolean;
    message: string;
    defaultModel: {
        id: string;
        name: string;
        provider: string;
    };
}

// TEE validation interfaces
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

// Service configuration interfaces
export interface TEEServiceConfig {
    projectId: string;
    zone: string;
    instanceName: string;
}

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

// Error handling interfaces
export interface ServiceError {
    code: string;
    message: string;
    timestamp: string;
    service: 'LLM' | 'TEE';
    endpoint?: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ServiceError;
    message?: string;
} 