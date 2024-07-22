"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointsSorted = exports.getEndpoints = exports.getMetadata = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const perf_hooks_1 = require("perf_hooks");
const util_1 = require("../util");
// TODO: this should probably be cached to avoid pulling for every request
async function getMetadata(network) {
    return (0, node_fetch_1.default)(`https://raw.githubusercontent.com/ovrclk/net/master/${network}/meta.json`).then(res => res.json());
}
exports.getMetadata = getMetadata;
function getEndpoints(network, type) {
    return getMetadata(network).then(meta => meta.apis[type]);
}
exports.getEndpoints = getEndpoints;
function getEndpointsSorted(network, type) {
    return getEndpoints(network, type)
        .then((0, util_1.map)(getEndpointHealthStatus(800)))
        .then(util_1.awaitAll)
        .then((0, util_1.filter)(isNodeResponsive))
        .then((0, util_1.sortBy)((0, util_1.prop)("responseTime")));
}
exports.getEndpointsSorted = getEndpointsSorted;
function isNodeResponsive(endpoint) {
    return endpoint.responseTime !== null;
}
function getEndpointHealthStatus(timeout) {
    return ({ address }) => {
        const startTime = perf_hooks_1.performance.now();
        return (0, node_fetch_1.default)(`${address}/node_info`, { timeout })
            .then(() => ({
            address,
            responseTime: Math.floor(perf_hooks_1.performance.now() - startTime)
        }))
            .catch(() => ({
            address,
            responseTime: null
        }));
    };
}
