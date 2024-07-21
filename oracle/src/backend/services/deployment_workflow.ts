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
import { Deployment, db, getAkashAddress } from './user';
import { chainRPC, contractAddress, dplABI } from './constants';

//token id from the smart-contract deployment
export const newDeployment = update([text], text, async (tokenId: string) => {
    const provider = new ethers.JsonRpcProvider(chainRPC);

    // Crie uma instância do contrato usando apenas o provider
    const contract = new ethers.Contract(
      contractAddress,
      dplABI,
      provider,
    );

    // Chame a função do contrato para obter todos os IDs de NFT
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
    if (db.users[transaction[6]]?.akashCert?.length === 0) {
        console.log('user needs to create a cert')
        throw ('user needs to create a cert')
    } 

    if (!db.deployments[tokenId]) {
        const deployment: Deployment = {
            id: tokenId,
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

    //create deployment
    

    // Retorne o último ID de NFT
    return String('Number(transaction[transaction.length - 1])');
});

