"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.getSigner = exports.getChains = void 0;
const stargate_1 = require("../stargate");
const stargate_2 = require("@cosmjs/stargate");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_3 = require("@cosmjs/stargate");
const v1beta2_1 = require("@akashnetwork/akash-api/akash/cert/v1beta2");
function getChains() {
    return {
        mainnet: {
            id: "akashnet-2",
            name: "Akash Mainnet",
            messagePath: "v1beta2"
        },
        testnet: { id: "testnet-1", name: "Akash Testnet", messagePath: "v1beta2" }
    };
}
exports.getChains = getChains;
function getSigner(chain) {
    return window.getOfflineSignerAuto(chain.id);
}
exports.getSigner = getSigner;
async function get(chain, signer, endPoint) {
    const customAminoTypes = new stargate_3.AminoTypes({
        "/akash.cert.v1beta2.MsgCreateCertificate": {
            aminoType: "cert/cert-create-certificate",
            toAmino: ({ cert, pubkey }) => {
                const buf = v1beta2_1.Certificate.encode(v1beta2_1.Certificate.fromPartial({
                    cert,
                    pubkey
                })).finish();
                const encoded = Buffer.from(buf);
                return encoded.toString("base64");
            },
            fromAmino: ({ cert, pubkey }) => {
                return v1beta2_1.Certificate.fromPartial({
                    cert,
                    pubkey
                });
            }
        }
    });
    const myRegistry = new proto_signing_1.Registry([...stargate_2.defaultRegistryTypes, ...(0, stargate_1.getAkashTypeRegistry)()]);
    return await stargate_2.SigningStargateClient.connectWithSigner(endPoint, signer, {
        registry: myRegistry,
        aminoTypes: customAminoTypes
    });
}
exports.get = get;
