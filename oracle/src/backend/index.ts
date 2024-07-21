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
import { getAkashAddress } from './services/get_address_akash';
import { getDeploymentManifestInfo } from './services/manifest';
import { createAndStoreCertificateKeys } from './services/new-test';
import { newDeployment } from './services/deployment_workflow';
import { createUser, getNewAkashCertificate, getUsers } from './services/user';
import { newCreateCertificateAkash } from './services/certificate';
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
    getUsers,
    transferAkashTokens,
    getDeploymentManifestInfo,
    getNewAkashCertificate,
    newCreateCertificateAkash,
    newDeployment,
    sendManifestAkash,
    transformResponse: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});
