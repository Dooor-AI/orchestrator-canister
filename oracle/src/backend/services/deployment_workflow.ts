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
import { db, getAkashAddress } from './user';

//token id from the smart-contract deployment
export const newDeployment = update([text], text, async (tokenId: string) => {
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
            akashPubEncod: String(res.pubEncod),
            nonce: "0",
            akashCert: '',
            akashCertPriv: '',
            akashCertPub: '',
        };
    
        db.users[recoveredAddress] = user;
        
        return 'user';
    } else {
        return ''
    }
});

