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
exports.MsgClientImpl = exports.Provider = exports.MsgDeleteProviderResponse = exports.MsgDeleteProvider = exports.MsgUpdateProviderResponse = exports.MsgUpdateProvider = exports.MsgCreateProviderResponse = exports.MsgCreateProvider = exports.ProviderInfo = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const attribute_1 = require("../../base/v1beta2/attribute");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.provider.v1beta2";
function createBaseProviderInfo() {
    return {
        $type: "akash.provider.v1beta2.ProviderInfo",
        email: "",
        website: ""
    };
}
exports.ProviderInfo = {
    $type: "akash.provider.v1beta2.ProviderInfo",
    encode(message, writer = _m0.Writer.create()) {
        if (message.email !== "") {
            writer.uint32(10).string(message.email);
        }
        if (message.website !== "") {
            writer.uint32(18).string(message.website);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProviderInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.email = reader.string();
                    break;
                case 2:
                    message.website = reader.string();
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
            $type: exports.ProviderInfo.$type,
            email: isSet(object.email) ? String(object.email) : "",
            website: isSet(object.website) ? String(object.website) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.email !== undefined && (obj.email = message.email);
        message.website !== undefined && (obj.website = message.website);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseProviderInfo();
        message.email = object.email ?? "";
        message.website = object.website ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.ProviderInfo.$type, exports.ProviderInfo);
function createBaseMsgCreateProvider() {
    return {
        $type: "akash.provider.v1beta2.MsgCreateProvider",
        owner: "",
        hostUri: "",
        attributes: [],
        info: undefined
    };
}
exports.MsgCreateProvider = {
    $type: "akash.provider.v1beta2.MsgCreateProvider",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.hostUri !== "") {
            writer.uint32(18).string(message.hostUri);
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.ProviderInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.hostUri = reader.string();
                    break;
                case 3:
                    message.attributes.push(attribute_1.Attribute.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.info = exports.ProviderInfo.decode(reader, reader.uint32());
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
            $type: exports.MsgCreateProvider.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            hostUri: isSet(object.hostUri) ? String(object.hostUri) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : [],
            info: isSet(object.info) ? exports.ProviderInfo.fromJSON(object.info) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.hostUri !== undefined && (obj.hostUri = message.hostUri);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        message.info !== undefined && (obj.info = message.info ? exports.ProviderInfo.toJSON(message.info) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateProvider();
        message.owner = object.owner ?? "";
        message.hostUri = object.hostUri ?? "";
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        message.info = object.info !== undefined && object.info !== null ? exports.ProviderInfo.fromPartial(object.info) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateProvider.$type, exports.MsgCreateProvider);
function createBaseMsgCreateProviderResponse() {
    return { $type: "akash.provider.v1beta2.MsgCreateProviderResponse" };
}
exports.MsgCreateProviderResponse = {
    $type: "akash.provider.v1beta2.MsgCreateProviderResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateProviderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {
            $type: exports.MsgCreateProviderResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateProviderResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateProviderResponse.$type, exports.MsgCreateProviderResponse);
function createBaseMsgUpdateProvider() {
    return {
        $type: "akash.provider.v1beta2.MsgUpdateProvider",
        owner: "",
        hostUri: "",
        attributes: [],
        info: undefined
    };
}
exports.MsgUpdateProvider = {
    $type: "akash.provider.v1beta2.MsgUpdateProvider",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.hostUri !== "") {
            writer.uint32(18).string(message.hostUri);
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.ProviderInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.hostUri = reader.string();
                    break;
                case 3:
                    message.attributes.push(attribute_1.Attribute.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.info = exports.ProviderInfo.decode(reader, reader.uint32());
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
            $type: exports.MsgUpdateProvider.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            hostUri: isSet(object.hostUri) ? String(object.hostUri) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : [],
            info: isSet(object.info) ? exports.ProviderInfo.fromJSON(object.info) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.hostUri !== undefined && (obj.hostUri = message.hostUri);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        message.info !== undefined && (obj.info = message.info ? exports.ProviderInfo.toJSON(message.info) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateProvider();
        message.owner = object.owner ?? "";
        message.hostUri = object.hostUri ?? "";
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        message.info = object.info !== undefined && object.info !== null ? exports.ProviderInfo.fromPartial(object.info) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgUpdateProvider.$type, exports.MsgUpdateProvider);
function createBaseMsgUpdateProviderResponse() {
    return { $type: "akash.provider.v1beta2.MsgUpdateProviderResponse" };
}
exports.MsgUpdateProviderResponse = {
    $type: "akash.provider.v1beta2.MsgUpdateProviderResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateProviderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {
            $type: exports.MsgUpdateProviderResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateProviderResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgUpdateProviderResponse.$type, exports.MsgUpdateProviderResponse);
function createBaseMsgDeleteProvider() {
    return { $type: "akash.provider.v1beta2.MsgDeleteProvider", owner: "" };
}
exports.MsgDeleteProvider = {
    $type: "akash.provider.v1beta2.MsgDeleteProvider",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeleteProvider();
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
            $type: exports.MsgDeleteProvider.$type,
            owner: isSet(object.owner) ? String(object.owner) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgDeleteProvider();
        message.owner = object.owner ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDeleteProvider.$type, exports.MsgDeleteProvider);
function createBaseMsgDeleteProviderResponse() {
    return { $type: "akash.provider.v1beta2.MsgDeleteProviderResponse" };
}
exports.MsgDeleteProviderResponse = {
    $type: "akash.provider.v1beta2.MsgDeleteProviderResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeleteProviderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {
            $type: exports.MsgDeleteProviderResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgDeleteProviderResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDeleteProviderResponse.$type, exports.MsgDeleteProviderResponse);
function createBaseProvider() {
    return {
        $type: "akash.provider.v1beta2.Provider",
        owner: "",
        hostUri: "",
        attributes: [],
        info: undefined
    };
}
exports.Provider = {
    $type: "akash.provider.v1beta2.Provider",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.hostUri !== "") {
            writer.uint32(18).string(message.hostUri);
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.ProviderInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.hostUri = reader.string();
                    break;
                case 3:
                    message.attributes.push(attribute_1.Attribute.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.info = exports.ProviderInfo.decode(reader, reader.uint32());
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
            $type: exports.Provider.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            hostUri: isSet(object.hostUri) ? String(object.hostUri) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : [],
            info: isSet(object.info) ? exports.ProviderInfo.fromJSON(object.info) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.hostUri !== undefined && (obj.hostUri = message.hostUri);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        message.info !== undefined && (obj.info = message.info ? exports.ProviderInfo.toJSON(message.info) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseProvider();
        message.owner = object.owner ?? "";
        message.hostUri = object.hostUri ?? "";
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        message.info = object.info !== undefined && object.info !== null ? exports.ProviderInfo.fromPartial(object.info) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Provider.$type, exports.Provider);
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateProvider = this.CreateProvider.bind(this);
        this.UpdateProvider = this.UpdateProvider.bind(this);
        this.DeleteProvider = this.DeleteProvider.bind(this);
    }
    CreateProvider(request) {
        const data = exports.MsgCreateProvider.encode(request).finish();
        const promise = this.rpc.request("akash.provider.v1beta2.Msg", "CreateProvider", data);
        return promise.then(data => exports.MsgCreateProviderResponse.decode(new _m0.Reader(data)));
    }
    UpdateProvider(request) {
        const data = exports.MsgUpdateProvider.encode(request).finish();
        const promise = this.rpc.request("akash.provider.v1beta2.Msg", "UpdateProvider", data);
        return promise.then(data => exports.MsgUpdateProviderResponse.decode(new _m0.Reader(data)));
    }
    DeleteProvider(request) {
        const data = exports.MsgDeleteProvider.encode(request).finish();
        const promise = this.rpc.request("akash.provider.v1beta2.Msg", "DeleteProvider", data);
        return promise.then(data => exports.MsgDeleteProviderResponse.decode(new _m0.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
