"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStarGateMessage = exports.createAminoMessage = void 0;
const stargate_1 = require("../stargate");
const FEE = {
    amount: [
        {
            denom: "uakt",
            amount: "2500"
        }
    ],
    gas: "100000"
};
function createAminoMessage(message, messageBody) {
    return {
        typeUrl: message,
        value: messageBody
    };
}
exports.createAminoMessage = createAminoMessage;
function createStarGateMessage(message, messageBody) {
    return {
        message: {
            typeUrl: message,
            value: messageBody
        },
        fee: FEE
    };
}
exports.createStarGateMessage = createStarGateMessage;
