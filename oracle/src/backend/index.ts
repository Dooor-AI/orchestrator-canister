import { blob, Canister, text, ic, None, Record, update, serialize, query} from 'azle';
import { Secp256k1PublicKey } from '@mysten/sui/keypairs/secp256k1';
import { managementCanister,     HttpResponse,
    HttpTransformArgs, } from 'azle/canisters/management';
import {
    DirectSecp256k1HdWallet,
    DirectSecp256k1Wallet,
    OfflineSigner,
    Registry,
  } from '@cosmjs/proto-signing';
  import { Bip39, Random, stringToPath } from '@cosmjs/crypto';
import { createAkashDeployment } from './services/deployment_akash';  // Atualize o caminho conforme necessário
import { closeDeploymentAkash, createDeploymentAkash, createLeaseAkash, sendManifestAkash, transferAkashTokens } from './services/deployment_akash_2';
import { getAkashAddress, getCanisterAkashAddress, getEcdsaPublicKeyBase64End, getEthereumAddress } from './services/get_address_akash';
import { getDeploymentManifestInfo } from './services/manifest';
import { createAndStoreCertificateKeys } from './services/new-test';
// import { closeDeployment, fundDeploymentTest, manageFundDeployment, newDeployment } from './services/deployment_workflow';
import { closeDeployment, closeDeploymentProvisorio, fundDeploymentTest, getAccountInfo, getCoreDaoAkashPriceEnd, getEthAkashPriceEnd, getHttpTest, manageFundDeployment, newDeployment, testEvmInteraction, transferAkashTokensProvisorioEnd } from './services/toaa-deployment-workflow';

import { createUser, getAkashHeight, getBidsA, getBidsEnd, getDeployment, getNewAkashCertificate, getPubKey, getUsers, returnDeployment, sendManifestEnd, userExist } from './services/user';
import { newCreateCertificateAkash } from './services/certificate';
import { closeDeploymentAkashFromAddress } from './services/deployment_akash_3';
import { getCanisterAddressEVMEnd, returnCanisterEVMAddress, updateContractEVMEnd } from './services/interaction_evm';
import { toaaCreateCertificate, toaaInfo, toaaInitiate } from './services/toaa';
const Signature = Record({
    signature: blob
});

export default Canister({
    sendManifestEnd,
    getBidsEnd,
    getAccountInfo,
    getHttpTest,
    getCoreDaoAkashPriceEnd,
    getEthAkashPriceEnd,
    getPubKey,
    getAkashHeight,
    toaaInfo,
    toaaInitiate,
    toaaCreateCertificate,
    getAkashAddress,
    createDeploymentAkash,
    getDeployment,
    createLeaseAkash,
    createUser,
    createAndStoreCertificateKeys,
    closeDeployment,
    closeDeploymentAkash,
    closeDeploymentAkashFromAddress,
    getBidsA,
    getUsers,
    updateContractEVMEnd,
    getEthereumAddress,
    transferAkashTokens,
    transferAkashTokensProvisorioEnd,
    getDeploymentManifestInfo,
    getNewAkashCertificate,
    newCreateCertificateAkash,
    getEcdsaPublicKeyBase64End,
    manageFundDeployment,
    newDeployment,
    closeDeploymentProvisorio,
    getCanisterAddressEVMEnd,
    sendManifestAkash,
    getCanisterAkashAddress,
    fundDeploymentTest,
    returnDeployment,
    returnCanisterEVMAddress,
    userExist,
    testEvmInteraction,
    transformResponse: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});
