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
exports.MsgClientImpl = exports.MsgSubmitTxResponse = exports.MsgSubmitTx = exports.MsgRegisterAccountResponse = exports.MsgRegisterAccount = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../typeRegistry");
const any_1 = require("../../google/protobuf/any");
const long_1 = __importDefault(require("long"));
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.icaauth";
function createBaseMsgRegisterAccount() {
    return {
        $type: "akash.icaauth.MsgRegisterAccount",
        owner: "",
        connectionId: ""
    };
}
exports.MsgRegisterAccount = {
    $type: "akash.icaauth.MsgRegisterAccount",
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
        const message = createBaseMsgRegisterAccount();
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
            $type: exports.MsgRegisterAccount.$type,
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
        const message = createBaseMsgRegisterAccount();
        message.owner = object.owner ?? "";
        message.connectionId = object.connectionId ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgRegisterAccount.$type, exports.MsgRegisterAccount);
function createBaseMsgRegisterAccountResponse() {
    return { $type: "akash.icaauth.MsgRegisterAccountResponse" };
}
exports.MsgRegisterAccountResponse = {
    $type: "akash.icaauth.MsgRegisterAccountResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterAccountResponse();
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
            $type: exports.MsgRegisterAccountResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgRegisterAccountResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgRegisterAccountResponse.$type, exports.MsgRegisterAccountResponse);
function createBaseMsgSubmitTx() {
    return {
        $type: "akash.icaauth.MsgSubmitTx",
        owner: "",
        connectionId: "",
        msg: undefined
    };
}
exports.MsgSubmitTx = {
    $type: "akash.icaauth.MsgSubmitTx",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.connectionId !== "") {
            writer.uint32(18).string(message.connectionId);
        }
        if (message.msg !== undefined) {
            any_1.Any.encode(message.msg, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.connectionId = reader.string();
                    break;
                case 3:
                    message.msg = any_1.Any.decode(reader, reader.uint32());
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
            $type: exports.MsgSubmitTx.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
            msg: isSet(object.msg) ? any_1.Any.fromJSON(object.msg) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.connectionId !== undefined && (obj.connectionId = message.connectionId);
        message.msg !== undefined && (obj.msg = message.msg ? any_1.Any.toJSON(message.msg) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitTx();
        message.owner = object.owner ?? "";
        message.connectionId = object.connectionId ?? "";
        message.msg = object.msg !== undefined && object.msg !== null ? any_1.Any.fromPartial(object.msg) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgSubmitTx.$type, exports.MsgSubmitTx);
function createBaseMsgSubmitTxResponse() {
    return { $type: "akash.icaauth.MsgSubmitTxResponse" };
}
exports.MsgSubmitTxResponse = {
    $type: "akash.icaauth.MsgSubmitTxResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitTxResponse();
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
            $type: exports.MsgSubmitTxResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSubmitTxResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgSubmitTxResponse.$type, exports.MsgSubmitTxResponse);
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.RegisterAccount = this.RegisterAccount.bind(this);
        this.SubmitTx = this.SubmitTx.bind(this);
    }
    RegisterAccount(request) {
        const data = exports.MsgRegisterAccount.encode(request).finish();
        const promise = this.rpc.request("akash.icaauth.Msg", "RegisterAccount", data);
        return promise.then(data => exports.MsgRegisterAccountResponse.decode(new _m0.Reader(data)));
    }
    SubmitTx(request) {
        const data = exports.MsgSubmitTx.encode(request).finish();
        const promise = this.rpc.request("akash.icaauth.Msg", "SubmitTx", data);
        return promise.then(data => exports.MsgSubmitTxResponse.decode(new _m0.Reader(data)));
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
