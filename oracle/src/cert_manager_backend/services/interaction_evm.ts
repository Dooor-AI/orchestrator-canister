import { update, text, ic, None, Record, query, int, serialize as serializeAzle } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { getAddressAkashFromEVM, getAddressEVM, getDerivationPathFromAddressEVM, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { chainRPC, contractAddress, dplABI } from './constants';
import * as YAML from 'yaml';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { Transaction } from 'ethers';
import { parse, serialize } from "@ethersproject/transactions";
import { canisterKeyEcdsa } from '../../backend/services/constants';

export const updateContractEVMEnd = update([], text, async () => {
    return await updateContractEVM(1, '0x');
    return ''
});
export const getCanisterAddressEVMEnd = update([text], text, async (mss: string) => {
    await getCanisterAddressEVM(mss);
    return ''
});

//token id from the smart-contract deployment
export async function updateContractEVM(tokenId: number, akashHash: string) {
    console.log('comecei new deployment')
    const evmAddress = "0x4d1b1137306e43449cdfe61434d03df36259Bc80"
    // const icpEVMAddress = getAddressEVM()
    const provider = new ethers.JsonRpcProvider(`https://opt-sepolia.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR`);

    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
      provider,
    );
    console.log('get transaction')

    const privateKey = 'a7ec59c41ec3608dece33851a7d805bf22cd33da3e22e438bfe033349eb04011'; // Your private key

    const functionSignature = 'createDeployment(string, address)';
    // const input1 = BigInt(tokenId);
    // const input2 = akashHash;
    const input1 = 'newtest';
    const input2 = '0xfACF2850792b5e32a0497CfeD8667649B9f5ec97';
    const data = contract.interface.encodeFunctionData(functionSignature, [input1, input2]);

    // const feeData = await provider.getFeeData();
    const gasPrice = BigInt(100)
    
    // const nonce = await provider.getTransactionCount(wallet.address);
    const nonce = 0
    console.log('here new test nonce')
    console.log(nonce)
    // Define the transaction parameters
    const to = contractAddress; 
    const value = ethers.parseEther('0.0'); 

    // let chainIdNet = await provider.getNetwork()
    console.log('estimating gas')

    // const estimatedGas = await contract.createDeployment.estimateGas(input1, input2);
    const gasLimit = BigInt(10) * BigInt(110) / BigInt(100); // Aumenta o gasLimit em 10%
    console.log('passou tx')

    const tx = {
        to,
        value,
        gasPrice,
        chainId: BigInt(1115),
        gasLimit: gasLimit, // The maximum gas limit for a simple transfer
        data, // The data field contains the encoded function call
        nonce: 0, // The nonce for the transaction
      };
      console.log('veio pro here')

    console.log(tx)
    console.log('prox')

    // const signedTx = await wallet.signTransaction(tx);
    // console.log(signedTx) // 0x01f8ed83aa37dc80830f43918304b82e94de52ae36d88fab95a26568c2bcfdaf7d5642a90e80b8847d3ecac00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000facf2850792b5e32a0497cfed8667649b9f5ec9700000000000000000000000000000000000000000000000000000000000000076e65777465737400000000000000000000000000000000000000000000000000c001a0edbb16495c62d223e4d16df50fd302a8cd22f7941bca9b75f3af5d53044efaa9a07b3e486286ebc514969733fff0b3eff3146ec566d237cbfe85e074e45cbf5c61
    console.log('virei ret')
    // console.log(signedTx)
    console.log('pergunta')

    const txHere = Transaction.from(tx).unsignedHash
    const txHere2 = Transaction.from(tx).unsignedSerialized
    const txHere3 = Transaction.from(tx)
    console.log(txHere2)
    console.log('poximio')
    // const totalTx = Transaction.from(tx)
    const txHash = ethers.keccak256(txHere2);
    // const final2 = ethers.toUtf8Bytes(txHash);
    const final = ethers.getBytes(txHash)
    // const encodedData = new TextEncoder().encode(txHash);
    // const finalV =  new Uint8Array(encodedData);


    console.log('signing')
    console.log(final)
    const encoder = new TextEncoder();
    const string = "Hello, World!";

    // Converter a string para Uint8Array
    const uint8Array = encoder.encode(string);
    const hashedEthAddress2 = crypto.createHash('sha256').update('0x99A16c47fA733c5bc62d6213DeA3D76b65b47364').digest();
    const hashedEthAddressArray2 = new Uint8Array(hashedEthAddress2);

    // Usa o hash do endereço Ethereum como parte do caminho de derivação
    const derivationPath2 = [hashedEthAddressArray2];
    const signatureResult = await ic.call(
    managementCanister.sign_with_ecdsa,
    {
        args: [
            {
                message_hash: final,
                derivation_path: derivationPath2,
                key_id: {
                    curve: { secp256k1: null },
                    name: 'key_1'
                }
            }
        ],
        cycles: 25_000_000_000n
    }
    );
    const ff = ethers.hexlify(signatureResult.signature)
    console.log('signature:')
    console.log(ff)
    console.log('aqui')
    console.log(uint8Array)
    console.log('next')
    // const txHere3 = Transaction.from(ff).serialized
    // console.log(txHere3)
    // return ''
    // const ne = ethers.encodeBase58(signatureResult.signature)
    console.log('sending tx !!!!')
    console.log('assinatura')
    console.log(ff)
    console.log('next single assinatura e') //0x55fc92dF18923Ac2522c5906D217186824942B33 - 0x049c332598acaacdf624ae2b00d63ac90a3164763ac7b5d714c804622563e63a48dabb0683e927246db71f79c71af66a78dfa48a8b373cb52b0b0285bb304b75f0
    // console.log(Transaction.from('0x01f8ed83aa37dc80830f43928304b82e94de52ae36d88fab95a26568c2bcfdaf7d5642a90e80b8847d3ecac00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000facf2850792b5e32a0497cfed8667649b9f5ec9700000000000000000000000000000000000000000000000000000000000000076e65777465737400000000000000000000000000000000000000000000000000c080a0fd677ceeeae2cb82d0d7a1d4bb7b500647df8d15ddf14a39b744f78f6a3eb29ba00891ea0be2b998eca6ba5814cc041d9d7756a768d2b42662f3d1b750d8369386').fromPublicKey)
    // console.log(Transaction.from('0x01f8ed83aa37dc80830f43928304b82e94de52ae36d88fab95a26568c2bcfdaf7d5642a90e80b8847d3ecac00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000facf2850792b5e32a0497cfed8667649b9f5ec9700000000000000000000000000000000000000000000000000000000000000076e65777465737400000000000000000000000000000000000000000000000000c080a0fd677ceeeae2cb82d0d7a1d4bb7b500647df8d15ddf14a39b744f78f6a3eb29ba00891ea0be2b998eca6ba5814cc041d9d7756a768d2b42662f3d1b750d8369386').from)
    const txObject = parse(txHere2);
    console.log('now')
    const here = ethers.Signature.from(ff).serialized
    const here2 = ethers.Signature.from(ff)
    const broadcast = serialize(txObject, here)
    const broadcast2 = serialize(txObject, ff)
    const broadcast3 = serialize(txObject, here2)
    console.log('haha')
    // console.log(here.v)
    // console.log(here.r)
    // console.log(here.s)
    console.log(Transaction.from(broadcast).fromPublicKey) // 0x04277df14cfd4051cb1e92077749401cc124e0690f9fefb25ee4ff795d4697c7e9fbed77fcd669df65a8408828c92a7e41424dbc7b131f0e86fe8aaf90f21993b8
    console.log(Transaction.from(broadcast).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
    console.log(Transaction.from(broadcast2).fromPublicKey) // 0x04277df14cfd4051cb1e92077749401cc124e0690f9fefb25ee4ff795d4697c7e9fbed77fcd669df65a8408828c92a7e41424dbc7b131f0e86fe8aaf90f21993b8
    console.log(Transaction.from(broadcast2).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
    console.log(Transaction.from(broadcast3).fromPublicKey) // 0x04277df14cfd4051cb1e92077749401cc124e0690f9fefb25ee4ff795d4697c7e9fbed77fcd669df65a8408828c92a7e41424dbc7b131f0e86fe8aaf90f21993b8
    console.log(Transaction.from(broadcast3).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
    console.log(broadcast)
    return `${Transaction.from(broadcast).from}-${Transaction.from(broadcast).fromPublicKey}`

    // console.log(ne)
    const hashedEthAddress = crypto.createHash('sha256').update('0x99A16c47fA733c5bc62d6213DeA3D76b65b47364').digest();
    const hashedEthAddressArray = new Uint8Array(hashedEthAddress);

    // Usa o hash do endereço Ethereum como parte do caminho de derivação
    const derivationPath = [hashedEthAddressArray];

    const publicKeyResult = await ic.call(
        managementCanister.ecdsa_public_key,
        {
            args: [
                {
                    canister_id: None,
                    derivation_path: derivationPath,
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa
                    }
                }
            ]
        }
    );
    console.log('A PUK BEY')
    const publicKey = publicKeyResult.public_key; // This will be a Uint8Array
    console.log('Public Key:', Buffer.from(publicKey).toString('hex'));

    const publicKeyResponse = await fetch(`icp://aaaaa-aa/sign_with_ecdsa`, {
        body: serializeAzle({
            args: [
                {
                    message_hash: final,
                    derivation_path: derivationPath,
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa
                    }
                }
            ],
            cycles: 10_000_000_000n
        })
    });
    console.log(publicKeyResponse)
    const res = (await publicKeyResponse.json()).signature;
    console.log('THE RES HERE')
    const ff2 = ethers.hexlify(res)

    const here0 = ethers.Signature.from(ff2).serialized
    const broadcast0 = serialize(txObject, here0)
    console.log(Transaction.from(broadcast0).fromPublicKey)
    console.log(Transaction.from(broadcast0).from)

    // const txHashA = await provider.broadcastTransaction('0x01f8ed83aa37dc80830f43a28304b82e94de52ae36d88fab95a26568c2bcfdaf7d5642a90e80b8847d3ecac00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000facf2850792b5e32a0497cfed8667649b9f5ec9700000000000000000000000000000000000000000000000000000000000000076e65777465737400000000000000000000000000000000000000000000000000c080a0d821cf794c96474fac18bc5a52732d763340cfda26f4afd392930e9be0026370a07c94d191852816f4ef59eeb2173953b371612a2df72724e6c5465e5aaa06e882');
    // console.log(txHashA)
};

export async function updateContractNewEVM(tokenId: number, akashHash: string) {
    console.log('comecei new contract interaction')
    const evmAddress = "0x4d1b1137306e43449cdfe61434d03df36259Bc80"
    // const icpEVMAddress = getAddressEVM()
    const provider = new ethers.JsonRpcProvider(`https://opt-sepolia.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR`);

    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
      provider,
    );
    console.log('get transaction')

    const functionSignature = 'createDeployment(string, address)';

    const input1 = 'newtest';
    const input2 = '0xfACF2850792b5e32a0497CfeD8667649B9f5ec97';
    const data = contract.interface.encodeFunctionData(functionSignature, [input1, input2]);

    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    
    // const nonce = await provider.getTransactionCount(wallet.address);
    const nonce = await provider.getTransactionCount('0x99A16c47fA733c5bc62d6213DeA3D76b65b47364');
    console.log('here new test nonce')
    console.log(nonce)
    // Define the transaction parameters
    const to = contractAddress; 
    const value = ethers.parseEther('0.0'); 

    let chainIdNet = await provider.getNetwork()
    console.log('estimating gas')

    const estimatedGas = await contract.createDeployment.estimateGas(input1, input2);
    const gasLimit = estimatedGas * BigInt(110) / BigInt(100); // Aumenta o gasLimit em 10%

    const tx = {
        to,
        value,
        gasPrice,
        chainId: chainIdNet.chainId,
        gasLimit: gasLimit, // The maximum gas limit for a simple transfer
        data, // The data field contains the encoded function call
        nonce: 0, // The nonce for the transaction
      };

    const txHere = Transaction.from(tx).unsignedSerialized

    const txHash = ethers.keccak256(txHere);
    const final = ethers.getBytes(txHash)

    // Converter a string para Uint8Array
    const hashedEthAddress2 = crypto.createHash('sha256').update('0x99A16c47fA733c5bc62d6213DeA3D76b65b47364').digest();
    const hashedEthAddressArray2 = new Uint8Array(hashedEthAddress2);

    // Usa o hash do endereço Ethereum como parte do caminho de derivação
    const derivationPath2 = [hashedEthAddressArray2];
    const signatureResult = await ic.call(
    managementCanister.sign_with_ecdsa,
    {
        args: [
            {
                message_hash: final,
                derivation_path: derivationPath2,
                key_id: {
                    curve: { secp256k1: null },
                    name: canisterKeyEcdsa
                }
            }
        ],
        cycles: 10_000_000_000n
    }
    );
    const ff = ethers.hexlify(signatureResult.signature)
    console.log('signature:')
    console.log(ff)
    console.log('next')

    const txObject = parse(txHere);
    const here = ethers.Signature.from(ff).serialized
    const broadcast = serialize(txObject, here)

    console.log(Transaction.from(broadcast).fromPublicKey) // 0x04277df14cfd4051cb1e92077749401cc124e0690f9fefb25ee4ff795d4697c7e9fbed77fcd669df65a8408828c92a7e41424dbc7b131f0e86fe8aaf90f21993b8
    console.log(Transaction.from(broadcast).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9    

    const txHashA = await provider.broadcastTransaction(broadcast);
};


export async function getCanisterAddressEVM(mss: string) {
    const messageHash = ethers.hashMessage(mss);
    const txHash2 = ethers.keccak256(messageHash);
    const final2 = ethers.getBytes(txHash2)
    console.log(final2)
    console.log('signing')
    const caller = ic.caller().toUint8Array();
    console.log(caller)
    console.log('next')
    const signatureResult = await ic.call(
    managementCanister.sign_with_ecdsa,
    {
        args: [
            {
                message_hash: final2,
                derivation_path: [caller],
                key_id: {
                    curve: { secp256k1: null },
                    name: canisterKeyEcdsa
                }
            }
        ],
        cycles: 10_000_000_000n
    }
    );
    console.log(signatureResult.signature)
    console.log('foi')
    const ff = ethers.hexlify(signatureResult.signature)
    console.log(ff)
    console.log('aqui')
    const recoveredAddress = ethers.recoverAddress(messageHash, ff);
    console.log(recoveredAddress) // 0xDa5BE659d6647951511E95FBa607C4B382Bae96C
    return '';
};


