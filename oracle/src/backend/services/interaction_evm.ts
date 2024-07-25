import { update, text, ic, None, Record, query, int } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { getAddressAkashFromEVM, getAddressEVM, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { createCertificateAkash } from './certificate';
import { createCertificateKeys } from './akash_certificate_manager';
import { Deployment, akashCertGlobal, db, getAkashAddress } from './user';
import { chainRPC, contractAddress, dplABI } from './constants';
import { createDeployment, createLease } from './deployment_akash_3';
import { getBids, getProviderUri, sendManifest, sendManifestTest } from './external_https';
import { yamlObj } from './deployment_akash';
import * as YAML from 'yaml';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import { wait } from './timer';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { Transaction } from 'ethers';

export const updateContractEVMEnd = update([], text, async () => {
    await updateContractEVM(1, '0x');
    return ''
});
//token id from the smart-contract deployment
export async function updateContractEVM(tokenId: number, akashHash: string) {
    console.log('comecei new deployment')
    const icpEVMAddress = getAddressEVM()
    const provider = new ethers.JsonRpcProvider(`https://opt-sepolia.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR`);

    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
      provider,
    );
    console.log('get transaction')

    const privateKey = 'a7ec59c41ec3608dece33851a7d805bf22cd33da3e22e438bfe033349eb04011'; // Your private key
    const wallet = new ethers.Wallet(privateKey, provider);

    const functionSignature = 'createDeployment(string, address)';
    // const input1 = BigInt(tokenId);
    // const input2 = akashHash;
    const input1 = 'newtest';
    const input2 = '0xfACF2850792b5e32a0497CfeD8667649B9f5ec97';
    const data = contract.interface.encodeFunctionData(functionSignature, [input1, input2]);

    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log('here new test')
    // Define the transaction parameters
    const to = contractAddress; 
    const value = ethers.parseEther('0.0'); 

    let chainIdNet = await provider.getNetwork()
    console.log('estimating gas')

    const estimatedGas = await contract.createDeployment.estimateGas(input1, input2);
    const gasLimit = estimatedGas * BigInt(110) / BigInt(100); // Aumenta o gasLimit em 10%
    console.log('passou tx')

    const tx = {
        to,
        value,
        gasPrice,
        chainId: chainIdNet.chainId,
        gasLimit: gasLimit, // The maximum gas limit for a simple transfer
        data, // The data field contains the encoded function call
        nonce // The nonce for the transaction
      };
      console.log('veio pro here')

    console.log(tx)

    const signedTx = await wallet.signTransaction(tx);
    console.log('virei ret')
    console.log(signedTx)
    console.log('pergunta')

    const txHere = Transaction.from(tx).unsignedSerialized
    const txHere2 = Transaction.from(tx).serialized
    console.log(txHere)
    console.log('proximo')
    console.log(txHere2)

    const txHash = ethers.keccak256(txHere);
    const final = ethers.getBytes(txHash)
    // const encodedData = new TextEncoder().encode(txHash);
    // const finalV =  new Uint8Array(encodedData);


    console.log('signing')
    const caller = ic.caller().toUint8Array();
    const signatureResult = await ic.call(
    managementCanister.sign_with_ecdsa,
    {
        args: [
            {
                message_hash: final,
                derivation_path: [caller],
                key_id: {
                    curve: { secp256k1: null },
                    name: 'dfx_test_key'
                }
            }
        ],
        cycles: 10_000_000_000n
    }
    );
    console.log(signatureResult.signature)
    const ff = ethers.hexlify(signatureResult.signature)
    const ne = ethers.encodeBase58(signatureResult.signature)
    console.log('sending tx !!!!')
    console.log('assinatura')
    console.log(ff)
    console.log('next singe')
    console.log(ne)
    const txHashA = await provider.broadcastTransaction(ff);
    console.log(txHashA)
};

