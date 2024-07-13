// random_address.ts

import { update, text, ic, None } from 'azle';
import { Bip39, Random, stringToPath } from '@cosmjs/crypto';
import { ethers } from 'ethers';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
import {
    MsgCloseDeployment,
    MsgCreateDeployment,
  } from '@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg';
import { akash } from 'akashjs';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import {
getAkashTypeRegistry,
getTypeUrl,
} from '@akashnetwork/akashjs/build/stargate/index';
import { StargateClient, SigningStargateClient, coins } from '@cosmjs/stargate';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import axios from 'axios';
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";

const akashPubRPC = 'https://rpc.akashnet.net:443';
const defaultInitialDeposit = 500000;

const yamlObj = `
`

// Função para preparar uma mensagem de transação
export const getAkashAddress = update([], text, async () => {
    return await getAddAkash()
  })

export async function getAddAkash() {
    const caller = ic.caller().toUint8Array();

    const publicKeyResult = await ic.call(
        managementCanister.ecdsa_public_key,
        {
            args: [
                {
                    canister_id: None,
                    derivation_path: [caller],
                    key_id: {
                        curve: { secp256k1: null },
                        name: 'dfx_test_key'
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

  export async function getEcdsaPublicKeyBase64() {
    // Substitua 'None' e 'caller' por valores apropriados para o seu caso
    const caller = ic.caller().toUint8Array();
    const publicKeyResult = await ic.call(
        managementCanister.ecdsa_public_key, {
            args: [
                {
                    canister_id: None,  // Substitua conforme a configuração necessária
                    derivation_path: [caller],  // Ajuste conforme necessário
                    key_id: {
                        curve: { secp256k1: null },
                        name: 'dfx_test_key'  // O nome do identificador da chave
                    }
                }
            ]
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
