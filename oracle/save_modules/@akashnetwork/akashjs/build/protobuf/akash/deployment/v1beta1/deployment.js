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
exports.MsgClientImpl = exports.DeploymentFilters = exports.Deployment = exports.DeploymentID = exports.MsgCloseDeploymentResponse = exports.MsgCloseDeployment = exports.MsgUpdateDeploymentResponse = exports.MsgUpdateDeployment = exports.MsgDepositDeploymentResponse = exports.MsgDepositDeployment = exports.MsgCreateDeploymentResponse = exports.MsgCreateDeployment = exports.deployment_StateToJSON = exports.deployment_StateFromJSON = exports.Deployment_State = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const group_1 = require("./group");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta1";
/** State is an enum which refers to state of deployment */
var Deployment_State;
(function (Deployment_State) {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    Deployment_State[Deployment_State["invalid"] = 0] = "invalid";
    /** active - DeploymentActive denotes state for deployment active */
    Deployment_State[Deployment_State["active"] = 1] = "active";
    /** closed - DeploymentClosed denotes state for deployment closed */
    Deployment_State[Deployment_State["closed"] = 2] = "closed";
    Deployment_State[Deployment_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Deployment_State = exports.Deployment_State || (exports.Deployment_State = {}));
function deployment_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "invalid":
            return Deployment_State.invalid;
        case 1:
        case "active":
            return Deployment_State.active;
        case 2:
        case "closed":
            return Deployment_State.closed;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Deployment_State.UNRECOGNIZED;
    }
}
exports.deployment_StateFromJSON = deployment_StateFromJSON;
function deployment_StateToJSON(object) {
    switch (object) {
        case Deployment_State.invalid:
            return "invalid";
        case Deployment_State.active:
            return "active";
        case Deployment_State.closed:
            return "closed";
        case Deployment_State.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.deployment_StateToJSON = deployment_StateToJSON;
function createBaseMsgCreateDeployment() {
    return {
        $type: "akash.deployment.v1beta1.MsgCreateDeployment",
        id: undefined,
        groups: [],
        version: new Uint8Array(),
        deposit: undefined
    };
}
exports.MsgCreateDeployment = {
    $type: "akash.deployment.v1beta1.MsgCreateDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.groups) {
            group_1.GroupSpec.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.version.length !== 0) {
            writer.uint32(26).bytes(message.version);
        }
        if (message.deposit !== undefined) {
            coin_1.Coin.encode(message.deposit, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateDeployment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.DeploymentID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.groups.push(group_1.GroupSpec.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.version = reader.bytes();
                    break;
                case 4:
                    message.deposit = coin_1.Coin.decode(reader, reader.uint32());
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
            $type: exports.MsgCreateDeployment.$type,
            id: isSet(object.id) ? exports.DeploymentID.fromJSON(object.id) : undefined,
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => group_1.GroupSpec.fromJSON(e)) : [],
            version: isSet(object.version) ? bytesFromBase64(object.version) : new Uint8Array(),
            deposit: isSet(object.deposit) ? coin_1.Coin.fromJSON(object.deposit) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.DeploymentID.toJSON(message.id) : undefined);
        if (message.groups) {
            obj.groups = message.groups.map(e => (e ? group_1.GroupSpec.toJSON(e) : undefined));
        }
        else {
            obj.groups = [];
        }
        message.version !== undefined && (obj.version = base64FromBytes(message.version !== undefined ? message.version : new Uint8Array()));
        message.deposit !== undefined && (obj.deposit = message.deposit ? coin_1.Coin.toJSON(message.deposit) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateDeployment();
        message.id = object.id !== undefined && object.id !== null ? exports.DeploymentID.fromPartial(object.id) : undefined;
        message.groups = object.groups?.map(e => group_1.GroupSpec.fromPartial(e)) || [];
        message.version = object.version ?? new Uint8Array();
        message.deposit = object.deposit !== undefined && object.deposit !== null ? coin_1.Coin.fromPartial(object.deposit) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateDeployment.$type, exports.MsgCreateDeployment);
function createBaseMsgCreateDeploymentResponse() {
    return { $type: "akash.deployment.v1beta1.MsgCreateDeploymentResponse" };
}
exports.MsgCreateDeploymentResponse = {
    $type: "akash.deployment.v1beta1.MsgCreateDeploymentResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateDeploymentResponse();
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
            $type: exports.MsgCreateDeploymentResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateDeploymentResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateDeploymentResponse.$type, exports.MsgCreateDeploymentResponse);
function createBaseMsgDepositDeployment() {
    return {
        $type: "akash.deployment.v1beta1.MsgDepositDeployment",
        id: undefined,
        amount: undefined
    };
}
exports.MsgDepositDeployment = {
    $type: "akash.deployment.v1beta1.MsgDepositDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositDeployment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.DeploymentID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
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
            $type: exports.MsgDepositDeployment.$type,
            id: isSet(object.id) ? exports.DeploymentID.fromJSON(object.id) : undefined,
            amount: isSet(object.amount) ? coin_1.Coin.fromJSON(object.amount) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.DeploymentID.toJSON(message.id) : undefined);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgDepositDeployment();
        message.id = object.id !== undefined && object.id !== null ? exports.DeploymentID.fromPartial(object.id) : undefined;
        message.amount = object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDepositDeployment.$type, exports.MsgDepositDeployment);
function createBaseMsgDepositDeploymentResponse() {
    return { $type: "akash.deployment.v1beta1.MsgDepositDeploymentResponse" };
}
exports.MsgDepositDeploymentResponse = {
    $type: "akash.deployment.v1beta1.MsgDepositDeploymentResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositDeploymentResponse();
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
            $type: exports.MsgDepositDeploymentResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgDepositDeploymentResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDepositDeploymentResponse.$type, exports.MsgDepositDeploymentResponse);
function createBaseMsgUpdateDeployment() {
    return {
        $type: "akash.deployment.v1beta1.MsgUpdateDeployment",
        id: undefined,
        groups: [],
        version: new Uint8Array()
    };
}
exports.MsgUpdateDeployment = {
    $type: "akash.deployment.v1beta1.MsgUpdateDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.groups) {
            group_1.GroupSpec.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.version.length !== 0) {
            writer.uint32(26).bytes(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDeployment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.DeploymentID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.groups.push(group_1.GroupSpec.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.version = reader.bytes();
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
            $type: exports.MsgUpdateDeployment.$type,
            id: isSet(object.id) ? exports.DeploymentID.fromJSON(object.id) : undefined,
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => group_1.GroupSpec.fromJSON(e)) : [],
            version: isSet(object.version) ? bytesFromBase64(object.version) : new Uint8Array()
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.DeploymentID.toJSON(message.id) : undefined);
        if (message.groups) {
            obj.groups = message.groups.map(e => (e ? group_1.GroupSpec.toJSON(e) : undefined));
        }
        else {
            obj.groups = [];
        }
        message.version !== undefined && (obj.version = base64FromBytes(message.version !== undefined ? message.version : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateDeployment();
        message.id = object.id !== undefined && object.id !== null ? exports.DeploymentID.fromPartial(object.id) : undefined;
        message.groups = object.groups?.map(e => group_1.GroupSpec.fromPartial(e)) || [];
        message.version = object.version ?? new Uint8Array();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgUpdateDeployment.$type, exports.MsgUpdateDeployment);
function createBaseMsgUpdateDeploymentResponse() {
    return { $type: "akash.deployment.v1beta1.MsgUpdateDeploymentResponse" };
}
exports.MsgUpdateDeploymentResponse = {
    $type: "akash.deployment.v1beta1.MsgUpdateDeploymentResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDeploymentResponse();
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
            $type: exports.MsgUpdateDeploymentResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateDeploymentResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgUpdateDeploymentResponse.$type, exports.MsgUpdateDeploymentResponse);
function createBaseMsgCloseDeployment() {
    return {
        $type: "akash.deployment.v1beta1.MsgCloseDeployment",
        id: undefined
    };
}
exports.MsgCloseDeployment = {
    $type: "akash.deployment.v1beta1.MsgCloseDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseDeployment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.DeploymentID.decode(reader, reader.uint32());
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
            $type: exports.MsgCloseDeployment.$type,
            id: isSet(object.id) ? exports.DeploymentID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.DeploymentID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCloseDeployment();
        message.id = object.id !== undefined && object.id !== null ? exports.DeploymentID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseDeployment.$type, exports.MsgCloseDeployment);
function createBaseMsgCloseDeploymentResponse() {
    return { $type: "akash.deployment.v1beta1.MsgCloseDeploymentResponse" };
}
exports.MsgCloseDeploymentResponse = {
    $type: "akash.deployment.v1beta1.MsgCloseDeploymentResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseDeploymentResponse();
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
            $type: exports.MsgCloseDeploymentResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCloseDeploymentResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseDeploymentResponse.$type, exports.MsgCloseDeploymentResponse);
function createBaseDeploymentID() {
    return {
        $type: "akash.deployment.v1beta1.DeploymentID",
        owner: "",
        dseq: long_1.default.UZERO
    };
}
exports.DeploymentID = {
    $type: "akash.deployment.v1beta1.DeploymentID",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (!message.dseq.isZero()) {
            writer.uint32(16).uint64(message.dseq);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeploymentID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.dseq = reader.uint64();
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
            $type: exports.DeploymentID.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDeploymentID();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.DeploymentID.$type, exports.DeploymentID);
function createBaseDeployment() {
    return {
        $type: "akash.deployment.v1beta1.Deployment",
        deploymentId: undefined,
        state: 0,
        version: new Uint8Array(),
        createdAt: long_1.default.ZERO
    };
}
exports.Deployment = {
    $type: "akash.deployment.v1beta1.Deployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.deploymentId !== undefined) {
            exports.DeploymentID.encode(message.deploymentId, writer.uint32(10).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(16).int32(message.state);
        }
        if (message.version.length !== 0) {
            writer.uint32(26).bytes(message.version);
        }
        if (!message.createdAt.isZero()) {
            writer.uint32(32).int64(message.createdAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeployment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deploymentId = exports.DeploymentID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.version = reader.bytes();
                    break;
                case 4:
                    message.createdAt = reader.int64();
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
            $type: exports.Deployment.$type,
            deploymentId: isSet(object.deploymentId) ? exports.DeploymentID.fromJSON(object.deploymentId) : undefined,
            state: isSet(object.state) ? deployment_StateFromJSON(object.state) : 0,
            version: isSet(object.version) ? bytesFromBase64(object.version) : new Uint8Array(),
            createdAt: isSet(object.createdAt) ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO
        };
    },
    toJSON(message) {
        const obj = {};
        message.deploymentId !== undefined && (obj.deploymentId = message.deploymentId ? exports.DeploymentID.toJSON(message.deploymentId) : undefined);
        message.state !== undefined && (obj.state = deployment_StateToJSON(message.state));
        message.version !== undefined && (obj.version = base64FromBytes(message.version !== undefined ? message.version : new Uint8Array()));
        message.createdAt !== undefined && (obj.createdAt = (message.createdAt || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDeployment();
        message.deploymentId = object.deploymentId !== undefined && object.deploymentId !== null ? exports.DeploymentID.fromPartial(object.deploymentId) : undefined;
        message.state = object.state ?? 0;
        message.version = object.version ?? new Uint8Array();
        message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Deployment.$type, exports.Deployment);
function createBaseDeploymentFilters() {
    return {
        $type: "akash.deployment.v1beta1.DeploymentFilters",
        owner: "",
        dseq: long_1.default.UZERO,
        state: ""
    };
}
exports.DeploymentFilters = {
    $type: "akash.deployment.v1beta1.DeploymentFilters",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (!message.dseq.isZero()) {
            writer.uint32(16).uint64(message.dseq);
        }
        if (message.state !== "") {
            writer.uint32(26).string(message.state);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeploymentFilters();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.dseq = reader.uint64();
                    break;
                case 3:
                    message.state = reader.string();
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
            $type: exports.DeploymentFilters.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO,
            state: isSet(object.state) ? String(object.state) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        message.state !== undefined && (obj.state = message.state);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseDeploymentFilters();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.state = object.state ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.DeploymentFilters.$type, exports.DeploymentFilters);
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateDeployment = this.CreateDeployment.bind(this);
        this.DepositDeployment = this.DepositDeployment.bind(this);
        this.UpdateDeployment = this.UpdateDeployment.bind(this);
        this.CloseDeployment = this.CloseDeployment.bind(this);
        this.CloseGroup = this.CloseGroup.bind(this);
        this.PauseGroup = this.PauseGroup.bind(this);
        this.StartGroup = this.StartGroup.bind(this);
    }
    CreateDeployment(request) {
        const data = exports.MsgCreateDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "CreateDeployment", data);
        return promise.then(data => exports.MsgCreateDeploymentResponse.decode(new _m0.Reader(data)));
    }
    DepositDeployment(request) {
        const data = exports.MsgDepositDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "DepositDeployment", data);
        return promise.then(data => exports.MsgDepositDeploymentResponse.decode(new _m0.Reader(data)));
    }
    UpdateDeployment(request) {
        const data = exports.MsgUpdateDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "UpdateDeployment", data);
        return promise.then(data => exports.MsgUpdateDeploymentResponse.decode(new _m0.Reader(data)));
    }
    CloseDeployment(request) {
        const data = exports.MsgCloseDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "CloseDeployment", data);
        return promise.then(data => exports.MsgCloseDeploymentResponse.decode(new _m0.Reader(data)));
    }
    CloseGroup(request) {
        const data = group_1.MsgCloseGroup.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "CloseGroup", data);
        return promise.then(data => group_1.MsgCloseGroupResponse.decode(new _m0.Reader(data)));
    }
    PauseGroup(request) {
        const data = group_1.MsgPauseGroup.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "PauseGroup", data);
        return promise.then(data => group_1.MsgPauseGroupResponse.decode(new _m0.Reader(data)));
    }
    StartGroup(request) {
        const data = group_1.MsgStartGroup.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "StartGroup", data);
        return promise.then(data => group_1.MsgStartGroupResponse.decode(new _m0.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob || (b64 => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || (bin => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    arr.forEach(byte => {
        bin.push(String.fromCharCode(byte));
    });
    return btoa(bin.join(""));
}
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
