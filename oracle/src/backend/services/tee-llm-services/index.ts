import {
    text, update, query
} from 'azle';
import {
    http_transform_args,
    http_request_result
} from 'azle/canisters/management/idl';
import { TEEService } from './teeEndpoints';
import { LLMService } from './llmEndpoints';

// ---------- service instances --------------------------------------------------
const teeService = new TEEService();
const llmService = new LLMService();

// ---------- LLM endpoints -----------------------------------------------------

/**
 * Retrieves all available LLM models.
 * @returns {Promise<string>} JSON string containing list of all available models.
 */
export const getAllModels = update([], text, async (): Promise<string> => {
    return await llmService.getAllModels();
});

/**
 * Retrieves specific LLM model information by ID.
 * @param {string} modelId - Unique identifier of the model to retrieve.
 * @returns {Promise<string>} JSON string containing model information.
 */
export const getModelById = update([text], text, async (modelId: string): Promise<string> => {
    return await llmService.getModelById(modelId);
});

/**
 * Sets a specific model as the default for the system.
 * @param {string} modelId - Unique identifier of the model to set as default.
 * @returns {Promise<string>} JSON string containing operation result.
 */
export const setDefaultModel = update([text], text, async (modelId: string): Promise<string> => {
    return await llmService.setDefaultModel(modelId);
});

// ---------- TEE validation endpoints ------------------------------------------

/**
 * Validates the complete TEE infrastructure and returns comprehensive security report.
 * This endpoint performs complete validation of the Trusted Execution Environment.
 * @returns {Promise<string>} JSON string containing complete TEE validation report.
 */
export const validateTeeInfrastructure = update([], text, async (): Promise<string> => {
    return await teeService.validateCompleteInfrastructure();
});

// ---------- HTTP transform (Required for all HTTP outcalls) -------------------

/**
 * HTTP response transformer required by Azle for all outgoing HTTP requests.
 * Strips headers from responses for security compliance.
 * @param {http_transform_args} args - HTTP transform arguments.
 * @returns {http_request_result} Transformed HTTP response.
 */
export const httpTransform = query([http_transform_args], http_request_result, (args: http_transform_args): http_request_result => {
    return {
        ...args.response,
        headers: []
    };
});
