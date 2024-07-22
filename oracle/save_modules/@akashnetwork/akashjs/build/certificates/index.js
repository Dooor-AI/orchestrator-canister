"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCertificates = exports.revokeCertificate = exports.createCertificate = exports.broadcastCertificate = void 0;
const pvutils_1 = require("pvutils");
const v1beta3_1 = require("@akashnetwork/akash-api/akash/cert/v1beta3");
const stargate_1 = require("../stargate");
const pbclient_1 = require("../pbclient/pbclient");
const certificate_manager_1 = require("./certificate-manager");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JsonRPC = require("simple-jsonrpc-js");
const jrpc = JsonRPC.connect_xhr("https://bridge.testnet.akash.network/akashnetwork");
async function broadcastCertificate(pem, owner, client) {
    if ("csr" in pem && !("cert" in pem)) {
        console.trace("The `csr` field is deprecated. Use `cert` instead.");
    }
    const certKey = "cert" in pem ? pem.cert : pem.csr;
    const encodedCsr = base64ToUInt((0, pvutils_1.toBase64)(certKey));
    const encdodedPublicKey = base64ToUInt((0, pvutils_1.toBase64)(pem.publicKey));
    const message = (0, pbclient_1.createStarGateMessage)(stargate_1.Message.MsgCreateCertificate, {
        owner: owner,
        cert: encodedCsr,
        pubkey: encdodedPublicKey
    });
    return await client.signAndBroadcast(owner, [message.message], message.fee);
}
exports.broadcastCertificate = broadcastCertificate;
async function createCertificate(bech32Address) {
    const pem = certificate_manager_1.certificateManager.generatePEM(bech32Address);
    return {
        ...pem,
        get csr() {
            console.trace("The `csr` field is deprecated. Use `cert` instead.");
            return pem.cert;
        }
    };
}
exports.createCertificate = createCertificate;
async function revokeCertificate(owner, serial, client) {
    const message = (0, pbclient_1.createStarGateMessage)(stargate_1.Message.MsgRevokeCertificate, {
        id: {
            owner,
            serial
        }
    });
    return await client.signAndBroadcast(owner, [message.message], message.fee);
}
exports.revokeCertificate = revokeCertificate;
async function queryCertificates(filter) {
    const txBodyBytes = v1beta3_1.QueryCertificatesRequest.encode(v1beta3_1.QueryCertificatesRequest.fromJSON({
        filter
    })).finish();
    return v1beta3_1.QueryCertificatesResponse.decode(base64ToUInt((await jrpc.call("abci_query", {
        height: "0",
        path: "/akash.cert.v1beta1.Query/Certificates",
        prove: false,
        data: bufferToHex(txBodyBytes)
    })).response.value));
}
exports.queryCertificates = queryCertificates;
function base64ToUInt(base64) {
    if (typeof window !== "undefined") {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }
    return Buffer.from(base64, "base64");
}
function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}
