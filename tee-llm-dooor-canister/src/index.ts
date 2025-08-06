import { IDL, update, query } from 'azle';
import {
  http_transform_args,
  http_request_result
} from 'azle/canisters/management/idl';

import { TEEService } from './teeEndpoints';
import { LLMService } from './llmEndpoints';
import { JWTService } from './ecdsa';

export default class DooorCanister {
  private teeService: TEEService;
  private llmService: LLMService;
  private jwt: JWTService;

  constructor() {
    this.teeService = new TEEService();
    this.llmService = new LLMService();
    this.jwt = new JWTService();
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

  // ===== HTTP transform =====
  @query([http_transform_args], http_request_result)
  httpTransform(args: http_transform_args): http_request_result {
    return { ...args.response, headers: [] };
  }
}
