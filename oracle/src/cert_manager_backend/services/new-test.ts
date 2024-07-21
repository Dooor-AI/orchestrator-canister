// random_address.ts

import { update, text, ic } from 'azle';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { MsgCreateCertificate } from '@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert';

//ATTENTION: THIS SCRIPT IS MADE TO CREATE AN AKASH DEPLOYMENT, TO MAKE IT WORK, IT WAS NECESSARY TO CHANGE THE FILE AT node_modules/@akashnetwork/akashjs/build/sdl/SDL/SDL.js, SINCE 
//azle does not accept node:crypto, was installed crypto-js and used in the place of node:crypto.

const akashPubRPC = 'https://akash-rpc.publicnode.com:443';
const defaultInitialDeposit = 500000;


export const createAndStoreCertificateKeys = update([], text, async () => {
    const { cert, publicKey, privateKey } = certificateManager.accelarGeneratePEM('akash1kcd420c946rqa9sdl8qkdpaazpcghxdut0fqaz');

    // globalVar[`crtpem`] = crtpem
    // globalVar[`pubpem`] = pubpem
    // globalVar[`privpem`] = privpem
  
    // console.log(JSON.stringify(crtpem))
    // console.log(JSON.stringify(pubpem))
    // console.log(JSON.stringify(privpem))
  
    return `200`
   })
