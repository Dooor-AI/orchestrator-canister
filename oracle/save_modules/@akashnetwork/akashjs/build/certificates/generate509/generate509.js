"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const pvutils_1 = require("pvutils");
const asn1js = __importStar(require("asn1js"));
global.crypto = require("node:crypto");
const { getCrypto, getAlgorithmParameters, AttributeTypeAndValue, Certificate, BasicConstraints, Extension, ExtKeyUsage
// eslint-disable-next-line @typescript-eslint/no-var-requires
 } = require("pkijs/build");
const HASH_ALG = "SHA-256";
const SIGN_ALG = "ECDSA";
async function create(address) {
    // get crypto handler
    const crypto = getCrypto();
    // get algo params
    const algo = getAlgorithmParameters(SIGN_ALG, "generatekey");
    const keyPair = await crypto.generateKey(algo.algorithm, true, algo.usages);
    const cert = await createCSR(keyPair, HASH_ALG, {
        commonName: address
    });
    setValidityPeriod(cert, new Date(), 365); // Good from today for 365 days
    const certBER = cert.toSchema(true).toBER(false);
    const spki = await crypto.exportKey("spki", keyPair.privateKey);
    const pkcs8 = await crypto.exportKey("pkcs8", keyPair.privateKey);
    return {
        csr: `-----BEGIN CERTIFICATE-----\n${formatPEM((0, pvutils_1.toBase64)((0, pvutils_1.arrayBufferToString)(certBER)))}\n-----END CERTIFICATE-----`,
        privateKey: `-----BEGIN PRIVATE KEY-----\n${formatPEM((0, pvutils_1.toBase64)((0, pvutils_1.arrayBufferToString)(pkcs8)))}\n-----END PRIVATE KEY-----`,
        publicKey: `-----BEGIN EC PUBLIC KEY-----\n${formatPEM((0, pvutils_1.toBase64)((0, pvutils_1.arrayBufferToString)(spki)))}\n-----END EC PUBLIC KEY-----`
    };
}
exports.create = create;
async function createCSR(keyPair, hashAlg, { commonName }) {
    const cert = new Certificate();
    cert.version = 2;
    cert.serialNumber = new asn1js.Integer({ value: Date.now() });
    cert.issuer.typesAndValues.push(new AttributeTypeAndValue({
        type: "2.5.4.3",
        value: new asn1js.PrintableString({
            value: commonName
        })
    }));
    cert.subject.typesAndValues.push(new AttributeTypeAndValue({
        type: "2.5.4.3",
        value: new asn1js.PrintableString({
            value: commonName
        })
    }));
    cert.attributes = [];
    cert.extensions = [];
    //region "KeyUsage" extension
    const bitArray = new ArrayBuffer(1);
    const bitView = new Uint8Array(bitArray);
    bitView[0] |= 0x10; //data encypherment
    bitView[0] |= 0x20; //key Encipherment
    const keyUsage = new asn1js.BitString({ valueHex: bitArray });
    cert.extensions.push(new Extension({
        extnID: "2.5.29.15",
        critical: true,
        extnValue: keyUsage.toBER(false),
        parsedValue: keyUsage // Parsed value for well-known extensions
    }));
    //endregion
    //region Extended Key Usage
    const extKeyUsage = new ExtKeyUsage({
        keyPurposes: [
            "1.3.6.1.5.5.7.3.2" // id-kp-clientAuth
        ]
    });
    cert.extensions.push(new Extension({
        extnID: "2.5.29.37",
        extnValue: extKeyUsage.toSchema().toBER(false),
        parsedValue: extKeyUsage // Parsed value for well-known extensions
    }));
    //endregion
    //region "BasicConstraints" extension
    const basicConstr = new BasicConstraints({
        cA: false
    });
    cert.extensions.push(new Extension({
        extnID: "2.5.29.19",
        critical: true,
        extnValue: basicConstr.toSchema().toBER(false),
        parsedValue: basicConstr // Parsed value for well-known extensions
    }));
    //endregion
    await cert.subjectPublicKeyInfo.importKey(keyPair.publicKey);
    await cert.sign(keyPair.privateKey, hashAlg);
    return cert;
}
// add line break every 64th character
function formatPEM(pemString) {
    return pemString.replace(/(.{64})/g, "$1\n");
}
function setValidityPeriod(cert, startDate, durationInDays) {
    // Normalize to midnight
    const start = new Date(startDate);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    const end = new Date(start.getTime() + durationInDays * 24 * 60 * 60 * 1000);
    cert.notBefore.value = start;
    cert.notAfter.value = end;
}
