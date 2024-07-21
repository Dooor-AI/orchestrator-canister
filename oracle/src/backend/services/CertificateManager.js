"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateManager = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const jsrsasign_1 = __importDefault(require("jsrsasign"));
class CertificateManager {
    parsePem(certPEM) {
        const certificate = new jsrsasign_1.default.X509();
        certificate.readCertPEM(certPEM);
        const hSerial = certificate.getSerialNumberHex();
        const sIssuer = certificate.getIssuerString();
        const sSubject = certificate.getSubjectString();
        const sNotBefore = certificate.getNotBefore();
        const sNotAfter = certificate.getNotAfter();
        return {
            hSerial,
            sIssuer,
            sSubject,
            sNotBefore,
            sNotAfter,
            issuedOn: this.strToDate(sNotBefore),
            expiresOn: this.strToDate(sNotAfter)
        };
    }
    async generatePEM(address, options) {
        const { notBeforeStr, notAfterStr } = this.createValidityRange(options);
        const { prvKeyObj, pubKeyObj } = jsrsasign_1.default.KEYUTIL.generateKeypair("EC", "secp256r1");
        const cert = new jsrsasign_1.default.KJUR.asn1.x509.Certificate({
            version: 3,
            serial: { int: Math.floor(new Date().getTime() * 1000) },
            issuer: { str: "/CN=" + address },
            notbefore: notBeforeStr,
            notafter: notAfterStr,
            subject: { str: "/CN=" + address },
            sbjpubkey: pubKeyObj,
            ext: [
                { extname: "keyUsage", critical: true, names: ["keyEncipherment", "dataEncipherment"] },
                {
                    extname: "extKeyUsage",
                    array: [{ name: "clientAuth" }]
                },
                { extname: "basicConstraints", cA: true, critical: true }
            ],
            sigalg: "SHA256withECDSA",
            cakey: prvKeyObj
        });
        const publicKey = jsrsasign_1.default.KEYUTIL.getPEM(pubKeyObj, "PKCS8PUB").replaceAll("PUBLIC KEY", "EC PUBLIC KEY");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const certPEM = cert.getPEM();
        return {
            cert: certPEM,
            publicKey,
            privateKey: jsrsasign_1.default.KEYUTIL.getPEM(prvKeyObj, "PKCS8PRV")
        };
    }
    accelarGeneratePEM(address, options) {
        const { notBeforeStr, notAfterStr } = this.createValidityRange(options);
        const { prvKeyObj, pubKeyObj } = jsrsasign_1.default.KEYUTIL.generateKeypair("EC", "secp256r1");
        const cert = new jsrsasign_1.default.KJUR.asn1.x509.Certificate({
            version: 3,
            serial: { int: Math.floor(new Date().getTime() * 1000) },
            issuer: { str: "/CN=" + address },
            notbefore: notBeforeStr,
            notafter: notAfterStr,
            subject: { str: "/CN=" + address },
            sbjpubkey: pubKeyObj,
            ext: [
                { extname: "keyUsage", critical: true, names: ["keyEncipherment", "dataEncipherment"] },
                {
                    extname: "extKeyUsage",
                    array: [{ name: "clientAuth" }]
                },
                { extname: "basicConstraints", cA: true, critical: true }
            ],
            sigalg: "SHA256withECDSA",
            cakey: prvKeyObj
        });
        const publicKey = jsrsasign_1.default.KEYUTIL.getPEM(pubKeyObj, "PKCS8PUB").replaceAll("PUBLIC KEY", "EC PUBLIC KEY");
        return {cert, publicKey, privateKey: jsrsasign_1.default.KEYUTIL.getPEM(prvKeyObj, "PKCS8PRV")}
    }
    accelarGetPEM(cert) {
        const certPEM = cert.getPEM();
        return {
            cert: certPEM,
        };
    }
    createValidityRange(options) {
        const notBefore = options?.validFrom || new Date();
        const notAfter = options?.validTo || new Date();
        if (!options?.validTo) {
            notAfter.setFullYear(notBefore.getFullYear() + 1);
        }
        const notBeforeStr = this.dateToStr(notBefore);
        const notAfterStr = this.dateToStr(notAfter);
        return { notBeforeStr, notAfterStr };
    }
    dateToStr(date) {
        const year = date.getUTCFullYear().toString().substring(2).padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = date.getUTCDate().toString().padStart(2, "0");
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const secs = date.getUTCSeconds().toString().padStart(2, "0");
        return `${year}${month}${day}${hours}${minutes}${secs}Z`;
    }
    strToDate(str) {
        const year = parseInt(`20${str.substring(0, 2)}`);
        const month = parseInt(str.substring(2, 4)) - 1;
        const day = parseInt(str.substring(4, 6));
        const hours = parseInt(str.substring(6, 8));
        const minutes = parseInt(str.substring(8, 10));
        const secs = parseInt(str.substring(10, 12));
        return new Date(Date.UTC(year, month, day, hours, minutes, secs));
    }
}
exports.CertificateManager = CertificateManager;
