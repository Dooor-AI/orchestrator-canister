import { update, text, ic, None, Record, query, bool, int } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { getAddressAkashFromEVM, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { createCertificateAkash } from './certificate';
import { createCertificateKeys } from './akash_certificate_manager';
import {parse} from 'flatted'
import { getBids } from './external_https';
import { getCanisterEVMAddress } from './interaction_evm';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { Bip39, Random, stringToPath, sha256 } from '@cosmjs/crypto';
import {
    DirectSecp256k1HdWallet,
    DirectSecp256k1Wallet,
    OfflineSigner,
    Registry,
    makeSignDoc,
    makeAuthInfoBytes,
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
import { getAddressAkash, getDerivationPathFromAddressEVM, getEcdsaPublicKeyBase64 } from './get_address_akash';
import { waitForTransaction } from './deployment_akash';
const CryptoJS = require("crypto-js");
import { decodeTxRaw } from "@cosmjs/proto-signing"
import { encodeLen } from "@dfinity/agent";
import { TxRaw, TxBody, Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { assert } from "@cosmjs/utils";
import { MsgCreateCertificate } from '@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert';
import { getManifestProviderUriValue, sendManifestToProvider } from './manifest';
import { akashPubRPC } from './deployment_akash_2';
import { db, getAkashAddress, ToaaAkash } from './user';
import { akashChainId, canisterKeyEcdsa } from './constants';
import { broadcastTransactionSync, getAccountNumberAndSequence } from './deployment_akash_3';

const yamlObj = ``;

export let akashCertGlobal: any = {};

// certPem and certPubpem as base64
export const toaaInitiate = update([], text, async () => {
    if (db.toaaAkash['0x']) {
        throw ('Toaa already created');
    }

    const evmAddress = await getCanisterEVMAddress()
    const res = await getAkashAddress(evmAddress);

    const toaa: ToaaAkash = {
        id: '0x',
        akashAddress: res.akashAddress,
        akashPubEncod: JSON.stringify(res.pubEncod),
        nonce: "0",
        akashCertPriv: '',
        akashCertPub: '',
        akashCertDeployed: false,
    };
    db.toaaAkash['0x'] = toaa;

    const keys = createCertificateKeys(db.toaaAkash['0x'].akashAddress);
    akashCertGlobal['0x'] = keys.cert
    db.toaaAkash['0x'].akashCertPub = (keys.publicKey);
    db.toaaAkash['0x'].akashCertPriv = (keys.privateKey);
    db.toaaAkash['0x'].nonce = JSON.stringify(Number(db.toaaAkash['0x'].nonce) + 1);

    return db.toaaAkash['0x'].akashAddress;
});

export const toaaInfo = query([], text, async () => {
  return JSON.stringify(db.toaaAkash['0x'])
});

export const toaaCreateCertificate = update([], text, async () => {
    if (db.toaaAkash['0x'].akashCertDeployed) {
        throw ('Toaa already created akash cert');
    }
    const evmAddress = await getCanisterEVMAddress()

    const certPubpem = db.toaaAkash['0x'].akashCertPub
    const certPEM = certificateManager.accelarGetPEM(akashCertGlobal['0x'])
    console.log(certPEM)
    const fromAddress = db.toaaAkash['0x'].akashAddress
    const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evmAddress);

    const registry = new Registry();
    
    registry.register('/akash.cert.v1beta3.MsgCreateCertificate', MsgCreateCertificate);
      
    const newBodyBytes = registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: [
          {
            typeUrl: "/akash.cert.v1beta3.MsgCreateCertificate",
            value: {
              owner: fromAddress,
              cert: Buffer.from(certPEM).toString("base64"),
              pubkey: Buffer.from(certPubpem).toString("base64"),
            },
          },
        ],
      },
    } as EncodeObject);
  
      console.log('go to encode passei')
      console.log(fromAddress)
      console.log(pubKeyEncoded)
      const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
      const feeAmount = coins(20000, "uakt");
      const gasLimit = 800000;
      console.log('go to make auth')
      const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit);
  
      const chainId = akashChainId;

      const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
      const signBytes = makeSignBytes(signDoc);
      const hashedMessage = (sha256(signBytes));

      console.log( `signing`)

      const caller = await getDerivationPathFromAddressEVM(evmAddress)
      const signatureResult = await ic.call(
        managementCanister.sign_with_ecdsa,
        {
            args: [
                {
                    message_hash: hashedMessage,
                    derivation_path: [caller],
                    key_id: {
                        curve: { secp256k1: null },
                        name: canisterKeyEcdsa
                    }
                }
            ],
            cycles: 25_000_000_000n
        }
      );
  
      const txRaw = TxRaw.fromPartial({
        bodyBytes: newBodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [signatureResult.signature], // Usar Uint8Array aqui
      });
    
      // Serializando o objeto TxRaw para Uint8Array
      const txRawBytes = TxRaw.encode(txRaw).finish();
  
      const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
      console.log('broadcasting new broad')
      const tx = await broadcastTransactionSync(txRawBase64)
      return tx?.tx_response?.txhash
    })

