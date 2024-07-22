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
exports.GroupSpec = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const attribute_1 = require("../../base/v1beta3/attribute");
const resourceunit_1 = require("./resourceunit");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta3";
function createBaseGroupSpec() {
    return {
        $type: "akash.deployment.v1beta3.GroupSpec",
        name: "",
        requirements: undefined,
        resources: []
    };
}
exports.GroupSpec = {
    $type: "akash.deployment.v1beta3.GroupSpec",
    encode(message, writer = _m0.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.requirements !== undefined) {
            attribute_1.PlacementRequirements.encode(message.requirements, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.resources) {
            resourceunit_1.ResourceUnit.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupSpec();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.requirements = attribute_1.PlacementRequirements.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.resources.push(resourceunit_1.ResourceUnit.decode(reader, reader.uint32()));
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
            $type: exports.GroupSpec.$type,
            name: isSet(object.name) ? String(object.name) : "",
            requirements: isSet(object.requirements) ? attribute_1.PlacementRequirements.fromJSON(object.requirements) : undefined,
            resources: Array.isArray(object?.resources) ? object.resources.map((e) => resourceunit_1.ResourceUnit.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.requirements !== undefined && (obj.requirements = message.requirements ? attribute_1.PlacementRequirements.toJSON(message.requirements) : undefined);
        if (message.resources) {
            obj.resources = message.resources.map(e => (e ? resourceunit_1.ResourceUnit.toJSON(e) : undefined));
        }
        else {
            obj.resources = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupSpec();
        message.name = object.name ?? "";
        message.requirements =
            object.requirements !== undefined && object.requirements !== null ? attribute_1.PlacementRequirements.fromPartial(object.requirements) : undefined;
        message.resources = object.resources?.map(e => resourceunit_1.ResourceUnit.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GroupSpec.$type, exports.GroupSpec);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
