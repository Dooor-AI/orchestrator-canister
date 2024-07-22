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
exports.Params = exports.DenomTakeRate = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.take.v1beta3";
function createBaseDenomTakeRate() {
    return { $type: "akash.take.v1beta3.DenomTakeRate", denom: "", rate: 0 };
}
exports.DenomTakeRate = {
    $type: "akash.take.v1beta3.DenomTakeRate",
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.rate !== 0) {
            writer.uint32(16).uint32(message.rate);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDenomTakeRate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.rate = reader.uint32();
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
            $type: exports.DenomTakeRate.$type,
            denom: isSet(object.denom) ? String(object.denom) : "",
            rate: isSet(object.rate) ? Number(object.rate) : 0
        };
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.rate !== undefined && (obj.rate = Math.round(message.rate));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDenomTakeRate();
        message.denom = object.denom ?? "";
        message.rate = object.rate ?? 0;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.DenomTakeRate.$type, exports.DenomTakeRate);
function createBaseParams() {
    return {
        $type: "akash.take.v1beta3.Params",
        denomTakeRates: [],
        defaultTakeRate: 0
    };
}
exports.Params = {
    $type: "akash.take.v1beta3.Params",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.denomTakeRates) {
            exports.DenomTakeRate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.defaultTakeRate !== 0) {
            writer.uint32(16).uint32(message.defaultTakeRate);
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
                    message.denomTakeRates.push(exports.DenomTakeRate.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.defaultTakeRate = reader.uint32();
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
            denomTakeRates: Array.isArray(object?.denomTakeRates) ? object.denomTakeRates.map((e) => exports.DenomTakeRate.fromJSON(e)) : [],
            defaultTakeRate: isSet(object.defaultTakeRate) ? Number(object.defaultTakeRate) : 0
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.denomTakeRates) {
            obj.denomTakeRates = message.denomTakeRates.map(e => (e ? exports.DenomTakeRate.toJSON(e) : undefined));
        }
        else {
            obj.denomTakeRates = [];
        }
        message.defaultTakeRate !== undefined && (obj.defaultTakeRate = Math.round(message.defaultTakeRate));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.denomTakeRates = object.denomTakeRates?.map(e => exports.DenomTakeRate.fromPartial(e)) || [];
        message.defaultTakeRate = object.defaultTakeRate ?? 0;
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
