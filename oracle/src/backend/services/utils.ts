// random_address.ts

import { update, text, ic } from 'azle';
import { Bip39, Random, stringToPath, sha256 } from '@cosmjs/crypto';
import { ethers } from 'ethers';
import {
    DirectSecp256k1HdWallet,
    DirectSecp256k1Wallet,
    OfflineSigner,
    Registry,
    makeSignDoc,
    makeAuthInfoBytes,
    makeSignBytes,
    TxBodyEncodeObject,
    EncodeObject,
  } from '@cosmjs/proto-signing';
import Long from "long";
import {
    MsgCloseDeployment,
    MsgCreateDeployment,
  } from '@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg';
import {
    MsgCreateLease
  } from '@akashnetwork/akashjs/build/protobuf/akash/market/v1beta4/lease';

import { akash } from 'akashjs';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import {
getAkashTypeRegistry,
getTypeUrl,
Message
} from '@akashnetwork/akashjs/build/stargate/index';
import { StargateClient, SigningStargateClient, coins, MsgSendEncodeObject } from '@cosmjs/stargate';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import axios from 'axios';
import { getAddressAkash, getAddressAkashFromEVM, getDerivationPathFromAddressEVM, getEcdsaPublicKeyBase64, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { waitForTransaction, yamlObj } from './deployment_akash';
const CryptoJS = require("crypto-js");
import { managementCanister } from 'azle/canisters/management';
import * as crypto from 'crypto';
import { decodeTxRaw } from "@cosmjs/proto-signing"
import { encodeLen } from "@dfinity/agent";
import { TxRaw, TxBody, Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { assert } from "@cosmjs/utils";
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { MsgCreateCertificate } from '@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert';
import { getManifestProviderUriValue, sendManifestToProvider } from './manifest';
import { akashPubRPC } from './deployment_akash_2';
import { akashCertGlobal, db } from './user';
import {parse} from 'flatted'

export async function simulateTx(msg: any) {
  const mnemonic = 'this.akashMnemonic';
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'akash',
  });
  // get first account
  const [account] = await wallet.getAccounts();

  const myRegistry = new Registry();
  console.log(myRegistry);
  myRegistry.register('/akash.market.v1beta4.MsgCreateLease', MsgCreateLease);

  const client = await SigningStargateClient.connectWithSigner(
    akashPubRPC,
    wallet,
    {
      registry: myRegistry,
    },
  );

}

export function convertManifest(manifest: string) {
    const manToTreat = JSON.parse(manifest)[0]
    const body = convertNumbersToStrings(manToTreat)
    const jsonBody = JSON.stringify([body]);
    return (jsonBody)
}

function convertNumbersToStrings(obj) {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
        if (typeof value === 'number' && key === 'val') {
            newObj[key] = value.toString();  // Convertendo para string se a chave é 'val'
        } else if (typeof value === 'object' && value !== null) {
            newObj[key] = convertNumbersToStrings(value);  // Recursão para objetos aninhados
        } else {
            newObj[key] = value;  // Mantendo outros valores inalterados
        }
        return newObj;
    }, Array.isArray(obj) ? [] : {});
}