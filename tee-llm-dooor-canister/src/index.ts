import { IDL, update, query } from 'azle';
import {
  http_transform_args,
  http_request_result
} from 'azle/canisters/management/idl';

import { TEEService } from './teeEndpoints';
import { LLMService, LLMAuthHeaderProvider } from './llmEndpoints';
import { JWTService } from './ecdsa';
import { sha256 } from 'js-sha256';

/**
 * Converts Uint8Array to Base64URL string for JWT body hash calculation
 * @param {Uint8Array} u8 - Input byte array to encode
 * @returns {string} Base64URL encoded string
 */
function b64url(u8: Uint8Array): string {
  const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let out = '';
  for (let i = 0; i < u8.length; i += 3) {
    const a = u8[i] ?? 0;
    const b = u8[i + 1] ?? 0;
    const c = u8[i + 2] ?? 0;
    const t = (a << 16) | (b << 8) | c;
    out += table[(t >>> 18) & 63] + table[(t >>> 12) & 63] +
      (i + 1 < u8.length ? table[(t >>> 6) & 63] : '=') +
      (i + 2 < u8.length ? table[t & 63] : '=');
  }
  return out.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export default class DooorCanister {
  private teeService: TEEService;
  private llmService: LLMService;
  private jwt: JWTService;

  constructor() {
    this.teeService = new TEEService();
    this.llmService = new LLMService();
    this.jwt = new JWTService();

    // --- Provider de Auth (JWT ES256K com binding htm/htu/bod + aud) ---
    const provider: LLMAuthHeaderProvider = async (method, url, body) => {
      const now = BigInt(Math.floor(Date.now() / 1000));
      const htm = method.toUpperCase(); // GET/POST
      const htu = url;                  // use a URL exata usada no http_request
      const bod = body && body.length > 0
        ? b64url(Uint8Array.from(sha256.array(body)))
        : undefined;

      const { jwt } = await this.jwt.issueJwtAtWith({
        sub: 'canister',
        nowSec: now,
        aud: 'dooor-llm', // ajuste se preferir outro identificador no Guard
        htm, htu, bod
      });

      return [
        { name: 'Authorization', value: `Bearer ${jwt}` }
      ];
    };

    this.llmService.setAuthHeaderProvider(provider);
  }

  // ===== LLM =====
  /**
   * Retrieves all available LLM models with JWT authentication
   * @returns {Promise<string>} JSON string containing list of models with metadata
   */
  @update([], IDL.Text)
  async getAllModels(): Promise<string> {
    return await this.llmService.getAllModels();
  }

  /**
   * Retrieves specific model information by ID with JWT authentication
   * @param {string} modelId - Unique identifier of the model
   * @returns {Promise<string>} JSON string containing model details
   */
  @update([IDL.Text], IDL.Text)
  async getModelById(modelId: string): Promise<string> {
    return await this.llmService.getModelById(modelId);
  }

  /**
   * Sets a specific model as the system default with JWT authentication
   * @param {string} modelId - Unique identifier of the model to set as default
   * @returns {Promise<string>} JSON string containing operation result
   */
  @update([IDL.Text], IDL.Text)
  async setDefaultModel(modelId: string): Promise<string> {
    return await this.llmService.setDefaultModel(modelId);
  }

  // ===== TEE =====
  /**
   * Performs complete TEE infrastructure validation
   * @param {string} jwt - JWT token for authentication
   * @returns {Promise<string>} JSON string containing comprehensive security report
   */
  // mantém o antigo, mesma assinatura:
  @update([], IDL.Text)
  validateTeeInfrastructure(): string {
    return JSON.stringify({
      validation_status: "ERROR",
      error_message: "Deprecated: use validateTeeInfrastructureV2(jwt)"
    });
  }

  // novo método que recebe o JWT (determinístico, sem outcall que cause divergência):
  @update([IDL.Text], IDL.Text)
  async validateTeeInfrastructureV2(jwt: string): Promise<string> {
    return await this.teeService.validateCompleteInfrastructure(jwt);
  }
  // ===== Config JWT/t-ECDSA =====
  /**
   * Configures the ECDSA key name for JWT signing operations
   * @param {string} name - Key name identifier (e.g., "dfx_test_key", "key_1")
   * @returns {Promise<string>} "ok" on success
   */
  @update([IDL.Text], IDL.Text)
  async jwt_configureKey(name: string): Promise<string> {
    this.jwt.configureKey(name);
    return 'ok';
  }

  /**
   * Configures the cycles allocation for ECDSA signing operations
   * @param {bigint} cycles - Number of cycles to allocate (minimum ~26.2B recommended)
   * @returns {Promise<string>} "ok" on success
   */
  @update([IDL.Nat64], IDL.Text)
  async jwt_configureCycles(cycles: bigint): Promise<string> {
    this.jwt.configureCycles(cycles);
    return 'ok';
  }

  // ===== JWT / t-ECDSA =====
  /**
   * Fetches and caches the ECDSA public key from the management canister
   * @returns {Promise<string>} Status message indicating success or already initialized
   */
  @update([], IDL.Text)
  async jwt_fetchEcdsaPk(): Promise<string> {
    return await this.jwt.fetchEcdsaPk();
  }

  /**
   * Issues a JWT token with current timestamp
   * @param {string} sub - Subject claim for the JWT token
   * @returns {Promise<string>} JWT token string
   */
  @update([IDL.Text], IDL.Text)
  async jwt_issueJwt(sub: string): Promise<string> {
    const { jwt } = await this.jwt.issueJwt(sub);
    return jwt;
  }

  /**
   * Issues a JWT token with specified timestamp
   * @param {string} sub - Subject claim for the JWT token
   * @param {bigint} now_sec - Unix timestamp in seconds
   * @returns {Promise<string>} JWT token string
   */
  @update([IDL.Text, IDL.Nat64], IDL.Text)
  async jwt_issueJwtAt(sub: string, now_sec: bigint): Promise<string> {
    const { jwt } = await this.jwt.issueJwtAt(sub, now_sec);
    return jwt;
  }

  /**
   * Returns the compressed ECDSA public key (SEC1 format, 33 bytes)
   * @returns {Uint8Array} Compressed public key as byte array
   */
  @query([], IDL.Vec(IDL.Nat8))
  jwt_getCompressedPk(): Uint8Array {
    return this.jwt.getCompressedPk();
  }

  /**
   * Performs a self-test of the JWT/ECDSA system
   * @returns {Promise<string>} JWT token string for testing
   */
  @update([], IDL.Text)
  async jwt_selfTest(): Promise<string> {
    return await this.jwt.selfTest();
  }

  // ====== TESTE LOCAL: só constrói os headers que seriam enviados ======
  /**
   * Builds HTTP authentication headers with JWT token for testing
   * @param {string} method - HTTP method ("get" or "post")
   * @param {string} url - Target URL for the request
   * @param {[] | [Uint8Array]} bodyOpt - Optional request body as byte array
   * @returns {Promise<Array<{name: string, value: string}>>} Array of HTTP headers including Authorization
   */
  @update([IDL.Text, IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8))],
    IDL.Vec(IDL.Record({ name: IDL.Text, value: IDL.Text })))
  async llm_buildAuthHeaders(method: string, url: string, bodyOpt: [] | [Uint8Array]) {
    const m = (method || 'get').toLowerCase() === 'post' ? 'post' : 'get';
    const body = bodyOpt.length === 1 ? bodyOpt[0] : undefined;
    return await this.llmService.buildAuthHeaders(m as 'get' | 'post', url, body);
  }

  /**
   * Returns the compressed ECDSA public key in hexadecimal format
   * @returns {string} Compressed public key as hex string (66 characters, 0x02/0x03 prefix)
   */
  @query([], IDL.Text)
  jwt_getCompressedPkHex(): string {
    return this.jwt.getCompressedPkHex();
  }

  // ===== HTTP transform =====
  /**
   * HTTP response transform function for ICP outcalls
   * @param {http_transform_args} args - HTTP response arguments
   * @returns {http_request_result} Transformed HTTP response
   */
  @query([http_transform_args], http_request_result)
  httpTransform(args: http_transform_args): http_request_result {
    // zera headers imprevisíveis
    const headers: { name: string; value: string }[] = [];

    // tenta canonizar JSON do corpo
    let bodyBytes: any = Uint8Array.from(args.response.body ?? []);
    try {
      const txt = new TextDecoder().decode(bodyBytes);
      const val = JSON.parse(txt);

      // remove/normaliza campos voláteis recursivamente
      const DROP = new Set([
        'timestamp', 'date', 'last_updated', 'lastUpdated', 'updatedAt', 'createdAt',
        'configuration_hash', 'total_outbound_calls',
        'http_call_logs', 'httpCallLogs', 'request_id', 'x-request-id', 'x_request_id'
      ]);

      const scrub = (v: any): any => {
        if (Array.isArray(v)) return v.map(scrub);
        if (v && typeof v === 'object') {
          const o: any = {};
          for (const [k, sub] of Object.entries(v)) {
            if (!DROP.has(k)) o[k] = scrub(sub);
          }
          return o;
        }
        return v;
      };

      const canon = JSON.stringify(scrub(val)); // ordem estável
      bodyBytes = new TextEncoder().encode(canon);
    } catch {
      // não era JSON? deixa o corpo como veio
    }

    return { ...args.response, headers, body: Array.from(bodyBytes) };
  }
}
