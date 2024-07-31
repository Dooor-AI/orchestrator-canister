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
import { getAkashAddress, getEcdsaPublicKeyBase64End, getEthereumAddress } from './services/get_address_akash';
import { getDeploymentManifestInfo } from './services/manifest';
import { createAndStoreCertificateKeys } from './services/new-test';
import { newDeployment } from './services/deployment_workflow';
import { createUser, getBidsA, getNewAkashCertificate, getUsers } from './services/user';
import { newCreateCertificateAkash } from './services/certificate';
import { closeDeploymentAkashFromAddress } from './services/deployment_akash_3';
import { getCanisterAddressEVMEnd, returnCanisterEVMAddress, updateContractEVMEnd } from './services/interaction_evm';
const Signature = Record({
    signature: blob
});

export default Canister({
    getAkashAddress,
    createDeploymentAkash,
    createLeaseAkash,
    createUser,
    createAndStoreCertificateKeys,
    closeDeploymentAkash,
    closeDeploymentAkashFromAddress,
    getBidsA,
    getUsers,
    updateContractEVMEnd,
    getEthereumAddress,
    transferAkashTokens,
    getDeploymentManifestInfo,
    getNewAkashCertificate,
    newCreateCertificateAkash,
    getEcdsaPublicKeyBase64End,
    newDeployment,
    getCanisterAddressEVMEnd,
    sendManifestAkash,
    returnCanisterEVMAddress,
    transformResponse: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});
