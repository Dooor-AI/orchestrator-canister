import { blob, Canister, text, ic, None, Record, update, serialize } from 'azle';
import { Secp256k1PublicKey } from '@mysten/sui/keypairs/secp256k1';
import { managementCanister } from 'azle/canisters/management';
import {
    DirectSecp256k1HdWallet,
    DirectSecp256k1Wallet,
    OfflineSigner,
    Registry,
  } from '@cosmjs/proto-signing';
  import { Bip39, Random, stringToPath } from '@cosmjs/crypto';
import { createAkashDeployment } from './services/deployment_akash';  // Atualize o caminho conforme necessário
import { closeDeploymentAkash, createCertificateAkash, createDeploymentAkash, createLeaseAkash } from './services/deployment_akash_2';
import { getAkashAddress } from './services/get_address_akash';
const Signature = Record({
    signature: blob
});

export default Canister({
    getAkashAddress,
    createDeploymentAkash,
    createLeaseAkash,
    createCertificateAkash,
    closeDeploymentAkash,
});
