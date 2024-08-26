// random_address.ts

import { update, text, ic } from 'azle';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { MsgCreateCertificate } from '@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert';
import {stringify} from 'flatted'
export function createCertificateKeys(akashAddress: string) {
    const { cert, publicKey, privateKey } = certificateManager.accelarGeneratePEM(akashAddress);
    console.log('cert created')
    console.log(stringify(cert))
    return {cert, publicKey, privateKey}
}

export function createCertificateKeys123(akashAddress: string) {
    const { cert, publicKey, privateKey } = certificateManager.accelarGeneratePEM(akashAddress);
    console.log('cert created')
    console.log(stringify(cert))
    return {cert: stringify(cert), publicKey, privateKey}
}
