import { update, text, ic, None, Record } from 'azle';
import { encodePubkey, makeSignBytes } from "@cosmjs/proto-signing";
const crypto = require('crypto');
const { bech32 } = require('bech32');
import { managementCanister } from 'azle/canisters/management';
import { fromHex, toBase64, toHex } from "@cosmjs/encoding";
import {ethers} from 'ethers'
const yamlObj = `
`

const User = Record({
    id: text, // evm address
    akashAddress: text, // the akash address
    akashCertpem: text, // akash certificate - base64
    akashCertPubpem: text, // the akash certificate pub key - base64
    akashCertPrivpem: text // the akash certificate priv key - base64
});

type User = typeof User.tsType;

type Db = {
    users: {
        [id: string]: User;
    };
};

let db: Db = {
    users: {}
};

// certPem and certPubpem as base64
export const updateAkashAddress = update([text, text, text], User, (certPem: string, certPubpem: string, signatureHex: string) => {
    const message = 'update-akash-address' + certPem + certPubpem
    const messageHash = ethers.utils.hashMessage(message);
    const recoveredAddress = ethers.utils.recoverAddress(messageHash, signatureHex);
    console.log('the address recovered:')
    console.log(recoveredAddress)

    const id = Object.keys(db.users).length.toString();
    const user: User = {
        id,
        username
    };

    db.users[id] = user;

    return user;
})

