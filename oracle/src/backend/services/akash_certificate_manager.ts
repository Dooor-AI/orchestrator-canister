// random_address.ts

import { update, text, ic } from 'azle';
import { certificateManager } from '@akashnetwork/akashjs/build/certificates/certificate-manager';
import { MsgCreateCertificate } from '@akashnetwork/akashjs/build/protobuf/akash/cert/v1beta3/cert';

export function createCertificateKeys(akashAddress: string) {
    const { cert, publicKey, privateKey } = certificateManager.accelarGeneratePEM(akashAddress);
  
    return {cert, publicKey, privateKey}
}
