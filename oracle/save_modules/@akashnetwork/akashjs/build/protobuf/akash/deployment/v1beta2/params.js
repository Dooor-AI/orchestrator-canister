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
exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta2";
function createBaseParams() {
    return {
        $type: "akash.deployment.v1beta2.Params",
        deploymentMinDeposit: undefined
    };
}
exports.Params = {
    $type: "akash.deployment.v1beta2.Params",
    encode(message, writer = _m0.Writer.create()) {
        if (message.deploymentMinDeposit !== undefined) {
            coin_1.Coin.encode(message.deploymentMinDeposit, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deploymentMinDeposit = coin_1.Coin.decode(reader, reader.uint32());
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
            $type: exports.Params.$type,
            deploymentMinDeposit: isSet(object.deploymentMinDeposit) ? coin_1.Coin.fromJSON(object.deploymentMinDeposit) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.deploymentMinDeposit !== undefined &&
            (obj.deploymentMinDeposit = message.deploymentMinDeposit ? coin_1.Coin.toJSON(message.deploymentMinDeposit) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.deploymentMinDeposit =
            object.deploymentMinDeposit !== undefined && object.deploymentMinDeposit !== null ? coin_1.Coin.fromPartial(object.deploymentMinDeposit) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Params.$type, exports.Params);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
