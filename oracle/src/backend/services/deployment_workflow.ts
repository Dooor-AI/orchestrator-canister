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
import { getBids, getProviderUri, getSdlByUrl, sendManifest, sendManifestTest } from './external_https';
import { yamlObj } from './deployment_akash';
import * as YAML from 'yaml';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import { wait } from './timer';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { updateContractNewEVM } from './interaction_evm';
import { callRpc } from './evm_rpc_interaction';

//token id from the smart-contract deployment
export const newDeployment = update([text], text, async (tokenId: string) => {
    const providerUrl = 'https://opt-sepolia.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR'
    const provider = new ethers.JsonRpcProvider(providerUrl);

    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
      provider,
    );
    // const transaction = await contract.Items(tokenId);

    const functionSignature = 'Items(uint256)';
    const data = contract.interface.encodeFunctionData(functionSignature, [tokenId]);
    const jsonValue = {
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{
          to: contractAddress,
          data: data
        }, "latest"],
        id: 1
      };
    
    const resTransaction = await callRpc(providerUrl, jsonValue)
    const transaction = (contract.interface.decodeFunctionResult(functionSignature, resTransaction.result))

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
            dseq: '0x',
            gseq: '0x',
            oseq: '0x',
            provider: '0x',
        };
    
        db.deployments[tokenId] = deployment;
    }
    if (db.deployments[tokenId] && db.deployments[tokenId]?.status !== 'nondeployed') {
        console.log('token is deploying or already been deployed')
        throw ('token is deploying or already been deployed')
    }

    //start deplyoment
    db.deployments[tokenId].status = 'deploying-deployment'

    const fromAddress = db.users[transaction[6]].akashAddress
    const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(transaction[6]);

    const sdlUri = transaction[3]
    const yamlParsed = await getSdlByUrl(sdlUri)
    console.log('value from api')
    console.log(yamlParsed)
    return ''
    //create deployment
    console.log('creating deployment')
    const txDeployment = await createDeployment(fromAddress, yamlParsed, pubKeyEncoded, transaction[6])

    db.deployments[tokenId].status = 'deploying-lease'
    db.deployments[tokenId].dseq = txDeployment.dseq
    console.log('passei creating')

    //get bids
    console.log(fromAddress)
    console.log(txDeployment.dseq)
    await wait(60000); // Waiting for bids to come

    // LEASE
    const bid = await deploymentCreateLease(tokenId, fromAddress, txDeployment.dseq, pubKeyEncoded, transaction[6])
    // const bids = await getBids(fromAddress, txDeployment.dseq);
    // const bid = bids.bids[1]?.bid?.bid_id;
    // console.log('got bid')

    // //create lease
    // const txLease = await createLease(fromAddress, pubKeyEncoded, transaction[6], txDeployment.dseq, bid?.gseq, bid?.provider, bid?.oseq)
    // console.log('got lease transaction')
    // db.deployments[tokenId].status = 'deploying-sendManifest'
    // db.deployments[tokenId].provider = bid?.provider
    // db.deployments[tokenId].gseq = bid?.gseq
    // db.deployments[tokenId].oseq = bid?.oseq

    //LEASE 
    console.log('now sent get manifest')

    //MANIFEST
    const sentGetManifest = await deploymentGetSendManifestProvider(yamlParsed,bid?.gseq, bid?.oseq, bid?.provider, txDeployment.dseq, transaction[6])
    // const providerUri = await getProviderUri(bid?.provider)
    // console.log('got provider uri')

    // const yamlStr = YAML.parse(yamlObj);

    // const urlSent = `${providerUri}/deployment/${txDeployment.dseq}/manifest`
    // const urlGet = `${providerUri}/lease/${txDeployment.dseq}/${bid?.gseq}/${bid?.oseq}/status`
    // console.log('sdl')
    // const sdl = getSdl(yamlStr, 'beta3', 'mainnet');
    // const mani = sdl.manifest();
    // console.log('sending manifgest')

    // const finalCert = certificateManager.accelarGetPEM(akashCertGlobal[transaction[6]])
    // console.log(finalCert)
    // console.log('priv')
    // console.log(db.users[transaction[6]]?.akashCertPriv)
    // const sentPutManifest = await sendManifest(urlSent, JSON.stringify(mani), 'PUT', finalCert, db.users[transaction[6]]?.akashCertPriv);
    // console.log('getting sent get maniges')
    // await wait(60000); // Waiting for bids to come
    // console.log(urlGet)
    // const sentGetManifest = await sendManifest(urlGet, null, 'GET', finalCert, db.users[transaction[6]]?.akashCertPriv);
    // console.log(sentGetManifest)
    //MANIFEST
    console.log('now sent get manifest')

    db.deployments[tokenId].uri = JSON.stringify(sentGetManifest)
    db.deployments[tokenId].status = 'deploying-updateContractEVM'

    console.log(sentGetManifest)
    //interacting with the smart-contract
    await updateContractNewEVM(Number(tokenId), txDeployment.hash)

    db.deployments[tokenId].status = 'deployed'
    return String('Number(transaction[transaction.length - 1])');
});

export async function deploymentCreateLease(tokenId: string, fromAddress: string, dseq: string, pubKeyEncoded: any, transaction: any) {
  const bids = await getBids(fromAddress, dseq);
  const bid = bids.bids[1]?.bid?.bid_id;
  console.log('got bid')

  //create lease
  const txLease = await createLease(fromAddress, pubKeyEncoded, transaction, dseq, bid?.gseq, bid?.provider, bid?.oseq)
  console.log('got lease transaction')
  db.deployments[tokenId].status = 'deploying-sendManifest'
  db.deployments[tokenId].provider = bid?.provider
  db.deployments[tokenId].gseq = bid?.gseq
  db.deployments[tokenId].oseq = bid?.oseq

  return bid
}

export async function deploymentGetSendManifestProvider(yamlParsed: any, gseq: string, oseq: string, provider: string, dseq: string, transaction: any) {
  const providerUri = await getProviderUri(provider)
  console.log('got provider uri')

  const urlSent = `${providerUri}/deployment/${dseq}/manifest`
  const urlGet = `${providerUri}/lease/${dseq}/${gseq}/${oseq}/status`
  console.log('sdl')
  const sdl = getSdl(yamlParsed, 'beta3', 'mainnet');
  const mani = sdl.manifest();
  console.log('sending manifgest')

  const finalCert = certificateManager.accelarGetPEM(akashCertGlobal[transaction])
  console.log(finalCert)
  console.log('priv')
  console.log(db.users[transaction]?.akashCertPriv)
  const sentPutManifest = await sendManifest(urlSent, JSON.stringify(mani), 'PUT', finalCert, db.users[transaction]?.akashCertPriv);
  console.log('getting sent get maniges')
  await wait(60000); // Waiting for bids to come
  console.log(urlGet)
  const sentGetManifest = await sendManifest(urlGet, null, 'GET', finalCert, db.users[transaction]?.akashCertPriv);
  console.log(sentGetManifest)
  return sentGetManifest
}

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
