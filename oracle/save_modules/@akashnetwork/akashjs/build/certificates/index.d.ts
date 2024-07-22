import { SigningStargateClient } from "@cosmjs/stargate";
import { DeliverTxResponse } from "@cosmjs/stargate/build/stargateclient";
import { CertificateFilter, QueryCertificatesResponse } from "@akashnetwork/akash-api/akash/cert/v1beta3";
import type { pems } from "./generate509";
import type { CertificatePem } from "./certificate-manager/CertificateManager";
export type { pems };
export declare type CertificatePemDeprecated = CertificatePem & {
    csr: string;
};
export declare function broadcastCertificate(pem: Pick<CertificatePem, "cert" | "publicKey">, owner: string, client: SigningStargateClient): Promise<DeliverTxResponse>;
export declare function broadcastCertificate(pem: pems, owner: string, client: SigningStargateClient): Promise<DeliverTxResponse>;
export declare function createCertificate(bech32Address: string): Promise<CertificatePemDeprecated>;
export declare function revokeCertificate(owner: string, serial: string, client: SigningStargateClient): Promise<DeliverTxResponse>;
export declare function queryCertificates(filter: CertificateFilter): Promise<QueryCertificatesResponse>;
