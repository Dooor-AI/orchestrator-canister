import { update, text, ic, None, Record, bool, query, int } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import { ethers } from 'ethers';
import { getAddressAkashFromEVM, getEcdsaPublicKeyBase64, getEcdsaPublicKeyBase64FromEVM } from './get_address_akash';
import { createCertificateAkash } from './certificate';
import { createCertificateKeys } from './akash_certificate_manager';
import {parse} from 'flatted'
import { getBids, getHttpRequest, sendManifest, sendManifestProvisorio } from './external_https';
import { akashProviderUrl } from './constants';

const yamlObj = ``;

const User = Record({
    id: text, // evm address
    akashAddress: text, // the akash address
    akashPubEncod: text,
    nonce: text,
    akashCertPub: text, // akash certificate pubkey - base64 (optional)
    akashCertPriv: text, // akash certificate private key - base64 (optional)
});

type User = typeof User.tsType;

const Funding = Record({
    id: text, // funding id
    deploymentId: text, // deployment id
    status: text, // nondeployed, deploying, deployed
    value: text,
});
export type Funding = typeof Funding.tsType;


const ToaaAkash = Record({
    id: text, // evm address
    akashAddress: text, // the akash address
    akashPubEncod: text,
    nonce: text,
    akashCertPub: text, // akash certificate pubkey - base64 (optional)
    akashCertPriv: text, // akash certificate private key - base64 (optional)
    akashCertDeployed: bool, // akash certificate pubkey - base64 (optional)
});
export type ToaaAkash = typeof ToaaAkash.tsType;


const Deployment = Record({
    id: text, // evm address
    status: text, // nondeployed, deploying, deployed
    uri: text,
    akashHashDeployment: text,
    dseq: text,
    gseq: text,
    oseq: text,
    provider: text,
    userId: text, // akash certificate - base64 (optional)
});

export type Deployment = typeof Deployment.tsType;

type Db = {
    users: {
        [id: string]: User;
    },
    deployments: {
        [id: string]: Deployment
    },
    fundings: {
        [id: string]: Funding
    },
    toaaAkash: {
        [id: string]: ToaaAkash
    }
};

export let db: Db = {
    users: {},
    deployments: {},
    fundings: {},
    toaaAkash: {}
};

// certPem and certPubpem as base64
export const createUser = update([text], text, async (signatureHex: string) => {
    const message = 'create-akash-address';
    const messageHash = ethers.hashMessage(message); // Updated to v6
    const recoveredAddress = ethers.recoverAddress(messageHash, signatureHex); // Updated to v6
    console.log('the address recovered:');
    console.log(recoveredAddress);

    if (!db.users[recoveredAddress]) {
        const res = await getAkashAddress(recoveredAddress);
    
        const user: User = {
            id: recoveredAddress,
            akashAddress: res.akashAddress,
            akashPubEncod: JSON.stringify(res.pubEncod),
            nonce: "0",
            akashCertPriv: '',
            akashCertPub: '',
        };
    
        db.users[recoveredAddress] = user;
        
        return 'user 1';
    } else {
        return ''
    }
});

export let akashCertGlobal: any = {};

// certPem and certPubpem as base64
export const getNewAkashCertificate = update([text, text], text, async (signatureHex: string, nonce: text) => {
    const message = 'update-akash-address' + nonce;
    const messageHash = ethers.hashMessage(message);
    const recoveredAddress = ethers.recoverAddress(messageHash, signatureHex);

    if (!db.users[recoveredAddress]) {
        throw ('User does not exist');
    }
    if (Number(db.users[recoveredAddress].nonce) + 1 !== Number(nonce)) {
        throw ('Invalid nonce');
    }

    console.log('the address recovered123:');
    console.log(recoveredAddress);
    console.log('the akash:');
    console.log(db.users[recoveredAddress].akashAddress);

    const keys = createCertificateKeys(db.users[recoveredAddress].akashAddress);
    akashCertGlobal[recoveredAddress] = keys.cert
    db.users[recoveredAddress].akashCertPub = (keys.publicKey);
    db.users[recoveredAddress].akashCertPriv = (keys.privateKey);
    db.users[recoveredAddress].nonce = JSON.stringify(Number(db.users[recoveredAddress].nonce) + 1);

    // console.log('akashCert:');
    // console.log(keys.cert);
    // console.log('akashCert:');
    // console.log(keys.publicKey);
    // console.log('akashCert:');
    // console.log(keys.privateKey);
    return 'done';
});

export const getAkashHeight = update([], text, async () => {
    const url  = `${akashProviderUrl}/status`
    const res = await getHttpRequest(url, 2_000_000n, 20_000_000_000n)
    console.log('res aqui height')
    console.log(res)
    return String(res?.result?.sync_info?.latest_block_height)
});

// returns akash address from evm address
export const getAkashAddressEnd = query([text], text, async (evmAddress: string) => {
    const res = await getAkashAddress(evmAddress);
    return res.akashAddress;
});

// returns akash address from evm address
export const getPubKey = query([], text, async () => {
    const res = await getEcdsaPublicKeyBase64();
    console.log(res)
    return String(res);
});


export const getBidsEnd = update([text, text], text, async (owner, dseq) => {
    const res = await getBids(owner, dseq)
    return JSON.stringify(res);
});

export const sendManifestEnd = update([text, text], text, async (owner, dseq) => {
    const res = await sendManifestProvisorio(`owner`, `dseq`, 'PUT', 'certpem', 'keypem')
    return JSON.stringify(res);
});

//pass the deploymentId
export const getDeployment = update([text], text, async (tokenId) => {
    return JSON.stringify(db.deployments[tokenId]);
});

export const returnDeployment = query([text], text, async (tokenId: string) => {
    console.log('return deployment')
    console.log(JSON.stringify(db.deployments[tokenId]))
    return JSON.stringify(db.deployments[tokenId]);
});

export const userExist = query([text], text, async (evmAddress: string) => {
    console.log('return deployment')
    console.log(JSON.stringify(db.users[evmAddress]))
    return JSON.stringify(db.users[evmAddress]?.id?.length > 0);
});

// returns akash address from evm address
export async function getAkashAddress(evmAddress: string) {
    const akashAddress = await getAddressAkashFromEVM(evmAddress);
    const pubEncod = await getEcdsaPublicKeyBase64FromEVM(evmAddress);
    console.log('the pub encoded')
    console.log(pubEncod)

    return { akashAddress, pubEncod };
};
