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
import { createAndStoreCertificateKeys } from './services/new-test';
import { updateContractEVMEnd } from './services/interaction_evm';
const Signature = Record({
    signature: blob
});

export default Canister({
    createAndStoreCertificateKeys,
    updateContractEVMEnd,
});
