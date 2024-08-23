import { update, text, ic, None, Record, query, int, serialize as serializeAzle } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { getAddressAkashFromEVM, getAddressEVM, getDerivationPathFromAddressEVM, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { canisterKeyEcdsa, chainRPC, contractAddress, dplABI, providerUrl } from './constants';
import * as YAML from 'yaml';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { Transaction } from 'ethers';
import { parse, serialize } from "@ethersproject/transactions";
import { computePublicKey, recoverPublicKey } from "@ethersproject/signing-key";
import { callRpc } from './evm_rpc_interaction';
import { wait } from './timer';

export const updateContractEVMEnd = update([], text, async () => {
    await updateContractNewEVM(1, '0x');
    return ''
});
export const returnCanisterEVMAddress = update([], text, async () => {
    const res = await getCanisterEVMAddress();
    return res
});
export const getCanisterAddressEVMEnd = update([text], text, async (mss: string) => {
    await getCanisterAddressEVM(mss);
    return ''
});

export let canisterEVMAddress = ''

export async function getCanisterEVMAddress() {
    if (canisterEVMAddress?.length > 0) {
        return canisterEVMAddress
    } else {
        const evmAddress = "0x4d1b1137306e43449cdfe61434d03df36259Bc80"
        const provider = new ethers.JsonRpcProvider(`https://opt-sepolia.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR`);
        const contract = new ethers.Contract(
          contractAddress,
          dplABI,
          provider,
        );
        console.log('get transaction')
        const functionSignature = 'createDeployment(string, address)';
        // const input1 = BigInt(tokenId);
        // const input2 = akashHash;
        const input1 = 'newtest';
        const input2 = '0xfACF2850792b5e32a0497CfeD8667649B9f5ec97';
        const data = contract.interface.encodeFunctionData(functionSignature, [input1, input2]);
    
        const tx = {
            to: evmAddress,
            value: BigInt(0),
            gasPrice: BigInt(0),
            chainId: BigInt(1),
            gasLimit: BigInt(0),
            data,
            nonce: 0,
          };
    
    
        const txHere = Transaction.from(tx).unsignedSerialized
        const txHash = ethers.keccak256(txHere);
        const final = ethers.getBytes(txHash)
    
        let addresses = []
        for (let i = 0; i < 3; i++) {
            const signatureResult = await ic.call(
                managementCanister.sign_with_ecdsa,
                {
                    args: [
                        {
                            message_hash: final,
                            derivation_path: [],
                            key_id: {
                                curve: { secp256k1: null },
                                name: canisterKeyEcdsa
                            }
                        }
                    ],
                    cycles: 25_000_000_000n
                }
            );
        
            const signature = signatureResult.signature;
            const r = signature.slice(0, 32);
            const s = signature.slice(32, 64);
            const rHex = ethers.hexlify(r)
            const sHex = ethers.hexlify(s)
        
            const txObject = parse(txHere);
        
            const here = ethers.Signature.from({
                v: 28,
                r: rHex,
                s: sHex,
            }).serialized
            const here2 = ethers.Signature.from({
                v: 27,
                r: rHex,
                s: sHex,
            }).serialized
        
            const broadcast = serialize(txObject, here)
            const broadcast2 = serialize(txObject, here2)
        
            console.log(Transaction.from(broadcast).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
            console.log(Transaction.from(broadcast2).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
            addresses.push(Transaction.from(broadcast).from)
            addresses.push(Transaction.from(broadcast2).from)
        }
        console.log('final addresses')
        console.log(addresses)
        const finals = encontrarMaisRepetido(addresses)
        canisterEVMAddress = finals
        return finals
    }
}

function encontrarMaisRepetido(arr: any[]) {
    const contagem: any = {}; // Objeto para armazenar a contagem de cada elemento
    let maisRepetido = arr[0], maxContagem = 0;
  
    for (const item of arr) {
      if (contagem[item]) {
        contagem[item]++; // Incrementa a contagem se o item já existe no objeto
      } else {
        contagem[item] = 1; // Inicializa a contagem para itens novos
      }
  
      // Verifica se este item tem mais repetições do que o atual mais repetido
      if (contagem[item] > maxContagem) {
        maisRepetido = item;
        maxContagem = contagem[item];
      }
    }
  
    return maisRepetido; // Retorna o item mais repetido
  }

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
    const wallet = new ethers.Wallet(privateKey, provider);

    const functionSignature = 'createDeployment(string, address)';
    // const input1 = BigInt(tokenId);
    // const input2 = akashHash;
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
    console.log('passou tx')

    const tx = {
        to,
        value,
        gasPrice,
        chainId: chainIdNet.chainId,
        gasLimit, // The maximum gas limit for a simple transfer
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
    const caller = await getDerivationPathFromAddressEVM(evmAddress)
    console.log(final)
    const encoder = new TextEncoder();
    const string = "Hello, World!";

    // Converter a string para Uint8Array
    const uint8Array = encoder.encode(string);
    const hashedEthAddress2 = crypto.createHash('sha256').update('0x99A16c47fA733c5bc62d6213DeA3D76b65b47364').digest();
    const hashedEthAddressArray2 = new Uint8Array(hashedEthAddress2);

    // Usa o hash do endereço Ethereum como parte do caminho de derivação
    const derivationPath2 = [hashedEthAddressArray2];

    const publicKeyResult = await ic.call(
        managementCanister.ecdsa_public_key,
        {
            args: [
                {
                    canister_id: None,
                    derivation_path: [],
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa
                    }
                }
            ]
        }
    );

    const publicKeyResult2 = await ic.call(
        managementCanister.ecdsa_public_key,
        {
            args: [
                {
                    canister_id: None,
                    derivation_path: [],
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa
                    }
                }
            ]
        }
    );

    const signatureResult = await ic.call(
    managementCanister.sign_with_ecdsa,
    {
        args: [
            {
                message_hash: final,
                derivation_path: [],
                key_id: {
                    curve: { secp256k1: null },
                    name: canisterKeyEcdsa
                }
            }
        ],
        cycles: 10_000_000_000n
    }
    );

    // const ff = ethers.hexlify(signatureResult.signature)
    const signature = signatureResult.signature;
    const r = signature.slice(0, 32);
    const s = signature.slice(32, 64);
    const rHex = ethers.hexlify(r)
    const sHex = ethers.hexlify(s)

    const txObject = parse(txHere2);
    console.log('---------------now---------------')
    const here = ethers.Signature.from({
        v: 28,
        r: rHex,
        s: sHex,
    }).serialized
    const here2 = ethers.Signature.from({
        v: 27,
        r: rHex,
        s: sHex,
    }).serialized
    const responseFirst = recoverPublicKey(final, here)
    const responseFirst2 = recoverPublicKey(final, here2)

    // Convert the public key from bytes to a verifying key

    // Convert the signature to the format required by ethers.js
    const sig = { r: rHex, s: sHex };
    console.log(rHex)
    console.log(sHex)
    const recoveredKey = recoverPublicKey(
        final,
        { ...sig, recoveryParam: 0 }
    );
    const recoveredKey2 = recoverPublicKey(
        final,
        { ...sig, recoveryParam: 1 }
    );
    console.log('recovered key params 0 e 1')
    console.log(recoveredKey)
    console.log(recoveredKey2)
    console.log(publicKeyResult2.public_key)
    console.log('next')
    const pbHash = ethers.keccak256(publicKeyResult.public_key);
    // const final2 = ethers.toUtf8Bytes(txHash);
    const pbFinal = ethers.getBytes(pbHash)
    const publicKey = computePublicKey(pbFinal, true); // 'true' para formato comprimido
    // console.log(publicKey)

    const broadcast = serialize(txObject, here)
    const broadcast2 = serialize(txObject, here2)

    console.log(Transaction.from(broadcast).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
    console.log(Transaction.from(broadcast).fromPublicKey) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9

    console.log(Transaction.from(broadcast2).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9
    console.log(Transaction.from(broadcast2).fromPublicKey) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9

    const txHashA = await provider.broadcastTransaction(broadcast);
    console.log(txHashA)
    // console.log(txHashA)
};

async function y_parity(txhash: any, signature: any, pubkey: any) {
    // Assumindo que txhash, signature e pubkey são strings hexadecimais
    const txhashBuffer = Buffer.from(txhash, 'hex'); // Converte txhash de string hexadecimal para buffer
    const signatureBuffer = Buffer.from(signature, 'hex'); // Converte signature de string hexadecimal para buffer
    const pubkeyBuffer = Buffer.from(pubkey, 'hex'); // Converte pubkey de string hexadecimal para buffer

    const r = signatureBuffer.slice(0, 32); // Primeiro 32 bytes de r
    const s = signatureBuffer.slice(32, 64); // Próximos 32 bytes de s

    // Calculate the message hash using SHA256
    const msgHash = crypto.createHash('sha256').update(txhashBuffer).digest();

    // Convert r and s to hexadecimal strings
    const rHex = '0x' + r.toString('hex');
    const sHex = '0x' + s.toString('hex');

    // Convert the public key from bytes to a verifying key
    const publicKey = computePublicKey(pubkeyBuffer, true); // 'true' para formato comprimido

    // Convert the signature to the format required by ethers.js
    const sig = { r: rHex, s: sHex };

    // Try both possible recovery IDs
    for (let i = 0; i < 2; i++) {
        try {
            const recoveredKey = recoverPublicKey(
                msgHash,
                { ...sig, recoveryParam: i }
            );

            if (recoveredKey === publicKey) {
                return i + 27;
            }
        } catch (error) {
            console.error(`Failed to recover key for i = ${i}: ${error}`);
        }
    }

    // If we couldn't determine the parity, default to 27
    // This is safer than panicking, as EIP-155 allows for v to be either 27 or 28
    return 27;
}


export async function updateContractNewEVM(tokenId: number, akashHash: string) {
    console.log('comecei new contract interaction')
    const evmAddress = await getCanisterEVMAddress()
    // const icpEVMAddress = getAddressEVM()
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
    );
    console.log('get transaction')

    const functionSignature = 'updateDeployment(uint256, string)';

    const input1 = tokenId;
    const input2 = akashHash;
    const data = contract.interface.encodeFunctionData(functionSignature, [input1, input2]);

    // const feeData = await provider.getFeeData();
    // const gasPrice = feeData.gasPrice;

    const jsonValue = {
        jsonrpc: "2.0",
        method: "eth_gasPrice",
        params: [],
        id: 1
      };
    console.log('gettin rpc')
    const resTransaction = await callRpc(providerUrl, jsonValue)
    await wait(5000);

    console.log(Number(resTransaction.result))
    // console.log(Number(gasPrice))
    
    const jsonValueGetTransactionCount = {
        jsonrpc: "2.0",
        method: "eth_getTransactionCount",
        params: [evmAddress, "latest"],
        id: 1
      };
      console.log('gettin res transaction 2')
    const resTransaction2 = await callRpc(providerUrl, jsonValueGetTransactionCount)
    await wait(5000);

    // const nonce = await provider.getTransactionCount(wallet.address);
    // const nonce = await provider.getTransactionCount(evmAddress);
 
    const to = contractAddress; 
    const value = ethers.parseEther('0.0'); 


    const jsonValueNet = {
        jsonrpc: "2.0",
        method: "net_version",
        params: [],
        id: 1
      };
      console.log('gettin net version')

    const resTransaction3 = await callRpc(providerUrl, jsonValueNet)
    await wait(5000);

    // let chainIdNet = await provider.getNetwork()

    console.log('estimating gas - ')

    // const walletEther = new ethers.Wallet("d8b95555526ef27c0a3758506953adec6bc43e25a7155aa805f04dcc2c44c39a");
    // const connectedWallet = walletEther.connect(provider);

    // const contractSigner = await contract.connect(connectedWallet);

    // const estimatedGas = await contractSigner.updateDeployment.estimateGas(input1, input2);
    // console.log('estimated gas value')
    // console.log(estimatedGas)
    // console.log(Number(estimatedGas))
    // return ''
    // const gasLimit = estimatedGas * BigInt(110) / BigInt(100); // Aumenta o gasLimit em 10%

    const tx = {
        to,
        value,
        gasPrice: resTransaction.result,
        chainId: resTransaction3.result,
        gasLimit: BigInt(72000),
        data,
        nonce: resTransaction2.result,
      };
    console.log('tx here now')
    const txHere = Transaction.from(tx).unsignedSerialized

    const txHash = ethers.keccak256(txHere);
    const final = ethers.getBytes(txHash)

    const signatureResult = await ic.call(
    managementCanister.sign_with_ecdsa,
    {
        args: [
            {
                message_hash: final,
                derivation_path: [],
                key_id: {
                    curve: { secp256k1: null },
                    name: canisterKeyEcdsa
                }
            }
        ],
        cycles: 25_000_000_000n
    }
    );

    const signature = signatureResult.signature;
    const r = signature.slice(0, 32);
    const s = signature.slice(32, 64);
    const rHex = ethers.hexlify(r)
    const sHex = ethers.hexlify(s)

    const txObject = parse(txHere);
    const here = ethers.Signature.from({
        v: 28,
        r: rHex,
        s: sHex,
    }).serialized
    const here2 = ethers.Signature.from({
        v: 27,
        r: rHex,
        s: sHex,
    }).serialized


    const broadcast = serialize(txObject, here)
    const broadcast2 = serialize(txObject, here2)

    console.log(Transaction.from(broadcast2).from) // 0x04277df14cfd4051cb1e92077749401cc124e0690f9fefb25ee4ff795d4697c7e9fbed77fcd669df65a8408828c92a7e41424dbc7b131f0e86fe8aaf90f21993b8
    console.log(Transaction.from(broadcast).from) // 0x30b7be09AebcD6c84D81988215741c65f52aABb9 
    
    let finalBroadcast;
    if (Transaction.from(broadcast).from === evmAddress) {
        finalBroadcast = broadcast
        // const txHashA = await provider.broadcastTransaction(broadcast);
        // console.log(txHashA)
        console.log('broadcast 1')
    } else if (Transaction.from(broadcast2).from === evmAddress) {
        finalBroadcast = broadcast2
        // const txHashA = await provider.broadcastTransaction(broadcast2);
        // console.log(txHashA)
        console.log('broadcast 2')
    }
    const jsonValueBroadcast = {
        jsonrpc: "2.0",
        method: "eth_sendRawTransaction",
        params: [finalBroadcast],
        id: 1
    };

    const resTransaction4 = await callRpc(providerUrl, jsonValueBroadcast)
    console.log(resTransaction4)
    
    return ''
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


