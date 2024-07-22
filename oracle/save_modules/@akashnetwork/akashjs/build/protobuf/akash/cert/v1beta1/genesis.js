"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.GenesisCertificate = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const cert_1 = require("../../../akash/cert/v1beta1/cert");
exports.protobufPackage = "akash.cert.v1beta1";
function createBaseGenesisCertificate() {
    return {
        $type: "akash.cert.v1beta1.GenesisCertificate",
        owner: "",
        certificate: undefined
    };
}
exports.GenesisCertificate = {
    $type: "akash.cert.v1beta1.GenesisCertificate",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.certificate !== undefined) {
            cert_1.Certificate.encode(message.certificate, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
    return { $type: "akash.cert.v1beta1.GenesisState", certificates: [] };
}
exports.GenesisState = {
    $type: "akash.cert.v1beta1.GenesisState",
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.certificates) {
            exports.GenesisCertificate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
