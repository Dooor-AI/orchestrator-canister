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
exports.GenesisState = exports.GenesisCertificate = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const cert_1 = require("./cert");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.cert.v1beta2";
function createBaseGenesisCertificate() {
    return {
        $type: "akash.cert.v1beta2.GenesisCertificate",
        owner: "",
        certificate: undefined
    };
}
exports.GenesisCertificate = {
    $type: "akash.cert.v1beta2.GenesisCertificate",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.certificate !== undefined) {
            cert_1.Certificate.encode(message.certificate, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisCertificate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.certificate = cert_1.Certificate.decode(reader, reader.uint32());
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
            $type: exports.GenesisCertificate.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            certificate: isSet(object.certificate) ? cert_1.Certificate.fromJSON(object.certificate) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.certificate !== undefined && (obj.certificate = message.certificate ? cert_1.Certificate.toJSON(message.certificate) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisCertificate();
        message.owner = object.owner ?? "";
        message.certificate = object.certificate !== undefined && object.certificate !== null ? cert_1.Certificate.fromPartial(object.certificate) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GenesisCertificate.$type, exports.GenesisCertificate);
function createBaseGenesisState() {
    return { $type: "akash.cert.v1beta2.GenesisState", certificates: [] };
}
exports.GenesisState = {
    $type: "akash.cert.v1beta2.GenesisState",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.certificates) {
            exports.GenesisCertificate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.certificates.push(exports.GenesisCertificate.decode(reader, reader.uint32()));
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
            $type: exports.GenesisState.$type,
            certificates: Array.isArray(object?.certificates) ? object.certificates.map((e) => exports.GenesisCertificate.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.certificates) {
            obj.certificates = message.certificates.map(e => (e ? exports.GenesisCertificate.toJSON(e) : undefined));
        }
        else {
            obj.certificates = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.certificates = object.certificates?.map(e => exports.GenesisCertificate.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GenesisState.$type, exports.GenesisState);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
