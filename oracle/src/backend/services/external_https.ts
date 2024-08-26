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
import { convertManifest } from './utils';


export async function getBids(owner: string, dseq: string) {
    let response;
    console.log('dados')
    for (let i = 1; i <= 10; i++) {
      console.log("Try #" + i);
      try {
        if (!response) {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: 2_000_000n,
                cycles: 25_000_000_000n,
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
                cycles: 25_000_000_000n
            });
    
            const responseText = Buffer.from(response.body.buffer).toString('utf-8');
            if (JSON.parse(responseText)?.bids?.length === 0) {
              console.log('bids zeradas, trying again')
              continue
            }
  
            i = 10;

            return JSON.parse(responseText);
        }
      } catch (err: any) {
        console.log(err)
        if (i < 10) {
          console.log("Lease not found, retrying...");
          await wait(6000); // Waiting for 6 sec
        } else {
          console.log(err)
          throw new Error(err?.response?.data || err);
        }
      }}
}

  export async function postHttpRequest(url: string, maxResBts: bigint, cycles: bigint, bodyData: any) {
    let response;
    console.log(url)
    console.log(bodyData)
    for (let i = 1; i <= 3; i++) {
      console.log("Try #" + i);
      try {
        if (!response) {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: maxResBts,
                cycles,
                transformMethodName: 'transformResponse'
            });
    
            const response = await ic.call(managementCanister.http_request, {
                args: [
                    {
                        url,
                        max_response_bytes: Some(maxResBts),
                        method: {
                            post: null
                        },
                        headers: [{name:'Content-Type', value:'application/json'}],
                        body: Some(
                          Buffer.from(
                              JSON.stringify(bodyData),
                              'utf-8'
                          )
                      ),
                        transform: Some({
                            function: [ic.id(), 'transformResponse'] as [Principal, string],
                            context: Uint8Array.from([])
                        })
                    }
                ],
                cycles,
            });
    
            const responseText = Buffer.from(response.body.buffer).toString('utf-8');
            console.log('success');
            console.log((responseText));
    

            i = 3;

            return JSON.parse(responseText);
        }
      } catch (err: any) {
        console.log(err)
        if (i < 3) {
          console.log("Error, retrying...");
          await wait(6000); // Waiting for 6 sec
        } else {
          console.log('error')
          console.log(err)
          throw new Error(err?.response?.data || err);
        }
      }}
  }

export async function sendManifestTest() {
  let response;
  console.log('dados')
  const body = "[{\"name\":\"dcloud\",\"services\":[{\"name\":\"web\",\"image\":\"akashlytics/hello-akash-world:0.2.0\",\"command\":null,\"args\":null,\"env\":null,\"resources\":{\"id\":1,\"cpu\":{\"units\":{\"val\":\"500\"}},\"memory\":{\"size\":{\"val\":536870912}},\"storage\":[{\"name\":\"default\",\"size\":{\"val\":536870912}}],\"endpoints\":[{\"sequence_number\":0}],\"gpu\":{\"units\":{\"val\":0}}},\"count\":1,\"expose\":[{\"port\":3000,\"externalPort\":80,\"proto\":\"TCP\",\"service\":\"\",\"global\":true,\"hosts\":null,\"httpOptions\":{\"maxBodySize\":1048576,\"readTimeout\":60000,\"sendTimeout\":60000,\"nextTries\":3,\"nextTimeout\":0,\"nextCases\":[\"error\",\"timeout\"]},\"ip\":\"\",\"endpointSequenceNumber\":0}],\"params\":null,\"credentials\":null}]}]"
  const finalBody2 = convertManifest(body)
  const finalBody3 = null
  const finalBody = body.replace(/"quantity":{"val/g, '"size":{"val');
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
                      url: `https://d2n5s49d9uv0b0.cloudfront.net/utils/functions/sendMessageManifestProvider`,
                      max_response_bytes: Some(2_000_000n),
                      method: {
                          post: null
                      },
                      headers: [{name:'Content-Type', value:'application/json'}],
                      body: Some(
                        Buffer.from(
                            JSON.stringify({
                                method: "GET",
                                url: "https://provider.sys5ops4u.cloud:8443/lease/17317602/1/1/status",
                                certPem: "-----BEGIN CERTIFICATE-----\r\nMIIBnDCCAUGgAwIBAgIHBh4H6A9EmDAKBggqhkjOPQQDAjA3MTUwMwYDVQQDDCxh\r\na2FzaDE0YWY5NnoyOGxlejY3dHBqeW5hMno4aDdtd3N5a3c5MHhocTQ0bDAeFw0y\r\nNDA3MjUwMDU5MjdaFw0yNTA3MjUwMDU5MjdaMDcxNTAzBgNVBAMMLGFrYXNoMTRh\r\nZjk2ejI4bGV6Njd0cGp5bmEyejhoN213c3lrdzkweGhxNDRsMFkwEwYHKoZIzj0C\r\nAQYIKoZIzj0DAQcDQgAEaRE1mJHE6mgDn5IHO7s8L8Yl+kvaj9cciZpJRzuHIPSw\r\n0UG4WOK69sdSd8nInITtOFecrnCkWHBgYo5fb9GZOKM4MDYwDgYDVR0PAQH/BAQD\r\nAgQwMBMGA1UdJQQMMAoGCCsGAQUFBwMCMA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZI\r\nzj0EAwIDSQAwRgIhAJyC+f2RIIaPBkn9pCcIylB9T4ntMjDkTm8D78oIJJVdAiEA\r\ntD4fzlQDMYcgwqhAUVPWmLDXZfug9+Uuba6HIsp+11w=\r\n-----END CERTIFICATE-----\r\n",
                                keyPem: "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgsoeoKRxFFyOiKmDU\r\nma7VbmpTqKbGEu+uzyE/kdF838yhRANCAARpETWYkcTqaAOfkgc7uzwvxiX6S9qP\r\n1xyJmklHO4cg9LDRQbhY4rr2x1J3ycichO04V5yucKRYcGBijl9v0Zk4\r\n-----END PRIVATE KEY-----\r\n",
                                body: finalBody3,
                            }),
                            'utf-8'
                        )
                    ),
                      transform: Some({
                          function: [ic.id(), 'transformResponse'] as [Principal, string],
                          context: Uint8Array.from([])
                      })
                  }
              ],
              cycles: 50_000_000_000n
          });
  
          const responseText = Buffer.from(response.body.buffer).toString('utf-8');
          console.log('success');
          console.log(JSON.parse(responseText));
  

          i = 3;

          return JSON.parse(responseText);
      }
    } catch (err: any) {
      console.log(err)
      if (i < 3) {
        console.log("Error, retrying...");
        await wait(6000); // Waiting for 6 sec
      } else {
        console.log('error')
        console.log(err)
        throw new Error(err?.response?.data || err);
      }
    }}
}

export async function getHttpRequest(url: string, maxResBts: bigint, cycles: bigint) {
  let response;

  for (let i = 1; i <= 3; i++) {
    console.log("Try #" + i);
    try {
      if (!response) {
          ic.setOutgoingHttpOptions({
              maxResponseBytes: maxResBts, //2_000_000n
              cycles: cycles, //50_000_000_000n
              transformMethodName: 'transformResponse'
          });
  
          const response = await ic.call(managementCanister.http_request, {
              args: [
                  {
                      url: url,
                      max_response_bytes: Some(maxResBts), //2_000_000n
                      method: {
                          get: null
                      },
                      headers: [{name:'Content-Type', value:'application/json'}],
                      body: None,
                      transform: Some({
                          function: [ic.id(), 'transformResponse'] as [Principal, string],
                          context: Uint8Array.from([])
                      })
                  }
              ],
              cycles: cycles //50_000_000_000n
          });
  
          const responseText = Buffer.from(response.body.buffer).toString('utf-8');
          console.log('success');
          console.log(JSON.parse(responseText));
  

          i = 3;

          return JSON.parse(responseText);
      }
    } catch (err: any) {
      console.log(err)
      if (i < 3) {
        await wait(6000); // Waiting for 6 sec
      } else {
        console.log('error')
        console.log(err)
        throw new Error(err?.response?.data || err);
      }
    }}
}

export async function sendManifestProvisorio(url: string, body: string | null, method: string, certPem: any, keyPem: string) {
  console.log(url)
  console.log('body')
  console.log(body)
  console.log('method')
  console.log(method)
  console.log('certPem')
  // console.log(certPem)
  console.log('keyPem')
  console.log(keyPem)
  const finalBody = body
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
                      url: `https://d2n5s49d9uv0b0.cloudfront.net/utils/functions/sendMessageManifestProvider`,
                      max_response_bytes: Some(2_000_000n),
                      method: {
                          post: null
                      },
                      headers: [{name:'Content-Type', value:'application/json'}],
                      body: body && body?.length > 0 ? Some(
                        Buffer.from(
                            JSON.stringify({
                                method: method,
                                url: url,
                                certPem: certPem,
                                keyPem: keyPem,
                                body: finalBody,
                            }),
                            'utf-8'
                        )
                    ) : Some(
                      Buffer.from(
                          JSON.stringify({
                              method: method,
                              url: url,
                              certPem: certPem,
                              keyPem: keyPem,
                          }),
                          'utf-8'
                      )
                  ),
                      transform: Some({
                          function: [ic.id(), 'transformResponse'] as [Principal, string],
                          context: Uint8Array.from([])
                      })
                  }
              ],
              cycles: 50_000_000_000n
          });
          console.log('success');

          try {
            const responseText = Buffer.from(response.body.buffer).toString('utf-8');
            if (responseText?.length > 0) {
              console.log(JSON.parse(responseText));
              i = 3;
              return JSON.parse(responseText);
            }
          } catch (err) {
            console.log('there is no data to retunr')
          }

      }
    } catch (err: any) {
      console.log(err)
      if (i < 3) {
        console.log("Error, retrying...");
        await wait(6000); // Waiting for 6 sec
      } else {
        console.log('error')
        console.log(err)
        throw new Error(err?.response?.data || err);
      }
    }}
}


export async function sendManifest(url: string, body: string | null, method: string, certPem: any, keyPem: string) {
    console.log(url)
    console.log('body')
    console.log(body)
    console.log('method')
    console.log(method)
    console.log('certPem')
    // console.log(certPem)
    console.log('keyPem')
    console.log(keyPem)
    const finalBody = body ? convertManifest(body) : ''
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
                        url: `https://d2n5s49d9uv0b0.cloudfront.net/utils/functions/sendMessageManifestProvider`,
                        max_response_bytes: Some(2_000_000n),
                        method: {
                            post: null
                        },
                        headers: [{name:'Content-Type', value:'application/json'}],
                        body: body && body?.length > 0 ? Some(
                          Buffer.from(
                              JSON.stringify({
                                  method: method,
                                  url: url,
                                  certPem: certPem,
                                  keyPem: keyPem,
                                  body: finalBody,
                              }),
                              'utf-8'
                          )
                      ) : Some(
                        Buffer.from(
                            JSON.stringify({
                                method: method,
                                url: url,
                                certPem: certPem,
                                keyPem: keyPem,
                            }),
                            'utf-8'
                        )
                    ),
                        transform: Some({
                            function: [ic.id(), 'transformResponse'] as [Principal, string],
                            context: Uint8Array.from([])
                        })
                    }
                ],
                cycles: 50_000_000_000n
            });
            console.log('success');

            try {
              const responseText = Buffer.from(response.body.buffer).toString('utf-8');
              if (responseText?.length > 0) {
                console.log(JSON.parse(responseText));
                i = 3;
                return JSON.parse(responseText);
              }
            } catch (err) {
              console.log('there is no data to retunr')
            }

        }
      } catch (err: any) {
        console.log(err)
        if (i < 3) {
          console.log("Error, retrying...");
          await wait(6000); // Waiting for 6 sec
        } else {
          console.log('deu erro')
          console.log(err)
          throw new Error(err?.response?.data || err);
        }
      }}
}

export async function getSdlByUrl(url: string) {
  let response;
  console.log('calling ', url)
  for (let i = 1; i <= 3; i++) {
    console.log("Try #" + i);
    try {
      if (!response) {
          ic.setOutgoingHttpOptions({
              maxResponseBytes: 2_000_000n,
              cycles: 26_000_000_000n,
              transformMethodName: 'transformResponse'
          });
  
          const response = await ic.call(managementCanister.http_request, {
              args: [
                  {
                      url: `${url}`,
                      max_response_bytes: Some(2_000_000n),
                      method: {
                          get: null
                      },
                      headers: [{name:'Content-Type', value:'application/json'}],
                      body: None,
                      transform: Some({
                          function: [ic.id(), 'transformResponse'] as [Principal, string],
                          context: Uint8Array.from([])
                      })
                  }
              ],
              cycles: 50_000_000_000n
          });
          console.log('success');

          try {
            const responseText = Buffer.from(response.body.buffer).toString('utf-8');
            if (responseText?.length > 0) {
              console.log('res:')
              console.log(JSON.parse(responseText));
              i = 3;
              return JSON.parse(responseText);
            }
          } catch (err) {
            console.log('there is no data to retunr')
          }

      }
    } catch (err: any) {
      console.log(err)
      if (i < 3) {
        console.log("Error, retrying...");
        await wait(6000); // Waiting for 6 sec
      } else {
        console.log('error')
        console.log(err)
        throw new Error(err?.response?.data || err);
      }
    }}
}

export function transformResponse(raw: any): any {
  let res = {
      status: raw.response.status,
      body: raw.response.body,
      headers: []
  };

  if (parseInt(raw.response.status.code) === 200) {
      res.body = raw.response.body;
  } else {
      ic.print(`Received an error from proxy: status = ${raw.response.status.code}, error = ${raw.response.body.toString()}`);
  }

  return res;
}

export async function getProviderUri(providerAddress: string) {
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
                      url: `https://api.cloudmos.io/v1/providers`,
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
          console.log('success');
          console.log(JSON.parse(responseText));
  
          i = 3;
          const myData = JSON.parse(responseText).find((dd: any) => dd.owner === providerAddress);

          if (myData) {
            return myData?.hostUri;
          }
      }
    } catch (err: any) {
      console.log(err)
      if (i < 3) {
        console.log("Error, retrying...");
        await wait(6000); // Waiting for 6 sec
      } else {
        console.log('error')
        console.log(err)
        throw new Error(err?.response?.data || err);
      }
    }}
}