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
exports.QueryClientImpl = exports.QueryProviderResponse = exports.QueryProviderRequest = exports.QueryProvidersResponse = exports.QueryProvidersRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const provider_1 = require("./provider");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.provider.v1beta3";
function createBaseQueryProvidersRequest() {
    return {
        $type: "akash.provider.v1beta3.QueryProvidersRequest",
        pagination: undefined
    };
}
exports.QueryProvidersRequest = {
    $type: "akash.provider.v1beta3.QueryProvidersRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProvidersRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
            $type: exports.QueryProvidersRequest.$type,
            pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryProvidersRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryProvidersRequest.$type, exports.QueryProvidersRequest);
function createBaseQueryProvidersResponse() {
    return {
        $type: "akash.provider.v1beta3.QueryProvidersResponse",
        providers: [],
        pagination: undefined
    };
}
exports.QueryProvidersResponse = {
    $type: "akash.provider.v1beta3.QueryProvidersResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.providers) {
            provider_1.Provider.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProvidersResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.providers.push(provider_1.Provider.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
            $type: exports.QueryProvidersResponse.$type,
            providers: Array.isArray(object?.providers) ? object.providers.map((e) => provider_1.Provider.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.providers) {
            obj.providers = message.providers.map(e => (e ? provider_1.Provider.toJSON(e) : undefined));
        }
        else {
            obj.providers = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryProvidersResponse();
        message.providers = object.providers?.map(e => provider_1.Provider.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryProvidersResponse.$type, exports.QueryProvidersResponse);
function createBaseQueryProviderRequest() {
    return { $type: "akash.provider.v1beta3.QueryProviderRequest", owner: "" };
}
exports.QueryProviderRequest = {
    $type: "akash.provider.v1beta3.QueryProviderRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProviderRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
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
            $type: exports.QueryProviderRequest.$type,
            owner: isSet(object.owner) ? String(object.owner) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryProviderRequest();
        message.owner = object.owner ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryProviderRequest.$type, exports.QueryProviderRequest);
function createBaseQueryProviderResponse() {
    return {
        $type: "akash.provider.v1beta3.QueryProviderResponse",
        provider: undefined
    };
}
exports.QueryProviderResponse = {
    $type: "akash.provider.v1beta3.QueryProviderResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.provider !== undefined) {
            provider_1.Provider.encode(message.provider, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProviderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.provider = provider_1.Provider.decode(reader, reader.uint32());
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
            $type: exports.QueryProviderResponse.$type,
            provider: isSet(object.provider) ? provider_1.Provider.fromJSON(object.provider) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.provider !== undefined && (obj.provider = message.provider ? provider_1.Provider.toJSON(message.provider) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryProviderResponse();
        message.provider = object.provider !== undefined && object.provider !== null ? provider_1.Provider.fromPartial(object.provider) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryProviderResponse.$type, exports.QueryProviderResponse);
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Providers = this.Providers.bind(this);
        this.Provider = this.Provider.bind(this);
    }
    Providers(request) {
        const data = exports.QueryProvidersRequest.encode(request).finish();
        const promise = this.rpc.request("akash.provider.v1beta3.Query", "Providers", data);
        return promise.then(data => exports.QueryProvidersResponse.decode(new _m0.Reader(data)));
    }
    Provider(request) {
        const data = exports.QueryProviderRequest.encode(request).finish();
        const promise = this.rpc.request("akash.provider.v1beta3.Query", "Provider", data);
        return promise.then(data => exports.QueryProviderResponse.decode(new _m0.Reader(data)));
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
