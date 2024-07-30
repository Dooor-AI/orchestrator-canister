import { update, text, ic, None,     Some,
    Record, query, int, Principal } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { getAddressAkashFromEVM, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
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
import { updateContractNewEVM } from './interaction_evm';

//token id from the smart-contract deployment

export async function callRpc(providerUrl: string, jsonValue: any) {

    const response = await ic.call(managementCanister.http_request, {
        args: [
            {
                url: providerUrl,
                max_response_bytes: Some(2_000_000n),
                method: {
                    post: null
                },
                headers: [{name:'Content-Type', value:'application/json'}],
                body: Some(
                  Buffer.from(
                      JSON.stringify(jsonValue),
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
    console.log(JSON.parse(responseText))
    return JSON.parse(responseText)
}