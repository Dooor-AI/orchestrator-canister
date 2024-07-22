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
exports.MsgCloseDeploymentResponse = exports.MsgCloseDeployment = exports.MsgUpdateDeploymentResponse = exports.MsgUpdateDeployment = exports.MsgDepositDeploymentResponse = exports.MsgDepositDeployment = exports.MsgCreateDeploymentResponse = exports.MsgCreateDeployment = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const deployment_1 = require("./deployment");
const groupspec_1 = require("./groupspec");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta2";
function createBaseMsgCreateDeployment() {
    return {
        $type: "akash.deployment.v1beta2.MsgCreateDeployment",
        id: undefined,
        groups: [],
        version: new Uint8Array(),
        deposit: undefined,
        depositor: ""
    };
}
exports.MsgCreateDeployment = {
    $type: "akash.deployment.v1beta2.MsgCreateDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            deployment_1.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.groups) {
            groupspec_1.GroupSpec.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.version.length !== 0) {
            writer.uint32(26).bytes(message.version);
        }
        if (message.deposit !== undefined) {
            coin_1.Coin.encode(message.deposit, writer.uint32(34).fork()).ldelim();
        }
        if (message.depositor !== "") {
            writer.uint32(42).string(message.depositor);
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
                    message.id = deployment_1.DeploymentID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.groups.push(groupspec_1.GroupSpec.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.version = reader.bytes();
                    break;
                case 4:
                    message.deposit = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.depositor = reader.string();
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
            id: isSet(object.id) ? deployment_1.DeploymentID.fromJSON(object.id) : undefined,
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => groupspec_1.GroupSpec.fromJSON(e)) : [],
            version: isSet(object.version) ? bytesFromBase64(object.version) : new Uint8Array(),
            deposit: isSet(object.deposit) ? coin_1.Coin.fromJSON(object.deposit) : undefined,
            depositor: isSet(object.depositor) ? String(object.depositor) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? deployment_1.DeploymentID.toJSON(message.id) : undefined);
        if (message.groups) {
            obj.groups = message.groups.map(e => (e ? groupspec_1.GroupSpec.toJSON(e) : undefined));
        }
        else {
            obj.groups = [];
        }
        message.version !== undefined && (obj.version = base64FromBytes(message.version !== undefined ? message.version : new Uint8Array()));
        message.deposit !== undefined && (obj.deposit = message.deposit ? coin_1.Coin.toJSON(message.deposit) : undefined);
        message.depositor !== undefined && (obj.depositor = message.depositor);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateDeployment();
        message.id = object.id !== undefined && object.id !== null ? deployment_1.DeploymentID.fromPartial(object.id) : undefined;
        message.groups = object.groups?.map(e => groupspec_1.GroupSpec.fromPartial(e)) || [];
        message.version = object.version ?? new Uint8Array();
        message.deposit = object.deposit !== undefined && object.deposit !== null ? coin_1.Coin.fromPartial(object.deposit) : undefined;
        message.depositor = object.depositor ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateDeployment.$type, exports.MsgCreateDeployment);
function createBaseMsgCreateDeploymentResponse() {
    return { $type: "akash.deployment.v1beta2.MsgCreateDeploymentResponse" };
}
exports.MsgCreateDeploymentResponse = {
    $type: "akash.deployment.v1beta2.MsgCreateDeploymentResponse",
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
        $type: "akash.deployment.v1beta2.MsgDepositDeployment",
        id: undefined,
        amount: undefined,
        depositor: ""
    };
}
exports.MsgDepositDeployment = {
    $type: "akash.deployment.v1beta2.MsgDepositDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            deployment_1.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
        }
        if (message.depositor !== "") {
            writer.uint32(26).string(message.depositor);
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
                    message.id = deployment_1.DeploymentID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.depositor = reader.string();
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
            id: isSet(object.id) ? deployment_1.DeploymentID.fromJSON(object.id) : undefined,
            amount: isSet(object.amount) ? coin_1.Coin.fromJSON(object.amount) : undefined,
            depositor: isSet(object.depositor) ? String(object.depositor) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? deployment_1.DeploymentID.toJSON(message.id) : undefined);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        message.depositor !== undefined && (obj.depositor = message.depositor);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgDepositDeployment();
        message.id = object.id !== undefined && object.id !== null ? deployment_1.DeploymentID.fromPartial(object.id) : undefined;
        message.amount = object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : undefined;
        message.depositor = object.depositor ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgDepositDeployment.$type, exports.MsgDepositDeployment);
function createBaseMsgDepositDeploymentResponse() {
    return { $type: "akash.deployment.v1beta2.MsgDepositDeploymentResponse" };
}
exports.MsgDepositDeploymentResponse = {
    $type: "akash.deployment.v1beta2.MsgDepositDeploymentResponse",
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
        $type: "akash.deployment.v1beta2.MsgUpdateDeployment",
        id: undefined,
        version: new Uint8Array()
    };
}
exports.MsgUpdateDeployment = {
    $type: "akash.deployment.v1beta2.MsgUpdateDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            deployment_1.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
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
                    message.id = deployment_1.DeploymentID.decode(reader, reader.uint32());
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
            id: isSet(object.id) ? deployment_1.DeploymentID.fromJSON(object.id) : undefined,
            version: isSet(object.version) ? bytesFromBase64(object.version) : new Uint8Array()
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? deployment_1.DeploymentID.toJSON(message.id) : undefined);
        message.version !== undefined && (obj.version = base64FromBytes(message.version !== undefined ? message.version : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateDeployment();
        message.id = object.id !== undefined && object.id !== null ? deployment_1.DeploymentID.fromPartial(object.id) : undefined;
        message.version = object.version ?? new Uint8Array();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgUpdateDeployment.$type, exports.MsgUpdateDeployment);
function createBaseMsgUpdateDeploymentResponse() {
    return { $type: "akash.deployment.v1beta2.MsgUpdateDeploymentResponse" };
}
exports.MsgUpdateDeploymentResponse = {
    $type: "akash.deployment.v1beta2.MsgUpdateDeploymentResponse",
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
        $type: "akash.deployment.v1beta2.MsgCloseDeployment",
        id: undefined
    };
}
exports.MsgCloseDeployment = {
    $type: "akash.deployment.v1beta2.MsgCloseDeployment",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            deployment_1.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
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
                    message.id = deployment_1.DeploymentID.decode(reader, reader.uint32());
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
            id: isSet(object.id) ? deployment_1.DeploymentID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? deployment_1.DeploymentID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCloseDeployment();
        message.id = object.id !== undefined && object.id !== null ? deployment_1.DeploymentID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseDeployment.$type, exports.MsgCloseDeployment);
function createBaseMsgCloseDeploymentResponse() {
    return { $type: "akash.deployment.v1beta2.MsgCloseDeploymentResponse" };
}
exports.MsgCloseDeploymentResponse = {
    $type: "akash.deployment.v1beta2.MsgCloseDeploymentResponse",
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
