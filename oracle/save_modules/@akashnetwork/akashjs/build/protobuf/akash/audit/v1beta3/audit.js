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
exports.MsgClientImpl = exports.MsgDeleteProviderAttributesResponse = exports.MsgDeleteProviderAttributes = exports.MsgSignProviderAttributesResponse = exports.MsgSignProviderAttributes = exports.AttributesFilters = exports.AttributesResponse = exports.AuditedAttributes = exports.Provider = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const attribute_1 = require("../../base/v1beta3/attribute");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.audit.v1beta3";
function createBaseProvider() {
    return {
        $type: "akash.audit.v1beta3.Provider",
        owner: "",
        auditor: "",
        attributes: []
    };
}
exports.Provider = {
    $type: "akash.audit.v1beta3.Provider",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.auditor !== "") {
            writer.uint32(18).string(message.auditor);
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(34).fork()).ldelim();
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
                    message.auditor = reader.string();
                    break;
                case 4:
                    message.attributes.push(attribute_1.Attribute.decode(reader, reader.uint32()));
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
            auditor: isSet(object.auditor) ? String(object.auditor) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.auditor !== undefined && (obj.auditor = message.auditor);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseProvider();
        message.owner = object.owner ?? "";
        message.auditor = object.auditor ?? "";
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Provider.$type, exports.Provider);
function createBaseAuditedAttributes() {
    return {
        $type: "akash.audit.v1beta3.AuditedAttributes",
        owner: "",
        auditor: "",
        attributes: []
    };
}
exports.AuditedAttributes = {
    $type: "akash.audit.v1beta3.AuditedAttributes",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.auditor !== "") {
            writer.uint32(18).string(message.auditor);
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAuditedAttributes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.auditor = reader.string();
                    break;
                case 3:
                    message.attributes.push(attribute_1.Attribute.decode(reader, reader.uint32()));
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
            $type: exports.AuditedAttributes.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            auditor: isSet(object.auditor) ? String(object.auditor) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.auditor !== undefined && (obj.auditor = message.auditor);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAuditedAttributes();
        message.owner = object.owner ?? "";
        message.auditor = object.auditor ?? "";
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.AuditedAttributes.$type, exports.AuditedAttributes);
function createBaseAttributesResponse() {
    return { $type: "akash.audit.v1beta3.AttributesResponse", attributes: [] };
}
exports.AttributesResponse = {
    $type: "akash.audit.v1beta3.AttributesResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.attributes) {
            exports.AuditedAttributes.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAttributesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.attributes.push(exports.AuditedAttributes.decode(reader, reader.uint32()));
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
            $type: exports.AttributesResponse.$type,
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => exports.AuditedAttributes.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? exports.AuditedAttributes.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAttributesResponse();
        message.attributes = object.attributes?.map(e => exports.AuditedAttributes.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.AttributesResponse.$type, exports.AttributesResponse);
function createBaseAttributesFilters() {
    return {
        $type: "akash.audit.v1beta3.AttributesFilters",
        auditors: [],
        owners: []
    };
}
exports.AttributesFilters = {
    $type: "akash.audit.v1beta3.AttributesFilters",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.auditors) {
            writer.uint32(10).string(v);
        }
        for (const v of message.owners) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAttributesFilters();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.auditors.push(reader.string());
                    break;
                case 2:
                    message.owners.push(reader.string());
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
            $type: exports.AttributesFilters.$type,
            auditors: Array.isArray(object?.auditors) ? object.auditors.map((e) => String(e)) : [],
            owners: Array.isArray(object?.owners) ? object.owners.map((e) => String(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.auditors) {
            obj.auditors = message.auditors.map(e => e);
        }
        else {
            obj.auditors = [];
        }
        if (message.owners) {
            obj.owners = message.owners.map(e => e);
        }
        else {
            obj.owners = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseAttributesFilters();
        message.auditors = object.auditors?.map(e => e) || [];
        message.owners = object.owners?.map(e => e) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.AttributesFilters.$type, exports.AttributesFilters);
function createBaseMsgSignProviderAttributes() {
    return {
        $type: "akash.audit.v1beta3.MsgSignProviderAttributes",
        owner: "",
        auditor: "",
        attributes: []
    };
}
exports.MsgSignProviderAttributes = {
    $type: "akash.audit.v1beta3.MsgSignProviderAttributes",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.auditor !== "") {
            writer.uint32(18).string(message.auditor);
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignProviderAttributes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.auditor = reader.string();
                    break;
                case 3:
                    message.attributes.push(attribute_1.Attribute.decode(reader, reader.uint32()));
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
            $type: exports.MsgSignProviderAttributes.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            auditor: isSet(object.auditor) ? String(object.auditor) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.auditor !== undefined && (obj.auditor = message.auditor);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgSignProviderAttributes();
        message.owner = object.owner ?? "";
        message.auditor = object.auditor ?? "";
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgSignProviderAttributes.$type, exports.MsgSignProviderAttributes);
function createBaseMsgSignProviderAttributesResponse() {
    return { $type: "akash.audit.v1beta3.MsgSignProviderAttributesResponse" };
}
exports.MsgSignProviderAttributesResponse = {
    $type: "akash.audit.v1beta3.MsgSignProviderAttributesResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignProviderAttributesResponse();
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
            $type: exports.MsgSignProviderAttributesResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSignProviderAttributesResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgSignProviderAttributesResponse.$type, exports.MsgSignProviderAttributesResponse);
function createBaseMsgDeleteProviderAttributes() {
    return {
        $type: "akash.audit.v1beta3.MsgDeleteProviderAttributes",
        owner: "",
        auditor: "",
        keys: []
    };
}
exports.MsgDeleteProviderAttributes = {
    $type: "akash.audit.v1beta3.MsgDeleteProviderAttributes",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.auditor !== "") {
            writer.uint32(18).string(message.auditor);
        }
        for (const v of message.keys) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeleteProviderAttributes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.auditor = reader.string();
                    break;
                case 3:
                    message.keys.push(reader.string());
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
            $type: exports.MsgDeleteProviderAttributes.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            auditor: isSet(object.auditor) ? String(object.auditor) : "",
            keys: Array.isArray(object?.keys) ? object.keys.map((e) => String(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.auditor !== undefined && (obj.auditor = message.auditor);
        if (message.keys) {
            obj.keys = message.keys.map(e => e);
        }
        else {
            obj.keys = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgDeleteProviderAttributes();
        message.owner = object.owner ?? "";
        message.auditor = object.auditor ?? "";
        message.keys = object.keys?.map(e => e) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDeleteProviderAttributes.$type, exports.MsgDeleteProviderAttributes);
function createBaseMsgDeleteProviderAttributesResponse() {
    return { $type: "akash.audit.v1beta3.MsgDeleteProviderAttributesResponse" };
}
exports.MsgDeleteProviderAttributesResponse = {
    $type: "akash.audit.v1beta3.MsgDeleteProviderAttributesResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeleteProviderAttributesResponse();
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
            $type: exports.MsgDeleteProviderAttributesResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgDeleteProviderAttributesResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDeleteProviderAttributesResponse.$type, exports.MsgDeleteProviderAttributesResponse);
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.SignProviderAttributes = this.SignProviderAttributes.bind(this);
        this.DeleteProviderAttributes = this.DeleteProviderAttributes.bind(this);
    }
    SignProviderAttributes(request) {
        const data = exports.MsgSignProviderAttributes.encode(request).finish();
        const promise = this.rpc.request("akash.audit.v1beta3.Msg", "SignProviderAttributes", data);
        return promise.then(data => exports.MsgSignProviderAttributesResponse.decode(new _m0.Reader(data)));
    }
    DeleteProviderAttributes(request) {
        const data = exports.MsgDeleteProviderAttributes.encode(request).finish();
        const promise = this.rpc.request("akash.audit.v1beta3.Msg", "DeleteProviderAttributes", data);
        return promise.then(data => exports.MsgDeleteProviderAttributesResponse.decode(new _m0.Reader(data)));
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
