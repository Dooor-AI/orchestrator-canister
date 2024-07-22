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
exports.Endpoint = exports.endpoint_KindToJSON = exports.endpoint_KindFromJSON = exports.Endpoint_Kind = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.base.v1beta1";
/** This describes how the endpoint is implemented when the lease is deployed */
var Endpoint_Kind;
(function (Endpoint_Kind) {
    /** SHARED_HTTP - Describes an endpoint that becomes a Kubernetes Ingress */
    Endpoint_Kind[Endpoint_Kind["SHARED_HTTP"] = 0] = "SHARED_HTTP";
    /** RANDOM_PORT - Describes an endpoint that becomes a Kubernetes NodePort */
    Endpoint_Kind[Endpoint_Kind["RANDOM_PORT"] = 1] = "RANDOM_PORT";
    Endpoint_Kind[Endpoint_Kind["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Endpoint_Kind = exports.Endpoint_Kind || (exports.Endpoint_Kind = {}));
function endpoint_KindFromJSON(object) {
    switch (object) {
        case 0:
        case "SHARED_HTTP":
            return Endpoint_Kind.SHARED_HTTP;
        case 1:
        case "RANDOM_PORT":
            return Endpoint_Kind.RANDOM_PORT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Endpoint_Kind.UNRECOGNIZED;
    }
}
exports.endpoint_KindFromJSON = endpoint_KindFromJSON;
function endpoint_KindToJSON(object) {
    switch (object) {
        case Endpoint_Kind.SHARED_HTTP:
            return "SHARED_HTTP";
        case Endpoint_Kind.RANDOM_PORT:
            return "RANDOM_PORT";
        case Endpoint_Kind.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.endpoint_KindToJSON = endpoint_KindToJSON;
function createBaseEndpoint() {
    return { $type: "akash.base.v1beta1.Endpoint", kind: 0 };
}
exports.Endpoint = {
    $type: "akash.base.v1beta1.Endpoint",
    encode(message, writer = _m0.Writer.create()) {
        if (message.kind !== 0) {
            writer.uint32(8).int32(message.kind);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEndpoint();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.kind = reader.int32();
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
            $type: exports.Endpoint.$type,
            kind: isSet(object.kind) ? endpoint_KindFromJSON(object.kind) : 0
        };
    },
    toJSON(message) {
        const obj = {};
        message.kind !== undefined && (obj.kind = endpoint_KindToJSON(message.kind));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEndpoint();
        message.kind = object.kind ?? 0;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Endpoint.$type, exports.Endpoint);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
