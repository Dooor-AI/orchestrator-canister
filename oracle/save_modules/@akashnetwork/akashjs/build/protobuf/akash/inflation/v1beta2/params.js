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
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.inflation.v1beta2";
function createBaseParams() {
    return {
        $type: "akash.inflation.v1beta2.Params",
        inflationDecayFactor: "",
        initialInflation: "",
        variance: ""
    };
}
exports.Params = {
    $type: "akash.inflation.v1beta2.Params",
    encode(message, writer = _m0.Writer.create()) {
        if (message.inflationDecayFactor !== "") {
            writer.uint32(10).string(message.inflationDecayFactor);
        }
        if (message.initialInflation !== "") {
            writer.uint32(18).string(message.initialInflation);
        }
        if (message.variance !== "") {
            writer.uint32(26).string(message.variance);
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
                    message.inflationDecayFactor = reader.string();
                    break;
                case 2:
                    message.initialInflation = reader.string();
                    break;
                case 3:
                    message.variance = reader.string();
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
            inflationDecayFactor: isSet(object.inflationDecayFactor) ? String(object.inflationDecayFactor) : "",
            initialInflation: isSet(object.initialInflation) ? String(object.initialInflation) : "",
            variance: isSet(object.variance) ? String(object.variance) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.inflationDecayFactor !== undefined && (obj.inflationDecayFactor = message.inflationDecayFactor);
        message.initialInflation !== undefined && (obj.initialInflation = message.initialInflation);
        message.variance !== undefined && (obj.variance = message.variance);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.inflationDecayFactor = object.inflationDecayFactor ?? "";
        message.initialInflation = object.initialInflation ?? "";
        message.variance = object.variance ?? "";
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
