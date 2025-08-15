import {
    call,
    canisterSelf,
    Principal
} from 'azle';
import {
    http_request_args,
    http_request_result
} from 'azle/canisters/management/idl';
import { URLS, HTTP_SETTINGS, TEE_CONFIG } from './config';
import { TEEAttestationValidator } from './tee-validation/tee-validator';
import { TEEValidationReport } from './tee-validation/types';
import { TEEInfrastructureReport } from './types';

/**
 * Service class for Trusted Execution Environment operations
 * Handles complete TEE infrastructure validation and security assessments
 * Provides comprehensive validation using both attestation and security data
 */
export class TEEService {
    private validator: TEEAttestationValidator;

    constructor() {
        this.validator = new TEEAttestationValidator({
            projectId: TEE_CONFIG.PROJECT_ID,
            zone: TEE_CONFIG.ZONE,
            instanceName: TEE_CONFIG.INSTANCE_NAME
        });
    }

    /**
     * Executes HTTP request to TEE endpoints using ICP HTTP outcalls
     * @param {string} url - Target URL for the TEE request
     * @param {'get' | 'post'} method - HTTP method to use
     * @returns {Promise<string>} Raw response from TEE endpoint
     */
    private async executeTeeRequest(
        url: string,
        method: 'get' | 'post' = 'get'
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
                        headers: [
                            { name: 'Content-Type', value: 'application/json' }
                        ],
                        body: [],
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
     * Retrieves TEE attestation data for validation
     * Connects to TEE and extracts attestation JWT from response
     * @returns {Promise<string>} Raw attestation response data from TEE
     */
    private async retrieveTeeAttestation(): Promise<string> {
        try {
            return await this.executeTeeRequest(URLS.TEE_CONNECT, 'post');
        } catch (error) {
            throw new Error(`Failed to retrieve TEE attestation: ${error}`);
        }
    }

    /**
     * Retrieves TEE security configuration for validation
     * @returns {Promise<string>} Security configuration data from TEE
     */
    private async retrieveSecurityConfiguration(): Promise<string> {
        try {
            return await this.executeTeeRequest(URLS.TEE_SECURITY, 'get');
        } catch (error) {
            throw new Error(`Failed to retrieve security configuration: ${error}`);
        }
    }

    /**
     * Validates complete TEE infrastructure and returns comprehensive security report
     * This method performs end-to-end validation of the entire TEE system
     * using both attestation verification and security configuration validation
     * @returns {Promise<string>} JSON string containing complete validation report
     */
    async validateCompleteInfrastructure(): Promise<string> {
        try {

            const attestationData = await this.retrieveTeeAttestation();
            const securityConfigData = await this.retrieveSecurityConfiguration();

            const jwtAttestation = JSON.parse(attestationData).attestation_jwt;
            const securityConfig = JSON.parse(securityConfigData);

            // Perform comprehensive validation using the new validator logic
            const validationReport = await this.validator
                .validateCompleteTEE(jwtAttestation, securityConfig);

            return JSON.stringify(validationReport, null, 2);

        } catch (error) {
            const errorReport: TEEInfrastructureReport = {
                timestamp: new Date().toISOString(),
                validation_status: 'ERROR',
                error_message: `TEE validation failed: ${error}`,
                infrastructure_summary: {
                    trusted: false,
                    hardware: 'Unknown',
                    project: TEE_CONFIG.PROJECT_ID,
                    instance: TEE_CONFIG.INSTANCE_NAME,
                    zone: TEE_CONFIG.ZONE
                }
            };

            return JSON.stringify(errorReport, null, 2);
        }
    }

    /**
     * Validates TEE authenticity using only attestation data
     * @param {string} attestationData - Raw attestation data from TEE
     * @returns {Promise<boolean>} True if TEE attestation is valid
     */
    async validateAttestationOnly(attestationData: string): Promise<boolean> {
        try {
            return await this.validator.isValidTEE(attestationData);
        } catch {
            return false;
        }
    }

    /**
     * Gets detailed validation report for attestation data
     * @param {string} attestationData - Raw attestation data from TEE
     * @returns {Promise<TEEValidationReport>} Detailed validation report
     */
    async getAttestationReport(attestationData: string): Promise<TEEValidationReport> {
        try {
            const extractedJWT = (this.validator as any).extractAttestationJWT(attestationData);
            return await this.validator.getValidationReport(extractedJWT);
        } catch (error) {
            return {
                valid: false,
                summary: {
                    trusted: false,
                    hardware: 'Unknown',
                    project: TEE_CONFIG.PROJECT_ID,
                    instance: TEE_CONFIG.INSTANCE_NAME,
                    zone: TEE_CONFIG.ZONE
                },
                errors: [`Attestation validation failed: ${error}`]
            };
        }
    }

    /**
     * Gets TEE auditor health status (future feature)
     * @returns {Promise<string>} Health status information
     */
    async getAuditorHealth(): Promise<string> {
        try {
            // This will be implemented when auditor client supports ICP HTTP outcalls
            return JSON.stringify({
                status: 'not_implemented',
                message: 'TEE Auditor health check not yet available in ICP environment',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            return JSON.stringify({
                status: 'error',
                message: `Auditor health check failed: ${error}`,
                timestamp: new Date().toISOString()
            });
        }
    }
}

// Legacy function exports for backward compatibility (deprecated)
export async function getTeeConnect(): Promise<string> {
    const service = new TEEService();
    return await service['retrieveTeeAttestation']();
}

export async function getTeeSecurity(): Promise<string> {
    const service = new TEEService();
    return await service['retrieveSecurityConfiguration']();
}

export async function validateTee(): Promise<any> {
    const service = new TEEService();
    const result = await service.validateCompleteInfrastructure();
    return JSON.parse(result);
}
    
            