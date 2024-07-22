"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMsgClient = exports.getQueryClient = exports.getRpc = void 0;
const stargate_1 = require("@cosmjs/stargate");
const stargate_2 = require("../stargate");
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
async function getRpc(endpoint) {
    return getQueryClient(endpoint);
}
exports.getRpc = getRpc;
async function getQueryClient(endpoint) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(endpoint);
    const queryClient = new stargate_1.QueryClient(tmClient);
    return (0, stargate_1.createProtobufRpcClient)(queryClient);
}
exports.getQueryClient = getQueryClient;
async function getMsgClient(endpoint, signer) {
    const msgRegistry = new proto_signing_1.Registry((0, stargate_2.getAkashTypeRegistry)());
    const options = {
        prefix: "akash",
        registry: msgRegistry,
        gasPrice: stargate_1.GasPrice.fromString("0.025uakt")
    };
    return stargate_1.SigningStargateClient.connectWithSigner(endpoint, signer, options);
}
exports.getMsgClient = getMsgClient;
