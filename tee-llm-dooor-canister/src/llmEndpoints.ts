import { call, canisterSelf, Principal } from 'azle';
import {
  http_request_args,
  http_request_result
} from 'azle/canisters/management/idl';
import { URLS, HTTP_SETTINGS } from './config';

type HeaderKV = { name: string; value: string };
type MaybeBody = [] | [Uint8Array | number[]];

export class LLMService {
  private authHeaderProvider?: (
    method: 'get' | 'post',
    url: string,
    body?: Uint8Array
  ) => Promise<HeaderKV[]>;

  /**
   * Sets the authentication header provider for JWT token generation
   * @param {LLMAuthHeaderProvider} fn - Function that generates authentication headers
   */
  setAuthHeaderProvider(fn: LLMAuthHeaderProvider) {
    this.authHeaderProvider = fn;
  }

  /**
   * Builds authentication headers for testing purposes
   * @param {'get' | 'post'} method - HTTP method for the request
   * @param {string} url - Target URL for the request
   * @param {Uint8Array} [body] - Optional request body
   * @returns {Promise<HeaderKV[]>} Array of HTTP headers including Authorization
   */
  async buildAuthHeaders(
    method: 'get' | 'post',
    url: string,
    body?: Uint8Array
  ): Promise<HeaderKV[]> {
    if (!this.authHeaderProvider) return [];
    return this.authHeaderProvider(method, url, body);
  }

  /**
   * Executes HTTP request via ICP HTTP outcalls with JWT authentication
   * @param {string} url - Target URL for the HTTP request
   * @param {'get' | 'post'} [method='get'] - HTTP method to use
   * @param {MaybeBody} [body=[]] - Request body as byte array
   * @param {HeaderKV[]} [headers=[]] - Additional HTTP headers
   * @returns {Promise<string>} Response body as decoded string
   */
  private async executeHttpRequest(
    url: string,
    method: 'get' | 'post' = 'get',
    body: MaybeBody = [],
    headers: HeaderKV[] = []
  ): Promise<string> {
    const httpMethod = method === 'get' ? { get: null } : { post: null };

    // cabeçalhos de autenticação (JWT)
    const bodyBytes =
      body.length === 1
        ? Uint8Array.from(body[0] as Uint8Array | number[])
        : undefined;

    const authHeaders = this.authHeaderProvider
      ? await this.authHeaderProvider(method, url, bodyBytes)
      : [];

    const mergedHeaders = [...headers, ...authHeaders];

    const httpResponse = await call<[http_request_args], http_request_result>(
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
            headers: mergedHeaders,
            body,
            transform: [
              {
                function: [canisterSelf(), 'httpTransform'] as [Principal, string],
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

  // ====== Endpoints públicos ======

  /**
   * Retrieves all available LLM models with JWT authentication
   * @returns {Promise<string>} JSON string containing list of models with metadata
   */
  async getAllModels(): Promise<string> {
    return await this.executeHttpRequest(URLS.LLM_MODELS);
  }

  /**
   * Retrieves specific model information by ID with JWT authentication
   * @param {string} modelId - Unique identifier of the model
   * @returns {Promise<string>} JSON string containing model details
   */
  async getModelById(modelId: string): Promise<string> {
    const url = `${URLS.LLM_MODEL_BY_ID}/${modelId}`;
    return await this.executeHttpRequest(url);
  }

  /**
   * Sets a specific model as the system default with JWT authentication
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

// Tipagem do provider (para importadores)
export type LLMAuthHeaderProvider = (
  method: 'get' | 'post',
  url: string,
  body?: Uint8Array
) => Promise<HeaderKV[]>;

// Legacy exports
/**
 * Legacy function to get all LLM models (deprecated - use LLMService class)
 * @returns {Promise<string>} JSON string containing list of models
 * @deprecated Use LLMService.getAllModels() instead
 */
export async function getAllLlmModels(): Promise<string> {
  const service = new LLMService();
  return await service.getAllModels();
}

/**
 * Legacy function to get LLM model by ID (deprecated - use LLMService class)
 * @param {string} modelId - Unique identifier of the model
 * @returns {Promise<string>} JSON string containing model details
 * @deprecated Use LLMService.getModelById() instead
 */
export async function getLlmModelById(modelId: string): Promise<string> {
  const service = new LLMService();
  return await service.getModelById(modelId);
}

/**
 * Legacy function to set default LLM model (deprecated - use LLMService class)
 * @param {string} modelId - Unique identifier of the model to set as default
 * @returns {Promise<string>} JSON string containing operation result
 * @deprecated Use LLMService.setDefaultModel() instead
 */
export async function setDefaultLlmModel(modelId: string): Promise<string> {
  const service = new LLMService();
  return await service.setDefaultModel(modelId);
}
