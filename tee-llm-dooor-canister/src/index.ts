import {
  IDL,
  update,
  query
} from 'azle';
import {
  http_transform_args,
  http_request_result
} from 'azle/canisters/management/idl';
import { TEEService } from './teeEndpoints';
import { LLMService } from './llmEndpoints';

/**
 * Main canister class providing LLM and TEE validation services
 * Handles Large Language Model operations and Trusted Execution Environment validation
 */
export default class DooorCanister {
  private teeService: TEEService;
  private llmService: LLMService;

  constructor() {
    this.teeService = new TEEService();
    this.llmService = new LLMService();
  }

  // ===== LLM ENDPOINTS =====

  /**
   * Retrieves all available LLM models
   * @returns {Promise<string>} JSON string containing list of all available models
   */
  @update([], IDL.Text)
  async getAllModels(): Promise<string> {
    return await this.llmService.getAllModels();
  }

  /**
   * Retrieves specific LLM model information by ID
   * @param {string} modelId - Unique identifier of the model to retrieve
   * @returns {Promise<string>} JSON string containing model information
   */
  @update([IDL.Text], IDL.Text)
  async getModelById(modelId: string): Promise<string> {
    return await this.llmService.getModelById(modelId);
  }

  /**
   * Sets a specific model as the default for the system
   * @param {string} modelId - Unique identifier of the model to set as default
   * @returns {Promise<string>} JSON string containing operation result
   */
  @update([IDL.Text], IDL.Text)
  async setDefaultModel(modelId: string): Promise<string> {
    return await this.llmService.setDefaultModel(modelId);
  }

  // ===== TEE VALIDATION ENDPOINTS =====

  /**
   * Validates the complete TEE infrastructure and returns comprehensive security report
   * This endpoint performs complete validation of the Trusted Execution Environment
   * @returns {Promise<string>} JSON string containing complete TEE validation report
   */
  @update([], IDL.Text)
  async validateTeeInfrastructure(): Promise<string> {
    return await this.teeService.validateCompleteInfrastructure();
  }

  // ===== HTTP TRANSFORM (Required for all HTTP outcalls) =====

  /**
   * HTTP response transformer required by Azle for all outgoing HTTP requests
   * Strips headers from responses for security compliance
   * @param {http_transform_args} args - HTTP transform arguments
   * @returns {http_request_result} Transformed HTTP response
   */
  @query([http_transform_args], http_request_result)
  httpTransform(args: http_transform_args): http_request_result {
    return {
      ...args.response,
      headers: []
    };
  }
}
