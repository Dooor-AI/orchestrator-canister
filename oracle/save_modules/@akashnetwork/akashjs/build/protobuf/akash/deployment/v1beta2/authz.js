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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositDeploymentAuthorization = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta2";
function createBaseDepositDeploymentAuthorization() {
    return {
        $type: "akash.deployment.v1beta2.DepositDeploymentAuthorization",
        spendLimit: undefined
    };
}
exports.DepositDeploymentAuthorization = {
    $type: "akash.deployment.v1beta2.DepositDeploymentAuthorization",
    encode(message, writer = _m0.Writer.create()) {
        if (message.spendLimit !== undefined) {
            coin_1.Coin.encode(message.spendLimit, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDepositDeploymentAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.spendLimit = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            $type: exports.DepositDeploymentAuthorization.$type,
            spendLimit: isSet(object.spendLimit) ? coin_1.Coin.fromJSON(object.spendLimit) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.spendLimit !== undefined && (obj.spendLimit = message.spendLimit ? coin_1.Coin.toJSON(message.spendLimit) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDepositDeploymentAuthorization();
        message.spendLimit = object.spendLimit !== undefined && object.spendLimit !== null ? coin_1.Coin.fromPartial(object.spendLimit) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.DepositDeploymentAuthorization.$type, exports.DepositDeploymentAuthorization);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
