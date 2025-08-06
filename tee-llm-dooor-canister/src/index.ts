import { IDL, update, query } from 'azle';
import {
  http_transform_args,
  http_request_result
} from 'azle/canisters/management/idl';

import { TEEService } from './teeEndpoints';
import { LLMService, LLMAuthHeaderProvider } from './llmEndpoints';
import { JWTService } from './ecdsa';
import { sha256 } from 'js-sha256';

// util local p/ base64url
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
  @update([], IDL.Text)
  async getAllModels(): Promise<string> {
    return await this.llmService.getAllModels();
  }

  @update([IDL.Text], IDL.Text)
  async getModelById(modelId: string): Promise<string> {
    return await this.llmService.getModelById(modelId);
  }

  @update([IDL.Text], IDL.Text)
  async setDefaultModel(modelId: string): Promise<string> {
    return await this.llmService.setDefaultModel(modelId);
  }

  // ===== TEE =====
  @update([], IDL.Text)
  async validateTeeInfrastructure(): Promise<string> {
    return await this.teeService.validateCompleteInfrastructure();
  }

  // ===== Config JWT/t-ECDSA =====
  @update([IDL.Text], IDL.Text)
  async jwt_configureKey(name: string): Promise<string> {
    this.jwt.configureKey(name);
    return 'ok';
  }

  @update([IDL.Nat64], IDL.Text)
  async jwt_configureCycles(cycles: bigint): Promise<string> {
    this.jwt.configureCycles(cycles);
    return 'ok';
  }

  // ===== JWT / t-ECDSA =====
  @update([], IDL.Text)
  async jwt_fetchEcdsaPk(): Promise<string> {
    return await this.jwt.fetchEcdsaPk();
  }

  @update([IDL.Text], IDL.Text)
  async jwt_issueJwt(sub: string): Promise<string> {
    const { jwt } = await this.jwt.issueJwt(sub);
    return jwt;
  }

  @update([IDL.Text, IDL.Nat64], IDL.Text)
  async jwt_issueJwtAt(sub: string, now_sec: bigint): Promise<string> {
    const { jwt } = await this.jwt.issueJwtAt(sub, now_sec);
    return jwt;
  }

  @query([], IDL.Vec(IDL.Nat8))
  jwt_getCompressedPk(): Uint8Array {
    return this.jwt.getCompressedPk();
  }

  @update([], IDL.Text)
  async jwt_selfTest(): Promise<string> {
    return await this.jwt.selfTest();
  }

  // ====== TESTE LOCAL: só constrói os headers que seriam enviados ======
  @update([IDL.Text, IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8))],
          IDL.Vec(IDL.Record({ name: IDL.Text, value: IDL.Text })))
  async llm_buildAuthHeaders(method: string, url: string, bodyOpt: [] | [Uint8Array]) {
    const m = (method || 'get').toLowerCase() === 'post' ? 'post' : 'get';
    const body = bodyOpt.length === 1 ? bodyOpt[0] : undefined;
    return await this.llmService.buildAuthHeaders(m as 'get' | 'post', url, body);
  }

  @query([], IDL.Text)
  jwt_getCompressedPkHex(): string {
    return this.jwt.getCompressedPkHex();
  }

  // ===== HTTP transform =====
  @query([http_transform_args], http_request_result)
  httpTransform(args: http_transform_args): http_request_result {
    return { ...args.response, headers: [] };
  }
}
