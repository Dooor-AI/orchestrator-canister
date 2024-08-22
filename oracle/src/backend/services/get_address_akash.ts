import { update, text, ic, None } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { Secp256k1PublicKey } from '@mysten/sui/keypairs/secp256k1';
import { canisterKeyEcdsa } from './constants';

const yamlObj = `
`

export const getEthereumAddress = update([], text, async () => {
    return await getAddressEVM();
});
export const getEcdsaPublicKeyBase64End = update([], text, async () => {
    return await getEcdsaPubKey();
});

export async function getAddressEVM() {
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

    console.log(publicKeyResult);

    console.log('address options')
    // console.log(addressNew)
    const publicKey = publicKeyResult.public_key.slice(1);  // Remover o primeiro byte se for 0x04 (não comprimido)
    console.log('Public Key:', Buffer.from(publicKey).toString('hex'));
    const publicKey2 = publicKeyResult.public_key
    // Calcular o Keccak-256 hash da chave pública
    const addressBytes = ethers.keccak256(publicKey);
    const addressBytes2 = ethers.keccak256(publicKey2);

    console.log('Keccak-256 Hash:', addressBytes);
    
    console.log('first')
    const addressNew = ethers.computeAddress(addressBytes)
    const addressNew2 = ethers.computeAddress(addressBytes2)
    console.log('second')
    console.log(addressNew)
    console.log('second')
    console.log(addressNew2)

    // Utilizar os últimos 20 bytes do hash como endereço
    const ethAddress = '0x' + addressBytes.slice(addressBytes.length - 40); // Últimos 20 bytes
    console.log('Ethereum Address:', ethAddress);

    return ethAddress;
}

// Função para preparar uma mensagem de transação
export const getAkashAddress = update([text], text, async (ethereumAddress: string) => {
    return await getAddressAkashFromEVM(ethereumAddress)
  })

// Função para preparar uma mensagem de transação
export const getCanisterAkashAddress = update([], text, async () => {
    return await getAddressAkash()
  })

export async function getAddressAkash() {
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

console.log(publicKeyResult)

const publicKeyBuffer = Buffer.from(publicKeyResult.public_key);

const publicKey = publicKeyResult.public_key; // This will be a Uint8Array
console.log('Public Key:', Buffer.from(publicKey).toString('hex'));

console.log('buffer pk')
console.log(publicKeyBuffer)

// Realiza o hash da chave pública usando SHA256
const sha256Hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();

console.log('sha hash')
console.log(sha256Hash)

// Realiza um segundo hash usando RIPEMD160
const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();

// Converte o resultado para o formato de endereço Bech32
const cosmosAddress = bech32.encode('akash', bech32.toWords(ripemd160Hash));

return cosmosAddress;
}

export async function getDerivationPathFromAddressEVM(ethereumAddress: string) {
    // const caller = ic.caller().toUint8Array();
    const hashedEthAddress = crypto.createHash('sha256').update(ethereumAddress).digest();

    // Converte o hash para Uint8Array
    const hashedEthAddressArray = new Uint8Array(hashedEthAddress);

    // Usa o hash do endereço Ethereum como parte do caminho de derivação
    const derivationPath = hashedEthAddressArray;
    return derivationPath
}

export async function getAddressAkashFromEVM(ethereumAddress: string) {
    // const caller = ic.caller().toUint8Array();
    const hashedEthAddress = crypto.createHash('sha256').update(ethereumAddress).digest();

    // Converte o hash para Uint8Array
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

    console.log(publicKeyResult)

    const publicKeyBuffer = Buffer.from(publicKeyResult.public_key);

    const publicKey = publicKeyResult.public_key; // This will be a Uint8Array
    console.log('Public Key:', Buffer.from(publicKey).toString('hex'));

    console.log('buffer pk')
    console.log(publicKeyBuffer)

    // Realiza o hash da chave pública usando SHA256
    const sha256Hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();

    console.log('sha hash')
    console.log(sha256Hash)

    // Realiza um segundo hash usando RIPEMD160
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();

    // Converte o resultado para o formato de endereço Bech32
    const cosmosAddress = bech32.encode('akash', bech32.toWords(ripemd160Hash));

    return cosmosAddress;
  }

  export async function getEcdsaPubKey() {
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

    const publicKeyBuffer = Buffer.from(publicKeyResult.public_key);

    const publicKey = publicKeyResult.public_key; // This will be a Uint8Array
    console.log('Public Key:', Buffer.from(publicKey).toString('hex'));
    
    console.log('buffer pk')
    console.log(publicKeyBuffer)
    
    // Realiza o hash da chave pública usando SHA256
    const sha256Hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();
    
    console.log('sha hash')
    console.log(sha256Hash)
    
    // Realiza um segundo hash usando RIPEMD160
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
    console.log('tipe')
    console.log(ripemd160Hash)
    return ''
}

  export async function getEcdsaPublicKeyBase64() {
    // Substitua 'None' e 'caller' por valores apropriados para o seu caso
    const publicKeyResult = await ic.call(
        managementCanister.ecdsa_public_key, {
            args: [
                {
                    canister_id: None,  // Substitua conforme a configuração necessária
                    derivation_path: [],  // Ajuste conforme necessário
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa  // O nome do identificador da chave
                    }
                }
            ]
        }
    );

    // Assume que publicKeyResult retorna algo como { public_key: Uint8Array }
    if (publicKeyResult && publicKeyResult.public_key) {
        const publicKeyBytes = publicKeyResult.public_key;
        console.log(publicKeyBytes)
        const base64PubKey = toBase64(publicKeyBytes);
        const encodedPubKey = encodePubkey({
          type: "tendermint/PubKeySecp256k1",
          value: base64PubKey,
        });
        console.log('encodedPubKey')
        console.log(encodedPubKey)
        return encodedPubKey;
    } else {
        throw new Error("Public key not retrieved successfully.");
    }
}

  export async function getEcdsaPublicKeyBase64FromEVM(ethereumAddress: string) {
    // Substitua 'None' e 'caller' por valores apropriados para o seu caso
    // const caller = ic.caller().toUint8Array();
    const hashedEthAddress = crypto.createHash('sha256').update(ethereumAddress).digest();

    // Converte o hash para Uint8Array
    const hashedEthAddressArray = new Uint8Array(hashedEthAddress);

    // Usa o hash do endereço Ethereum como parte do caminho de derivação
    const derivationPath = [hashedEthAddressArray];

    const publicKeyResult = await ic.call(
        managementCanister.ecdsa_public_key, {
            args: [
                {
                    canister_id: None,  // Substitua conforme a configuração necessária
                    derivation_path: derivationPath,  // Ajuste conforme necessário
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa // O nome do identificador da chave
                    }
                }
            ],
            cycles: 25_000_000_000n
        }
    );

    // Assume que publicKeyResult retorna algo como { public_key: Uint8Array }
    if (publicKeyResult && publicKeyResult.public_key) {
        const publicKeyBytes = publicKeyResult.public_key;
        const base64PubKey = toBase64(publicKeyBytes);
        const encodedPubKey = encodePubkey({
          type: "tendermint/PubKeySecp256k1",
          value: base64PubKey,
        });
        return encodedPubKey;
    } else {
        throw new Error("Public key not retrieved successfully.");
    }
}
