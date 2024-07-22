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
exports.ResourceUnits = exports.Storage = exports.Memory = exports.CPU = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const resourcevalue_1 = require("./resourcevalue");
const attribute_1 = require("./attribute");
const endpoint_1 = require("./endpoint");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.base.v1beta1";
function createBaseCPU() {
    return { $type: "akash.base.v1beta1.CPU", units: undefined, attributes: [] };
}
exports.CPU = {
    $type: "akash.base.v1beta1.CPU",
    encode(message, writer = _m0.Writer.create()) {
        if (message.units !== undefined) {
            resourcevalue_1.ResourceValue.encode(message.units, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCPU();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.units = resourcevalue_1.ResourceValue.decode(reader, reader.uint32());
                    break;
                case 2:
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
            $type: exports.CPU.$type,
            units: isSet(object.units) ? resourcevalue_1.ResourceValue.fromJSON(object.units) : undefined,
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.units !== undefined && (obj.units = message.units ? resourcevalue_1.ResourceValue.toJSON(message.units) : undefined);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCPU();
        message.units = object.units !== undefined && object.units !== null ? resourcevalue_1.ResourceValue.fromPartial(object.units) : undefined;
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.CPU.$type, exports.CPU);
function createBaseMemory() {
    return {
        $type: "akash.base.v1beta1.Memory",
        quantity: undefined,
        attributes: []
    };
}
exports.Memory = {
    $type: "akash.base.v1beta1.Memory",
    encode(message, writer = _m0.Writer.create()) {
        if (message.quantity !== undefined) {
            resourcevalue_1.ResourceValue.encode(message.quantity, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMemory();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.quantity = resourcevalue_1.ResourceValue.decode(reader, reader.uint32());
                    break;
                case 2:
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
            $type: exports.Memory.$type,
            quantity: isSet(object.quantity) ? resourcevalue_1.ResourceValue.fromJSON(object.quantity) : undefined,
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.quantity !== undefined && (obj.quantity = message.quantity ? resourcevalue_1.ResourceValue.toJSON(message.quantity) : undefined);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMemory();
        message.quantity = object.quantity !== undefined && object.quantity !== null ? resourcevalue_1.ResourceValue.fromPartial(object.quantity) : undefined;
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Memory.$type, exports.Memory);
function createBaseStorage() {
    return {
        $type: "akash.base.v1beta1.Storage",
        quantity: undefined,
        attributes: []
    };
}
exports.Storage = {
    $type: "akash.base.v1beta1.Storage",
    encode(message, writer = _m0.Writer.create()) {
        if (message.quantity !== undefined) {
            resourcevalue_1.ResourceValue.encode(message.quantity, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.attributes) {
            attribute_1.Attribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStorage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.quantity = resourcevalue_1.ResourceValue.decode(reader, reader.uint32());
                    break;
                case 2:
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
            $type: exports.Storage.$type,
            quantity: isSet(object.quantity) ? resourcevalue_1.ResourceValue.fromJSON(object.quantity) : undefined,
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => attribute_1.Attribute.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.quantity !== undefined && (obj.quantity = message.quantity ? resourcevalue_1.ResourceValue.toJSON(message.quantity) : undefined);
        if (message.attributes) {
            obj.attributes = message.attributes.map(e => (e ? attribute_1.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseStorage();
        message.quantity = object.quantity !== undefined && object.quantity !== null ? resourcevalue_1.ResourceValue.fromPartial(object.quantity) : undefined;
        message.attributes = object.attributes?.map(e => attribute_1.Attribute.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Storage.$type, exports.Storage);
function createBaseResourceUnits() {
    return {
        $type: "akash.base.v1beta1.ResourceUnits",
        cpu: undefined,
        memory: undefined,
        storage: undefined,
        endpoints: []
    };
}
exports.ResourceUnits = {
    $type: "akash.base.v1beta1.ResourceUnits",
    encode(message, writer = _m0.Writer.create()) {
        if (message.cpu !== undefined) {
            exports.CPU.encode(message.cpu, writer.uint32(10).fork()).ldelim();
        }
        if (message.memory !== undefined) {
            exports.Memory.encode(message.memory, writer.uint32(18).fork()).ldelim();
        }
        if (message.storage !== undefined) {
            exports.Storage.encode(message.storage, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.endpoints) {
            endpoint_1.Endpoint.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResourceUnits();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cpu = exports.CPU.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.memory = exports.Memory.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.storage = exports.Storage.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.endpoints.push(endpoint_1.Endpoint.decode(reader, reader.uint32()));
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
            $type: exports.ResourceUnits.$type,
            cpu: isSet(object.cpu) ? exports.CPU.fromJSON(object.cpu) : undefined,
            memory: isSet(object.memory) ? exports.Memory.fromJSON(object.memory) : undefined,
            storage: isSet(object.storage) ? exports.Storage.fromJSON(object.storage) : undefined,
            endpoints: Array.isArray(object?.endpoints) ? object.endpoints.map((e) => endpoint_1.Endpoint.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.cpu !== undefined && (obj.cpu = message.cpu ? exports.CPU.toJSON(message.cpu) : undefined);
        message.memory !== undefined && (obj.memory = message.memory ? exports.Memory.toJSON(message.memory) : undefined);
        message.storage !== undefined && (obj.storage = message.storage ? exports.Storage.toJSON(message.storage) : undefined);
        if (message.endpoints) {
            obj.endpoints = message.endpoints.map(e => (e ? endpoint_1.Endpoint.toJSON(e) : undefined));
        }
        else {
            obj.endpoints = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseResourceUnits();
        message.cpu = object.cpu !== undefined && object.cpu !== null ? exports.CPU.fromPartial(object.cpu) : undefined;
        message.memory = object.memory !== undefined && object.memory !== null ? exports.Memory.fromPartial(object.memory) : undefined;
        message.storage = object.storage !== undefined && object.storage !== null ? exports.Storage.fromPartial(object.storage) : undefined;
        message.endpoints = object.endpoints?.map(e => endpoint_1.Endpoint.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.ResourceUnits.$type, exports.ResourceUnits);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
