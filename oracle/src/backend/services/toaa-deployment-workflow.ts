import { update, text, ic, None, Record, query, int } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { getAddressAkash, getAddressAkashFromEVM, getEcdsaPublicKeyBase64, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { createCertificateAkash } from './certificate';
import { createCertificateKeys } from './akash_certificate_manager';
import { Deployment, Funding, db, getAkashAddress } from './user';
import { chainRPC, contractAddress, dplABI, providerUrl } from './constants';
import { createDeployment, createLease, fundDeployment, fundDeploymentTesting, getAccountNumberAndSequence, newCloseDeployment, transferAkashTokensProvisorio } from './deployment_akash_3';
import { getBids, getHttpRequest, getProviderUri, getSdlByUrl, sendManifest, sendManifestTest } from './external_https';
import { yamlObj } from './deployment_akash';
import * as YAML from 'yaml';
import { v2Sdl } from '@akashnetwork/akashjs/build/sdl/types';
import { SDL } from '@akashnetwork/akashjs/build/sdl';
import { NetworkId } from '@akashnetwork/akashjs/build/types/network';
import { wait } from './timer';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { getCanisterEVMAddress, updateContractNewEVM } from './interaction_evm';
import { callRpc } from './evm_rpc_interaction';
import { deploy } from 'azle/test';
import { getCoreDaoAkashPrice, getEthAkashPrice } from './prices';
import { akashCertGlobal } from './toaa';

//token id from the smart-contract deployment
export const newDeployment = update([text], text, async (tokenId: string) => {
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
    // if (db.deployments[tokenId] && db.deployments[tokenId]?.status !== 'nondeployed') {
    //     console.log('token is deploying or already been deployed')
    //     throw ('token is deploying or already been deployed')
    // }

    //start deplyoment
    db.deployments[tokenId].status = 'deploying-deployment'

    const deploymentValue = Number(transaction[7])

    const akashByEth = await getEthAkashPrice()

    let akashToken = ((deploymentValue * akashByEth) / 10 ** 18)

    akashToken = akashToken * 10 ** 6 //transforming in aukt

    akashToken = akashToken - 20000 - 87500 - 1000 //subtract the ddployment fee and the lease fee and fee for service (1000 aukt)
    
    console.log('akash tkn')
    console.log(akashToken)

    // should not allow less of 500000 - now just for tests.
    //  if (!akashToken || akashToken < 500000) {

    if (!akashToken) {
        console.log('have no akash tokens enough')
        throw ('have no akash tokens enough')
    }

    const fromAddress = db.toaaAkash['0x'].akashAddress
    const evmAddress = await getCanisterEVMAddress()

    const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evmAddress);

    const sdlUri = transaction[3]
    const yamlParsed = await getSdlByUrl(sdlUri)
    console.log('value from api')
    console.log(yamlParsed)

    //create deployment
    console.log('creating deployment')
    const txDeployment = await createDeployment(fromAddress, yamlParsed, pubKeyEncoded, evmAddress, akashToken)

    db.deployments[tokenId].status = 'deploying-lease'
    db.deployments[tokenId].dseq = txDeployment.dseq
    console.log('passei creating')

    //get bids
    console.log(fromAddress)
    console.log(txDeployment.dseq)
    await wait(60000); // Waiting for bids to come

    // LEASE
    const bid = await deploymentCreateLease(tokenId, fromAddress, txDeployment.dseq, pubKeyEncoded, evmAddress)
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
    const sentGetManifest = await deploymentGetSendManifestProvider(yamlParsed,bid?.gseq, bid?.oseq, bid?.provider, txDeployment.dseq, evmAddress)
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
    return JSON.stringify(db.deployments[tokenId]);
});


export const transferAkashTokensProvisorioEnd = update([text, text], text, async (toAddress, amount) => {
  const fromAddress = db.toaaAkash['0x'].akashAddress
  const evmAddress = await getCanisterEVMAddress()

  const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evmAddress);

  const res = await transferAkashTokensProvisorio(fromAddress, pubKeyEncoded, evmAddress, amount, toAddress)
  return JSON.stringify(res)
})

export const testEvmInteraction = update([text], text, async () => {
  await updateContractNewEVM(2, 'txDeployment.hash')
  return 'w'
})

export const getEthAkashPriceEnd = update([], text, async () => {
  const value = await getEthAkashPrice()
  return String(value)
})

export const getAccountInfo = update([text], text, async (fromAddress: string) => {
  const value = await getAccountNumberAndSequence(fromAddress);
  return JSON.stringify(value)
})

export const getHttpTest = update([text], text, async (url: string) => {
  const value = await getHttpRequest(url, 2_000_000n, 21_000_000_000n)    
  return JSON.stringify(value)
})

export const getCoreDaoAkashPriceEnd = update([], text, async () => {
  const value = await getCoreDaoAkashPrice()
  return String(value)
})

export const closeDeployment = update([text], text, async (tokenId: string) => {
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
  if (transaction[4] === false) {
      console.log('deployment is already closed')
      throw ('deployment is already closed')
  } 

  if (db.deployments[tokenId] && db.deployments[tokenId]?.status !== 'deployed') {
      console.log('token is deploying or not been deployed')
      throw ('token is deploying or not been deployed')
  }

  //start deplyoment
  db.deployments[tokenId].status = 'closing'

  const deploymentValue = Number(transaction[7])

  const akashByEth = await getEthAkashPrice()

  let akashToken = ((deploymentValue * akashByEth) / 10 ** 18)

  akashToken = akashToken * 10 ** 6 //transforming in aukt

  
  akashToken = akashToken - 87500 //subtract the closing fee

  // UNCOMMENT THIS FOR PROD
  // if (akashToken < 0) {
  //     console.log('have no akash tokens enough')
  //     throw ('have no akash tokens enough')
  // }

  const fromAddress = db.toaaAkash['0x'].akashAddress
  const evmAddress = await getCanisterEVMAddress()

  const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evmAddress);

  console.log('closing deployment')
  const txDeployment = await newCloseDeployment(fromAddress, pubKeyEncoded, transaction[6], db.deployments[tokenId].dseq)

  db.deployments[tokenId].status = 'closedDeployment'
  return String('Closed');
});

export const closeDeploymentProvisorio = update([text, text], text, async (tokenId: string, dseq: string) => {
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

  const fromAddress = db.toaaAkash['0x'].akashAddress
  const evmAddress = await getCanisterEVMAddress()

  const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evmAddress);

  console.log('closing deployment')
  const txDeployment = await newCloseDeployment(fromAddress, pubKeyEncoded, evmAddress, dseq)

  return String('Closed');
});


export const manageFundDeployment = update([text, text], text, async (tokenId: string) => {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const contract = new ethers.Contract(
    contractAddress,
    dplABI,
    provider,
  );
  // const transaction = await contract.Items(tokenId);

  const functionSignature = 'Fundings(uint256)';
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
      console.log('funding does not exits')
      throw ('funding does not exist')
  }
  const deploymentId = String(Number(transaction[1]))

  if (db.deployments[deploymentId].status === 'closedDeployment') {
      console.log('deployment is already closed')
      throw ('deployment is already closed')
  } 
  if (!db.deployments[deploymentId]) {
      console.log('deployment do not exist')
      throw ('deployment do not exist')
  }
  if (db.fundings[tokenId].status === 'executed' || db.fundings[tokenId].status === 'executing') {
    console.log('deployment already executed')
    throw ('deployment already executed')
  }
  if (!db.fundings[tokenId]) {
    console.log('funding nao achado')
    const funding: Funding = {
        id: tokenId,
        deploymentId: deploymentId,
        status: 'nonExecuted',
        value: String(Number(transaction[2]))
    };

    db.fundings[tokenId] = funding;
  }
  if (db.fundings[tokenId] && db.fundings[tokenId]?.status !== 'nonExecuted') {
      console.log('token is executing or already been executed')
      throw ('token is executing or already been executed')
  }

  //start deplyoment
  db.fundings[tokenId].status = 'executing'

  const deploymentValue = Number(transaction[2])

  const akashByEth = await getEthAkashPrice()

  let akashToken = ((deploymentValue * akashByEth) / 10 ** 18)

  akashToken = akashToken * 10 ** 6 //transforming in aukt

  akashToken = akashToken - 87500 //subtract the closing fee

  //UNCOMMENT THIS FOR PRODUCTION
  // if (akashToken < 0) {
  //     console.log('have no akash tokens enough')
  //     throw ('have no akash tokens enough')
  // }

  const userId = db.deployments[deploymentId].userId

  const fromAddress = db.toaaAkash['0x'].akashAddress
  const evmAddress = await getCanisterEVMAddress()

  const pubKeyEncoded = await getEcdsaPublicKeyBase64FromEVM(evmAddress);

  console.log('executing the fund deployment')
  console.log(db.deployments[deploymentId]?.dseq)
  console.log(db.deployments[tokenId]?.dseq) 
  console.log(String(Number(transaction[2])))

  console.log('closing deployment')
  console.log(fromAddress)
  const txDeployment = await fundDeployment(fromAddress, pubKeyEncoded, evmAddress, db.deployments[deploymentId]?.dseq, String(akashToken))

  return String('Closed');
});

export const fundDeploymentTest = update([text, text, text], text, async (fromAddressOwner: string, dseq: string, deposit: string) => {
  const fromAddress = await getAddressAkash();
  const pubKeyEncoded = await getEcdsaPublicKeyBase64();

  const txDeployment = await fundDeploymentTesting(fromAddress, fromAddressOwner, pubKeyEncoded, dseq, deposit)

  return String('Closed');
});

export async function deploymentCreateLease(tokenId: string, fromAddress: string, dseq: string, pubKeyEncoded: any, transaction: any) {
  const bids = await getBids(fromAddress, dseq);
  const bid = bids.bids[5]?.bid?.bid_id;
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

  const finalCert = certificateManager.accelarGetPEM(akashCertGlobal['0x'])
  console.log(finalCert)
  console.log('priv')
  console.log(db.toaaAkash['0x']?.akashCertPriv)
  const sentPutManifest = await sendManifest(urlSent, JSON.stringify(mani), 'PUT', finalCert, db.toaaAkash['0x']?.akashCertPriv);
  console.log('getting sent get maniges')
  await wait(60000); // Waiting for bids to come
  console.log(urlGet)
  const sentGetManifest = await sendManifest(urlGet, null, 'GET', finalCert, db.toaaAkash['0x']?.akashCertPriv);
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
