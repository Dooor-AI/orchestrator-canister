// random_address.ts

import {
    update, 
    text, 
    ic,     
    init,
    nat32,
    Principal,
    query,
    Some,
    None,
    StableBTreeMap,     
    Canister,
    blob,
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';
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
import { getAddressAkash, getEcdsaPublicKeyBase64 } from './get_address_akash';
import { waitForTransaction, yamlObj } from './deployment_akash';
const CryptoJS = require("crypto-js");
import * as crypto from 'crypto';
import { decodeTxRaw } from "@cosmjs/proto-signing"
import { encodeLen } from "@dfinity/agent";
import { TxRaw, TxBody, Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { MsgSend } from 'akashjs/types/proto/cosmos/bank/v1beta1/tx';
import { assert } from "@cosmjs/utils";
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { MsgCreateCertificate } from '@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert';
import { wait } from './timer';
import { ApiProviderList } from './provider';
import { PROVIDER_PROXY_URL } from './constants';
import { globalVar } from './deployment_akash_2';


export async function getBids(owner: string, dseq: string) {
    let response;
    console.log('dados')
    for (let i = 1; i <= 3; i++) {
      console.log("Try #" + i);
      try {
        if (!response) {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: 2_000_000n,
                cycles: 50_000_000_000n,
                transformMethodName: 'transformResponse'
            });
    
            const response = await ic.call(managementCanister.http_request, {
                args: [
                    {
                        url: `https://akash-api.polkachu.com/akash/market/v1beta4/bids/list?filters.owner=${owner}&filters.dseq=${dseq}`,
                        max_response_bytes: Some(2_000_000n),
                        method: {
                            get: null
                        },
                        headers: [],
                        body: None,
                        transform: Some({
                            function: [ic.id(), 'transformResponse'] as [Principal, string],
                            context: Uint8Array.from([])
                        })
                    }
                ],
                cycles: 50_000_000_000n
            });
    
            const responseText = Buffer.from(response.body.buffer).toString('utf-8');
            console.log('deu bom sending url');
            console.log(JSON.parse(responseText));
    
  
            i = 3;

            return JSON.parse(responseText);
        }
      } catch (err: any) {
        console.log(err)
        if (err.includes && err.includes("no lease for deployment") && i < 3) {
          console.log("Lease not found, retrying...");
          await wait(6000); // Waiting for 6 sec
        } else {
          console.log('deu erro')
          console.log(err)
          throw new Error(err?.response?.data || err);
        }
      }}
}