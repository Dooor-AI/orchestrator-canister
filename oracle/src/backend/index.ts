import { blob, Canister, text, ic, None, Record, update, serialize, query} from 'azle';
import { Secp256k1PublicKey } from '@mysten/sui/keypairs/secp256k1';
import { managementCanister,     HttpResponse,
    HttpTransformArgs, } from 'azle/canisters/management';
import { createAkashDeployment } from './services/deployment_akash';  // Atualize o caminho conforme necessário
import { closeDeploymentAkash, createDeploymentAkash, createLeaseAkash, sendManifestAkash, transferAkashTokens } from './services/deployment_akash_2';
import { getAkashAddress, getCanisterAkashAddress, getEcdsaPublicKeyBase64End, getEthereumAddress } from './services/get_address_akash';
import { getDeploymentManifestInfo } from './services/manifest';
import { createAndStoreCertificateKeys } from './services/new-test';
// import { closeDeployment, fundDeploymentTest, manageFundDeployment, newDeployment } from './services/deployment_workflow';
import { closeDeployment, closeDeploymentProvisorio, fundDeploymentTest, getAccountInfo, getCoreDaoAkashPriceEnd, getEthAkashPriceEnd, getHttpTest, manageFundDeployment, newDeployment, testEvmInteraction, transferAkashTokensProvisorioEnd, validateDeposit } from './services/toaa-deployment-workflow';

import { createUser, getAkashHeight, getBidsEnd, getDeployment, getNewAkashCertificate, getPubKey, returnDeployment, sendManifestEnd, userExist } from './services/user';
import { newCreateCertificateAkash } from './services/certificate';
import { closeDeploymentAkashFromAddress } from './services/deployment_akash_3';
import { getCanisterAddressEVMEnd, returnCanisterEVMAddress, updateContractEVMEnd } from './services/interaction_evm';
import { toaaCreateCertificate, toaaInfo, toaaInitiate } from './services/toaa';
import { fetchEcdsaPk, issueJwt, selfTest, getCompressedPk  } from './services/jwt_ecdsa';
import { validateTeeInfrastructure, httpTransform, getAllModels, getModelById, setDefaultModel } from './services/tee-llm-services';

const Signature = Record({
    signature: blob
});

export default Canister({
    // validateDeposit,
    // sendManifestEnd,
    // getBidsEnd,
    // getAccountInfo,
    // getHttpTest,
    // getCoreDaoAkashPriceEnd,
    // getEthAkashPriceEnd,
    // getPubKey,
    // getAkashHeight,
    // toaaInfo,
    // toaaInitiate,
    // toaaCreateCertificate,
    // getAkashAddress,
    // createDeploymentAkash,
    // getDeployment,
    // createLeaseAkash,
    // createUser,
    // createAndStoreCertificateKeys,
    // closeDeployment,
    // closeDeploymentAkash,
    // closeDeploymentAkashFromAddress,
    // updateContractEVMEnd,
    // getEthereumAddress,
    // transferAkashTokens,
    // transferAkashTokensProvisorioEnd,
    // getDeploymentManifestInfo,
    // getNewAkashCertificate,
    // newCreateCertificateAkash,
    // getEcdsaPublicKeyBase64End,
    // manageFundDeployment,
    // newDeployment,
    // closeDeploymentProvisorio,
    // getCanisterAddressEVMEnd,
    // sendManifestAkash,
    // getCanisterAkashAddress,
    // fundDeploymentTest,
    // returnDeployment,
    // returnCanisterEVMAddress,
    // userExist,
    // testEvmInteraction,
    // transformResponse: query([HttpTransformArgs], HttpResponse, (args: HttpTransformArgs) => {
    //     return {
    //         ...args.response,
    //         headers: []
    //     };
    // }),
    selfTest,
    fetchEcdsaPk,
    issueJwt,
    getCompressedPk,
    //validateTeeInfrastructure,
    //httpTransform,
    //getAllModels,
    //getModelById,
    //setDefaultModel,
});
