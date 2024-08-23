// random_address.ts

import { update, text, ic, None } from 'azle';
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
    MsgDepositDeployment,
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
import { akashApiUrl, akashChainId, akashProviderUrl, canisterKeyEcdsa } from './constants';
import { getHttpRequest, postHttpRequest } from './external_https';

//ATTENTION: THIS SCRIPT IS MADE TO CREATE AN AKASH DEPLOYMENT, TO MAKE IT WORK, IT WAS NECESSARY TO CHANGE THE FILE AT node_modules/@akashnetwork/akashjs/build/sdl/SDL/SDL.js, SINCE 
//azle does not accept node:crypto, was installed crypto-js and used in the place of node:crypto.

export const akashPubRPC = 'https://akash-rpc.publicnode.com:443';
const defaultInitialDeposit = 500000;

// Função para preparar uma mensagem de transação
export async function createDeployment(fromAddress: string, yamlParsed: any, pubKeyEncoded: any, evmAddress: string, initialDeposit?: number) {
  const registry = new Registry();
  
  registry.register('/akash.deployment.v1beta3.MsgCreateDeployment', MsgCreateDeployment);
  
  // const client = await StargateClient.connect(akashPubRPC);

  const currentHeight = await getHeightAkash();
  const dseq = currentHeight;

  // const yamlStr = YAML.parse(yamlObj);
  console.log('passei')
  console.log(dseq)
  console.log('from address')
  console.log(fromAddress)

  if (!initialDeposit || initialDeposit < 0) {
    initialDeposit = defaultInitialDeposit
  }
  console.log('sending ', + initialDeposit)
  console.log('yaml ', yamlParsed)
  const deploymentData = await NewDeploymentData(
    yamlParsed,
    dseq,
    fromAddress,
    initialDeposit
  );

  const createDeploymentMsg = getCreateDeploymentMsg(deploymentData);

  const newBodyBytes = registry.encode({
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/akash.deployment.v1beta3.MsgCreateDeployment",
          value: createDeploymentMsg.value,
        },
      ],
    },
  } as EncodeObject);

    console.log('go to encode')
    const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
    const feeAmount = coins(20000, "uakt");
    const gasLimit = 800000;
    console.log('go to make auth')
    const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);

    const chainId = akashChainId;
    console.log('the chain id')
    console.log(chainId)
    console.log('signing doc')
    const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
    const signBytes = makeSignBytes(signDoc);
    const hashedMessage = (sha256(signBytes));

    console.log('starting hash')
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

    console.log('new serializing')
    const txRaw = TxRaw.fromPartial({
      bodyBytes: newBodyBytes,
      authInfoBytes: authInfoBytes,
      signatures: [signatureResult.signature],
    });
  
    const txRawBytes = TxRaw.encode(txRaw).finish();

    const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
    console.log('broadcasting new broad')
    const tx = await broadcastTransactionSync(txRawBase64)
    const res = {hash: tx?.tx_response?.txhash, dseq: dseq}
    return res
    // const txResult = await client.broadcastTxSync(txRawBytes);

    // try {
    //     const result = await waitForTransaction(client, txResult, 120000, 3000); // wait 2 minutes
    //     console.log('Transaction confirmed:', result);
    //     return {hash: result.hash, dseq};
    //   } catch (error) {
    //       console.error(error);
    //       throw 'error'
    //   }
  }

  export async function transferAkashTokensProvisorio(fromAddress: string, pubKeyEncoded: any, evmAddress: string, amount: string, toAddress: string) {
    const registry = new Registry();
        
    const msgSend = {
      fromAddress,
      toAddress,
      amount: [
          {
              denom: "uakt",
              amount
          }
      ]
  };

  const newBodyBytes = registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
          messages: [
              {
                  typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                  value: msgSend,
              },
          ],
      },
  } as EncodeObject);
  
      console.log('go to encode')
      const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
      const feeAmount = coins(20000, "uakt");
      const gasLimit = 800000;
      console.log('go to make auth')
      const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);
  
      const chainId = akashChainId;
      console.log('the chain id')
      console.log(chainId)
      console.log('signing doc')
      const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
      const signBytes = makeSignBytes(signDoc);
      const hashedMessage = (sha256(signBytes));
  
      console.log('starting hash')
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
  
      console.log('new serializing')
      const txRaw = TxRaw.fromPartial({
        bodyBytes: newBodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [signatureResult.signature],
      });
    
      const txRawBytes = TxRaw.encode(txRaw).finish();
  
      const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
      console.log('broadcasting new broad')
      const tx = await broadcastTransactionSync(txRawBase64)
      return tx
      // const txResult = await client.broadcastTxSync(txRawBytes);
  
      // try {
      //     const result = await waitForTransaction(client, txResult, 120000, 3000); // wait 2 minutes
      //     console.log('Transaction confirmed:', result);
      //     return {hash: result.hash, dseq};
      //   } catch (error) {
      //       console.error(error);
      //       throw 'error'
      //   }
    }

  export async function closeDeployment(fromAddress: string, pubKeyEncoded: any, evmAddress: string, dseq: string) {
    const registry = new Registry();
    
    registry.register('/akash.deployment.v1beta3.MsgCreateDeployment', MsgCreateDeployment);
    
    // const client = await StargateClient.connect(akashPubRPC);
  
    const closeData = await NewCloseDeploymentData(
      dseq,
      fromAddress,
    );
    console.log('after deployment data')
  
    const newBodyBytes = registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: [
          {
            typeUrl: "/akash.deployment.v1beta3.MsgCloseDeployment",
            value: closeData,
          },
        ],
      },
    } as EncodeObject);
  
      console.log('go to encode')
      const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
      const feeAmount = coins(25000, "uakt");
      const gasLimit = 1000000;
      console.log('go to make auth')
      const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);
  
      const chainId = akashChainId;
      console.log('the chain id')
      console.log(chainId)
      console.log('signing doc')
      const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
      const signBytes = makeSignBytes(signDoc);
      const hashedMessage = (sha256(signBytes));
  
      console.log('starting hash')
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
  
      console.log('new serializing')
      const txRaw = TxRaw.fromPartial({
        bodyBytes: newBodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [signatureResult.signature],
      });
    
      const txRawBytes = TxRaw.encode(txRaw).finish();
  
      const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
      console.log('broadcasting new broad')
      const tx = await broadcastTransactionSync(txRawBase64)
      return tx?.tx_response?.txhash
    }

export async function createLease(
    fromAddress: string, 
    pubKeyEncoded: any, 
    evmAddress: string,
    dseq: string,
    gseq?: string,
    provider?: string,
    oseq?: string)  {
    console.log('value I received')
    console.log(fromAddress)
    console.log(pubKeyEncoded)
    console.log(dseq)
    console.log(evmAddress)
    console.log(gseq)
    console.log(provider)
    console.log(oseq)
    console.log('next')

    const registry = new Registry();

    registry.register('/akash.market.v1beta4.MsgCreateLease', MsgCreateLease);

    // const client = await StargateClient.connect(akashPubRPC);

    const newBodyBytes = registry.encode({
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
        messages: [
            {
            typeUrl: "/akash.market.v1beta4.MsgCreateLease",
            value: {
                bidId: {
                    owner: fromAddress,
                    dseq: Long.fromString(dseq, true),
                    gseq,
                    oseq,
                    provider,
                }
            },
            },
        ],
        },
    } as EncodeObject);

    const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
    const feeAmount = coins(87500, "uakt");
    const gasLimit = 3500000;

    console.log('go to make auth')
    const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);

    const chainId = akashChainId;

    console.log('signing doc')
    const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
    const signBytes = makeSignBytes(signDoc);
    const hashedMessage = (sha256(signBytes));

    console.log('signing call')
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

    console.log('new serializing')
    const txRaw = TxRaw.fromPartial({
    bodyBytes: newBodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [signatureResult.signature],
    });

    const txRawBytes = TxRaw.encode(txRaw).finish();

    const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
    console.log('broadcasting new broad')
    const tx = await broadcastTransactionSync(txRawBase64)
    return tx?.tx_response?.txhash
}

export async function newCloseDeployment(
  fromAddress: string, 
  pubKeyEncoded: any, 
  evmAddress: string,
  dseq: string)  {
  console.log('value I received')
  console.log(fromAddress)
  console.log(pubKeyEncoded)
  console.log(dseq)
  console.log(evmAddress)
  console.log('next')

  const registry = new Registry();

  registry.register('/akash.deployment.v1beta3.MsgCloseDeployment', MsgCloseDeployment);

  // const client = await StargateClient.connect(akashPubRPC);

  const closeData = await NewCloseDeploymentData(
    dseq,
    fromAddress,
  );
  console.log('after deployment data')

  const newBodyBytes = registry.encode({
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/akash.deployment.v1beta3.MsgCloseDeployment",
          value: closeData,
        },
      ],
    },
  } as EncodeObject);

  const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
  const feeAmount = coins(87500, "uakt");
  const gasLimit = 3500000;

  console.log('go to make auth')
  const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);

  const chainId = akashChainId;

  console.log('signing doc')
  const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
  const signBytes = makeSignBytes(signDoc);
  const hashedMessage = (sha256(signBytes));

  console.log('signing call')
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

  console.log('new serializing')
  const txRaw = TxRaw.fromPartial({
  bodyBytes: newBodyBytes,
  authInfoBytes: authInfoBytes,
  signatures: [signatureResult.signature],
  });

  const txRawBytes = TxRaw.encode(txRaw).finish();

  const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
  console.log('broadcasting new broad')
  const tx = await broadcastTransactionSync(txRawBase64)
  return tx?.tx_response?.txhash
}

export async function fundDeployment(
  fromAddress: string, 
  pubKeyEncoded: any, 
  evmAddress: string,
  dseq: string,
  deposit: string)  {
  console.log('value I received noww')
  console.log(fromAddress)
  console.log(pubKeyEncoded)
  console.log(dseq)
  console.log('next')

  const registry = new Registry();

  registry.register('/akash.deployment.v1beta3.MsgDepositDeployment', MsgDepositDeployment);

  // const client = await StargateClient.connect(akashPubRPC);

  console.log('after deployment data')

  const newBodyBytes = registry.encode({
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/akash.deployment.v1beta3.MsgDepositDeployment",
          value: {
            id: {
              owner: 'akash1c3er49222vygzm6g4djr52muf3mspqam6cpqpy',
              dseq: dseq,
            },
            amount: {
              denom: 'uakt',
              amount: deposit,
            },
            depositor: fromAddress,
          },
        },
      ],
    },
  } as EncodeObject);

  const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
  const feeAmount = coins(87500, "uakt");
  const gasLimit = 3500000;

  console.log('go to make auth')
  const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);

  const chainId = akashChainId;

  console.log('signing doc')
  const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
  const signBytes = makeSignBytes(signDoc);
  const hashedMessage = (sha256(signBytes));

  console.log('signing call')
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

  console.log('new serializing')
  const txRaw = TxRaw.fromPartial({
    bodyBytes: newBodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [signatureResult.signature],
  });

  const txRawBytes = TxRaw.encode(txRaw).finish();

  const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
  console.log('broadcasting new broad')
  const tx = await broadcastTransactionSync(txRawBase64)
  return tx?.tx_response?.txhash
}

export async function fundDeploymentTesting(
  fromAddress: string, 
  fromAddressOwner: string,
  pubKeyEncoded: any, 
  dseq: string,
  deposit: string)  {
  console.log('value I received noww')
  console.log(fromAddress)
  console.log(pubKeyEncoded)
  console.log(dseq)
  console.log('next')

  const registry = new Registry();

  registry.register('/akash.deployment.v1beta3.MsgDepositDeployment', MsgDepositDeployment);

  // const client = await StargateClient.connect(akashPubRPC);

  console.log('after deployment data')

  const newBodyBytes = registry.encode({
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/akash.deployment.v1beta3.MsgDepositDeployment",
          value: {
            id: {
              owner: fromAddressOwner,
              dseq: dseq,
            },
            amount: {
              denom: 'uakt',
              amount: Number(deposit),
            },
          },
        },
      ],
    },
  } as EncodeObject);

  const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
  const feeAmount = coins(87500, "uakt");
  const gasLimit = 3500000;

  console.log('go to make auth')
  const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);

  const chainId = akashChainId;

  console.log('signing doc')
  const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
  const signBytes = makeSignBytes(signDoc);
  const hashedMessage = (sha256(signBytes));

  console.log('signing call')
  const signatureResult = await ic.call(
  managementCanister.sign_with_ecdsa,
  {
      args: [
          {
              message_hash: hashedMessage,
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

  console.log('new serializing')
  const txRaw = TxRaw.fromPartial({
    bodyBytes: newBodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [signatureResult.signature],
  });

  const txRawBytes = TxRaw.encode(txRaw).finish();

  console.log('broadcasting new broad')
  const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
  console.log('broadcasting new broad')
  const tx = await broadcastTransactionSync(txRawBase64)
  return tx?.tx_response?.txhash
}

export const closeDeploymentAkashFromAddress = update([text], text, async (dseq: string) => {
  console.log('value I received')
  console.log(dseq)
  const evm = '0xfACF2850792b5e32a0497CfeD8667649B9f5ec97'
  const fromAddress = await getAddressAkashFromEVM(evm)
  const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evm)

  const registry = new Registry();
  
  registry.register('/akash.deployment.v1beta3.MsgCloseDeployment', MsgCloseDeployment);
  
  // const client = await StargateClient.connect(akashPubRPC);

  const closeData = await NewCloseDeploymentData(
    dseq,
    fromAddress,
  );
  console.log('after deployment data')

  const newBodyBytes = registry.encode({
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: [
        {
          typeUrl: "/akash.deployment.v1beta3.MsgCloseDeployment",
          value: closeData,
        },
      ],
    },
  } as EncodeObject);

  const { accountNumber, sequence } = await getAccountNumberAndSequence(fromAddress);
  const feeAmount = coins(25000, "uakt");
    const gasLimit = 1000000;

    console.log('go to make auth')
    const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKeyEncoded, sequence }], feeAmount, gasLimit, undefined, undefined);

    const chainId = akashChainId;

    console.log('signing doc')
    const signDoc = makeSignDoc(newBodyBytes, authInfoBytes, chainId, accountNumber);
    const signBytes = makeSignBytes(signDoc);
    const hashedMessage = (sha256(signBytes));

    console.log('signing call')
    const caller = await getDerivationPathFromAddressEVM(evm)
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

    console.log('new serializing')
    const txRaw = TxRaw.fromPartial({
      bodyBytes: newBodyBytes,
      authInfoBytes: authInfoBytes,
      signatures: [signatureResult.signature],
    });
  
    const txRawBytes = TxRaw.encode(txRaw).finish();

    console.log('broadcasting new broad')
    const txRawBase64 = Buffer.from(txRawBytes).toString('base64');
    console.log('broadcasting new broad')
    const tx = await broadcastTransactionSync(txRawBase64)
    return tx?.tx_response?.txhash
  })

// Função para criar um Uint8Array de um objeto TxRaw
function createTxRawBytes(txRaw: TxRaw): Uint8Array {
  const size = txRaw.bodyBytes.length + txRaw.authInfoBytes.length + txRaw.signatures.reduce((sum, sig) => sum + sig.length, 0);
  const txRawBytes = new Uint8Array(size);

  let offset = 0;
  txRawBytes.set(txRaw.bodyBytes, offset);
  offset += txRaw.bodyBytes.length;

  txRawBytes.set(txRaw.authInfoBytes, offset);
  offset += txRaw.authInfoBytes.length;

  txRaw.signatures.forEach(signature => {
      txRawBytes.set(signature, offset);
      offset += signature.length;
  });

  return txRawBytes;
}

  function base64ToUint8Array(base64: any) {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}
      // const caller = ic.caller().toUint8Array();
    // const signatureResult = await ic.call(
    //     managementCanister.sign_with_ecdsa,
    //     {
    //         args: [
    //             {
    //                 message_hash: hash,
    //                 derivation_path: [caller],
    //                 key_id: {
    //                     curve: { secp256k1: null },
    //                     name: 'dfx_test_key'
    //                 }
    //             }
    //         ],
    //         cycles: 10_000_000_000n
    //     }
    // );
    // console.log(signatureResult)
    // const broadcast = await client.broadcastTxSync(signatureResult.signature)


function getCreateDeploymentMsg(deploymentData: any) {
    const message = {
      typeUrl: '/akash.deployment.v1beta3.MsgCreateDeployment',
      value: {
        id: deploymentData.deploymentId,
        groups: deploymentData.groups,
        version: deploymentData.version,
        deposit: deploymentData.deposit,
        depositor: deploymentData.depositor,
      },
    };

    return message;
  }

  export async function getHeightAkash() {
    const url  = `${akashProviderUrl}/status`
    const res = await getHttpRequest(url, 2_000_000n, 24_000_000_000n)
    console.log('res aqui height')
    console.log(res)
    return String(res?.result?.sync_info?.latest_block_height)
  }

  export async function getAccountNumberAndSequence(akashAddress: string) {
    const url = `${akashApiUrl}/cosmos/auth/v1beta1/accounts/${akashAddress}`
    const res = await getHttpRequest(url, 2_000_000n, 25_000_000_000n)
    return {accountNumber: Number(res?.account?.account_number), sequence: Number(res?.account?.sequence)}
  }

  export async function broadcastTransactionSync(tx: string) {
    const url = `${akashApiUrl}/cosmos/tx/v1beta1/txs`
    const data = {
      tx_bytes: tx,
      mode: 'BROADCAST_MODE_SYNC'
    }
    const res = await postHttpRequest(url, 2_000_000n, 50_000_000_000n, data)
    console.log('!!!! RESPOSTA DO BROADCAST !!!!')
    // console.log(res)
    if (res?.tx_response?.raw_log?.length > 0) {
      // if it is not equal zero, it means that the transaction was not succesful
      throw ('Broadcast error: ' + JSON.stringify(res?.tx_response?.raw_log) + JSON.stringify(res?.tx_response?.logs))
    }

    return res
  }

  // async function getCurrentHeight(client: StargateClient): Promise<number> {
  //   const latestBlock = await client.getBlock();
  //   return latestBlock.header.height;
  // }

  function isValidString(value: unknown): value is string {
    return typeof value === 'string' && !!value;
  }

  function getSdl(
    yamlJson: string | v2Sdl,
    networkType: 'beta2' | 'beta3',
    networkId: NetworkId,
  ) {
    return isValidString(yamlJson)
      ? SDL.fromString(yamlJson, networkType, networkId)
      : new SDL(yamlJson, networkType, networkId);
  }

  const getDenomFromSdl = (groups: any[]): string => {
    const denoms = groups
      .flatMap((g) => g.resources)
      .map((resource) => resource.price.denom);

    // TODO handle multiple denoms in an sdl? (different denom for each service?)
    return denoms[0];
  };

async function NewDeploymentData(
  yamlStr: string,
  dseq: string | null,
  fromAddress: string,
  deposit: number,
  depositorAddress: string | null = null,
) {
  try {
    console.log('sdl')
    const sdl = getSdl(yamlStr, 'beta3', 'mainnet');
    console.log('groups')
    const groups = sdl.groups();
    console.log('mani')
    const mani = sdl.manifest();
    console.log('denom')
    const denom = getDenomFromSdl(groups);
    console.log('version')
    const version = await sdl.manifestVersion();
    const _deposit = {
      denom,
      amount: deposit.toString(),
    };
    console.log(_deposit)
    console.log('got sdl version and return')

    return {
      sdl: sdl.data,
      manifest: mani,
      groups: groups,
      deploymentId: {
        owner: fromAddress,
        dseq: dseq,
      },
      orderId: [],
      leaseId: [],
      version,
      deposit: _deposit,
      depositor: depositorAddress || fromAddress,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function NewCloseDeploymentData(
  dseq: string | null,
  fromAddress: string,
) {
  try {
    return {
      id: {
        owner: fromAddress,
        dseq: dseq,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function NewCreateCertificateData(
  pubkey: Uint8Array,
  cert: Uint8Array,
  owner: string,
) {
  try {
    return {
      owner,
      cert,
      pubkey,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function NewCreateLeaseData(
  owner: string | undefined,
  dseq: string | undefined,
  gseq: number | undefined,
  provider: string | undefined,
  oseq: number | undefined,
) {
  try {
    return {
      bidId: {
        owner,
        dseq,
        gseq,
        provider,
        oseq,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}