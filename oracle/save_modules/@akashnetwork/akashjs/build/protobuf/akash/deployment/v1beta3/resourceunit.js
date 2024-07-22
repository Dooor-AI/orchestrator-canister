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
exports.ResourceUnit = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const resources_1 = require("../../base/v1beta3/resources");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta3";
function createBaseResourceUnit() {
    return {
        $type: "akash.deployment.v1beta3.ResourceUnit",
        resource: undefined,
        count: 0,
        price: undefined
    };
}
exports.ResourceUnit = {
    $type: "akash.deployment.v1beta3.ResourceUnit",
    encode(message, writer = _m0.Writer.create()) {
        if (message.resource !== undefined) {
            resources_1.Resources.encode(message.resource, writer.uint32(10).fork()).ldelim();
        }
        if (message.count !== 0) {
            writer.uint32(16).uint32(message.count);
        }
        if (message.price !== undefined) {
            coin_1.DecCoin.encode(message.price, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResourceUnit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.resource = resources_1.Resources.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.count = reader.uint32();
                    break;
                case 3:
                    message.price = coin_1.DecCoin.decode(reader, reader.uint32());
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
            $type: exports.ResourceUnit.$type,
            resource: isSet(object.resource) ? resources_1.Resources.fromJSON(object.resource) : undefined,
            count: isSet(object.count) ? Number(object.count) : 0,
            price: isSet(object.price) ? coin_1.DecCoin.fromJSON(object.price) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.resource !== undefined && (obj.resource = message.resource ? resources_1.Resources.toJSON(message.resource) : undefined);
        message.count !== undefined && (obj.count = Math.round(message.count));
        message.price !== undefined && (obj.price = message.price ? coin_1.DecCoin.toJSON(message.price) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseResourceUnit();
        message.resource = object.resource !== undefined && object.resource !== null ? resources_1.Resources.fromPartial(object.resource) : undefined;
        message.count = object.count ?? 0;
        message.price = object.price !== undefined && object.price !== null ? coin_1.DecCoin.fromPartial(object.price) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.ResourceUnit.$type, exports.ResourceUnit);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
