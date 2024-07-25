export interface CertificatePem {
    cert: string;
    publicKey: string;
    privateKey: string;
}
export interface CertificatePemAny {
    cert: any;
    publicKey: string;
    privateKey: string;
}
export interface CertificateInfo {
    hSerial: string;
    sIssuer: string;
    sSubject: string;
    sNotBefore: string;
    sNotAfter: string;
    issuedOn: Date;
    expiresOn: Date;
}
export interface ValidityRangeOptions {
    validFrom?: Date;
    validTo?: Date;
}
export declare class CertificateManager {
    parsePem(certPEM: string): CertificateInfo;
    generatePEM(address: string, options?: ValidityRangeOptions): CertificatePem;
    accelarGeneratePEM(address: string, options?: ValidityRangeOptions): CertificatePemAny;
    accelarGetPEM(cert: any): any;
    private createValidityRange;
    private dateToStr;
    private strToDate;
}