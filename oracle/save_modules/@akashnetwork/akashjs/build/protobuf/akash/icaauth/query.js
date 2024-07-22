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
exports.QueryClientImpl = exports.QueryInterchainAccountFromAddressResponse = exports.QueryInterchainAccountFromAddressRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../typeRegistry");
const long_1 = __importDefault(require("long"));
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.icaauth";
function createBaseQueryInterchainAccountFromAddressRequest() {
    return {
        $type: "akash.icaauth.QueryInterchainAccountFromAddressRequest",
        owner: "",
        connectionId: ""
    };
}
exports.QueryInterchainAccountFromAddressRequest = {
    $type: "akash.icaauth.QueryInterchainAccountFromAddressRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.connectionId !== "") {
            writer.uint32(18).string(message.connectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryInterchainAccountFromAddressRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.connectionId = reader.string();
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
            $type: exports.QueryInterchainAccountFromAddressRequest.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.connectionId !== undefined && (obj.connectionId = message.connectionId);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryInterchainAccountFromAddressRequest();
        message.owner = object.owner ?? "";
        message.connectionId = object.connectionId ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryInterchainAccountFromAddressRequest.$type, exports.QueryInterchainAccountFromAddressRequest);
function createBaseQueryInterchainAccountFromAddressResponse() {
    return {
        $type: "akash.icaauth.QueryInterchainAccountFromAddressResponse",
        interchainAccountAddress: ""
    };
}
exports.QueryInterchainAccountFromAddressResponse = {
    $type: "akash.icaauth.QueryInterchainAccountFromAddressResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.interchainAccountAddress !== "") {
            writer.uint32(10).string(message.interchainAccountAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryInterchainAccountFromAddressResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.interchainAccountAddress = reader.string();
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
            $type: exports.QueryInterchainAccountFromAddressResponse.$type,
            interchainAccountAddress: isSet(object.interchainAccountAddress) ? String(object.interchainAccountAddress) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.interchainAccountAddress !== undefined && (obj.interchainAccountAddress = message.interchainAccountAddress);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryInterchainAccountFromAddressResponse();
        message.interchainAccountAddress = object.interchainAccountAddress ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryInterchainAccountFromAddressResponse.$type, exports.QueryInterchainAccountFromAddressResponse);
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.InterchainAccountFromAddress = this.InterchainAccountFromAddress.bind(this);
    }
    InterchainAccountFromAddress(request) {
        const data = exports.QueryInterchainAccountFromAddressRequest.encode(request).finish();
        const promise = this.rpc.request("akash.icaauth.Query", "InterchainAccountFromAddress", data);
        return promise.then(data => exports.QueryInterchainAccountFromAddressResponse.decode(new _m0.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
