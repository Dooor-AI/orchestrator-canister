import {
    call,
    canisterSelf,
    Principal
} from 'azle';
import {
    http_request_args,
    http_request_result
} from 'azle/canisters/management/idl';
import { URLS, HTTP_SETTINGS } from './config';

/**
 * Service class for handling Large Language Model operations
 * Provides methods to interact with external LLM APIs through HTTP outcalls
 */
export class LLMService {
    /**
     * Executes HTTP request to external LLM service
     * @param {string} url - Target URL for the HTTP request
     * @param {'get' | 'post'} method - HTTP method to use
     * @param {[] | [Uint8Array | number[]]} body - Request body for POST requests
     * @param {Array<{name: string, value: string}>} headers - HTTP headers
     * @returns {Promise<string>} Response body as decoded string
     */
    private async executeHttpRequest(
        url: string,
        method: 'get' | 'post' = 'get',
        body: [] | [Uint8Array | number[]] = [],
        headers: Array<{name: string, value: string}> = []
    ): Promise<string> {
        const httpMethod = method === 'get' ? { get: null } : { post: null };
        
        const httpResponse = await call<
            [http_request_args],
            http_request_result
        >(
            'aaaaa-aa',
            'http_request',
            {
                paramIdlTypes: [http_request_args],
                returnIdlType: http_request_result,
                args: [
                    {
                        url,
                        max_response_bytes: [HTTP_SETTINGS.MAX_RESPONSE_BYTES],
                        method: httpMethod,
                        headers,
                        body,
                        transform: [
                            {
                                function: [canisterSelf(), 'httpTransform'] as [
                                    Principal,
                                    string
                                ],
                                context: Uint8Array.from([])
                            }
                        ]
                    }
                ],
                cycles: HTTP_SETTINGS.CYCLES
            }
        );

        return new TextDecoder().decode(Uint8Array.from(httpResponse.body));
    }

    /**
     * Retrieves all available LLM models from the external service
     * @returns {Promise<string>} JSON string containing list of all models
     */
    async getAllModels(): Promise<string> {
        return await this.executeHttpRequest(URLS.LLM_MODELS);
    }

    /**
     * Retrieves specific LLM model information by its unique identifier
     * @param {string} modelId - Unique identifier of the model
     * @returns {Promise<string>} JSON string containing model details
     */
    async getModelById(modelId: string): Promise<string> {
        const url = `${URLS.LLM_MODEL_BY_ID}/${modelId}`;
        return await this.executeHttpRequest(url);
    }

    /**
     * Sets a specific model as the default for the system
     * @param {string} modelId - Unique identifier of the model to set as default
     * @returns {Promise<string>} JSON string containing operation result
     */
    async setDefaultModel(modelId: string): Promise<string> {
        const requestBody = JSON.stringify({ modelId });
        const encodedBody = new TextEncoder().encode(requestBody);
        const headers = [{ name: 'Content-Type', value: 'application/json' }];
        
        return await this.executeHttpRequest(
            `${URLS.LLM_SET_DEFAULT}/${modelId}/set-default`,
            'post',
            [encodedBody],
            headers
        );
    }
}

// Legacy function exports for backward compatibility (deprecated)
export async function getAllLlmModels(): Promise<string> {
    const service = new LLMService();
    return await service.getAllModels();
}

export async function getLlmModelById(modelId: string): Promise<string> {
    const service = new LLMService();
    return await service.getModelById(modelId);
}

export async function setDefaultLlmModel(modelId: string): Promise<string> {
    const service = new LLMService();
    return await service.setDefaultModel(modelId);
} 