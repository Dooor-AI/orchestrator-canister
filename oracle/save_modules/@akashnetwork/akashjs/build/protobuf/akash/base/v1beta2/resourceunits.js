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
exports.ResourceUnits = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const resource_1 = require("./resource");
const endpoint_1 = require("./endpoint");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.base.v1beta2";
function createBaseResourceUnits() {
    return {
        $type: "akash.base.v1beta2.ResourceUnits",
        cpu: undefined,
        memory: undefined,
        storage: [],
        endpoints: []
    };
}
exports.ResourceUnits = {
    $type: "akash.base.v1beta2.ResourceUnits",
    encode(message, writer = _m0.Writer.create()) {
        if (message.cpu !== undefined) {
            resource_1.CPU.encode(message.cpu, writer.uint32(10).fork()).ldelim();
        }
        if (message.memory !== undefined) {
            resource_1.Memory.encode(message.memory, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.storage) {
            resource_1.Storage.encode(v, writer.uint32(26).fork()).ldelim();
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
                    message.cpu = resource_1.CPU.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.memory = resource_1.Memory.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.storage.push(resource_1.Storage.decode(reader, reader.uint32()));
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
            cpu: isSet(object.cpu) ? resource_1.CPU.fromJSON(object.cpu) : undefined,
            memory: isSet(object.memory) ? resource_1.Memory.fromJSON(object.memory) : undefined,
            storage: Array.isArray(object?.storage) ? object.storage.map((e) => resource_1.Storage.fromJSON(e)) : [],
            endpoints: Array.isArray(object?.endpoints) ? object.endpoints.map((e) => endpoint_1.Endpoint.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.cpu !== undefined && (obj.cpu = message.cpu ? resource_1.CPU.toJSON(message.cpu) : undefined);
        message.memory !== undefined && (obj.memory = message.memory ? resource_1.Memory.toJSON(message.memory) : undefined);
        if (message.storage) {
            obj.storage = message.storage.map(e => (e ? resource_1.Storage.toJSON(e) : undefined));
        }
        else {
            obj.storage = [];
        }
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
        message.cpu = object.cpu !== undefined && object.cpu !== null ? resource_1.CPU.fromPartial(object.cpu) : undefined;
        message.memory = object.memory !== undefined && object.memory !== null ? resource_1.Memory.fromPartial(object.memory) : undefined;
        message.storage = object.storage?.map(e => resource_1.Storage.fromPartial(e)) || [];
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
