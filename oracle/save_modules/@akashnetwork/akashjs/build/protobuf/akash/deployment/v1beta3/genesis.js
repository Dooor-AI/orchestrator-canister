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
exports.GenesisState = exports.GenesisDeployment = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const deployment_1 = require("./deployment");
const group_1 = require("./group");
const params_1 = require("./params");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta3";
function createBaseGenesisDeployment() {
    return {
        $type: "akash.deployment.v1beta3.GenesisDeployment",
        deployment: undefined,
        groups: []
    };
}
exports.GenesisDeployment = {
    $type: "akash.deployment.v1beta3.GenesisDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.deployment !== undefined) {
            deployment_1.Deployment.encode(message.deployment, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.groups) {
            group_1.Group.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisDeployment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deployment = deployment_1.Deployment.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.groups.push(group_1.Group.decode(reader, reader.uint32()));
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
            $type: exports.GenesisDeployment.$type,
            deployment: isSet(object.deployment) ? deployment_1.Deployment.fromJSON(object.deployment) : undefined,
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => group_1.Group.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.deployment !== undefined && (obj.deployment = message.deployment ? deployment_1.Deployment.toJSON(message.deployment) : undefined);
        if (message.groups) {
            obj.groups = message.groups.map(e => (e ? group_1.Group.toJSON(e) : undefined));
        }
        else {
            obj.groups = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisDeployment();
        message.deployment = object.deployment !== undefined && object.deployment !== null ? deployment_1.Deployment.fromPartial(object.deployment) : undefined;
        message.groups = object.groups?.map(e => group_1.Group.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GenesisDeployment.$type, exports.GenesisDeployment);
function createBaseGenesisState() {
    return {
        $type: "akash.deployment.v1beta3.GenesisState",
        deployments: [],
        params: undefined
    };
}
exports.GenesisState = {
    $type: "akash.deployment.v1beta3.GenesisState",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.deployments) {
            exports.GenesisDeployment.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(18).fork()).ldelim();
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
                    message.deployments.push(exports.GenesisDeployment.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.params = params_1.Params.decode(reader, reader.uint32());
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
            deployments: Array.isArray(object?.deployments) ? object.deployments.map((e) => exports.GenesisDeployment.fromJSON(e)) : [],
            params: isSet(object.params) ? params_1.Params.fromJSON(object.params) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.deployments) {
            obj.deployments = message.deployments.map(e => (e ? exports.GenesisDeployment.toJSON(e) : undefined));
        }
        else {
            obj.deployments = [];
        }
        message.params !== undefined && (obj.params = message.params ? params_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.deployments = object.deployments?.map(e => exports.GenesisDeployment.fromPartial(e)) || [];
        message.params = object.params !== undefined && object.params !== null ? params_1.Params.fromPartial(object.params) : undefined;
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
