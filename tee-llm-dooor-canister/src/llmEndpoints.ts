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

  /** Permite injetar cabeçalhos de autenticação (JWT ES256K) antes de cada chamada */
  setAuthHeaderProvider(fn: LLMAuthHeaderProvider) {
    this.authHeaderProvider = fn;
  }

  /** Método auxiliar para teste local: devolve os headers que seriam enviados */
  async buildAuthHeaders(
    method: 'get' | 'post',
    url: string,
    body?: Uint8Array
  ): Promise<HeaderKV[]> {
    if (!this.authHeaderProvider) return [];
    return this.authHeaderProvider(method, url, body);
  }

  /**
   * Executa HTTP request via ICP HTTP outcalls
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

  async getAllModels(): Promise<string> {
    return await this.executeHttpRequest(URLS.LLM_MODELS);
  }

  async getModelById(modelId: string): Promise<string> {
    const url = `${URLS.LLM_MODEL_BY_ID}/${modelId}`;
    return await this.executeHttpRequest(url);
  }

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
