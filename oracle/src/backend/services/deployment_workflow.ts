import { update, text, ic, None, Record, query, int } from 'azle';
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

//token id from the smart-contract deployment
export const newDeployment = update([text], text, async (tokenId: string) => {
    console.log('comecei new deployment')
    const provider = new ethers.JsonRpcProvider(`https://opt-sepolia.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR`);

    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
      provider,
    );
    console.log('get transaction')

    const transaction = await contract.Items(tokenId);

    console.log('tx feita');
    console.log(transaction);
    console.log('retornei');
    console.log(Number(transaction[0]))

    if (Number(transaction[0]) === 0) {
        console.log('token does not exits')
        throw ('token does not exist')
    }
    if (!db.users[transaction[6]]) {
        console.log('user does not exist yet')
        throw ('user does not exist yet')
    }
    if (db.users[transaction[6]]?.akashCertPub?.length === 0) {
        console.log('user needs to create a cert')
        throw ('user needs to create a cert')
    } 

    if (!db.deployments[tokenId]) {
        console.log('deployment nao achado')
        const deployment: Deployment = {
            id: tokenId,
            uri: '',
            akashHashDeployment: '0x',
            status: 'nondeployed',
            userId: transaction[6],
            dseq: '0x'
        };
    
        db.deployments[tokenId] = deployment;
    }
    if (db.deployments[tokenId] && db.deployments[tokenId]?.status !== 'nondeployed') {
        console.log('token is deploying or already been deployed')
        throw ('token is deploying or already been deployed')
    }

    //start deplyoment
    db.deployments[tokenId].status = 'deploying'

    const fromAddress = db.users[transaction[6]].akashAddress
    const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(transaction[6]);

    //create deployment
    console.log('creating deployment')
    const txDeployment = await createDeployment(fromAddress, pubKeyEncoded, transaction[6])
    console.log('passei creating')

    //get bids
    console.log(fromAddress)
    console.log(txDeployment.dseq)
    await wait(60000); // Waiting for bids to come

    const bids = await getBids(fromAddress, txDeployment.dseq);
    const bid = bids.bids[1]?.bid?.bid_id;
    console.log('got bid')

    //create lease
    const txLease = await createLease(fromAddress, pubKeyEncoded, transaction[6], txDeployment.dseq, bid?.gseq, bid?.provider, bid?.oseq)
    console.log('got lease transaction')

    const providerUri = await getProviderUri(bid?.provider)
    console.log('got provider uri')

    const yamlStr = YAML.parse(yamlObj);

    const urlSent = `${providerUri}/deployment/${txDeployment.dseq}/manifest`
    const urlGet = `${providerUri}/lease/${txDeployment.dseq}/${bid?.gseq}/${bid?.oseq}/status`
    console.log('sdl')
    const sdl = getSdl(yamlStr, 'beta3', 'mainnet');
    const mani = sdl.manifest();
    console.log('sending manifgest')

    const finalCert = certificateManager.accelarGetPEM(akashCertGlobal[transaction[6]])
    console.log(finalCert)
    console.log('priv')
    console.log(db.users[transaction[6]]?.akashCertPriv)
    const sentPutManifest = await sendManifest(urlSent, JSON.stringify(mani), 'PUT', finalCert, db.users[transaction[6]]?.akashCertPriv);
    console.log('getting sent get maniges')
    await wait(60000); // Waiting for bids to come
    console.log(urlGet)
    const sentGetManifest = await sendManifest(urlGet, null, 'GET', finalCert, db.users[transaction[6]]?.akashCertPriv);
    console.log(sentGetManifest)
    db.deployments[tokenId].uri = JSON.stringify(sentGetManifest)
    return String('Number(transaction[transaction.length - 1])');
});

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
