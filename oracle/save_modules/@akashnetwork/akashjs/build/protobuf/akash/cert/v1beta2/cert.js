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
exports.MsgClientImpl = exports.MsgRevokeCertificateResponse = exports.MsgRevokeCertificate = exports.MsgCreateCertificateResponse = exports.MsgCreateCertificate = exports.CertificateFilter = exports.Certificate = exports.CertificateID = exports.certificate_StateToJSON = exports.certificate_StateFromJSON = exports.Certificate_State = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.cert.v1beta2";
/** State is an enum which refers to state of deployment */
var Certificate_State;
(function (Certificate_State) {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    Certificate_State[Certificate_State["invalid"] = 0] = "invalid";
    /** valid - CertificateValid denotes state for deployment active */
    Certificate_State[Certificate_State["valid"] = 1] = "valid";
    /** revoked - CertificateRevoked denotes state for deployment closed */
    Certificate_State[Certificate_State["revoked"] = 2] = "revoked";
    Certificate_State[Certificate_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Certificate_State = exports.Certificate_State || (exports.Certificate_State = {}));
function certificate_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "invalid":
            return Certificate_State.invalid;
        case 1:
        case "valid":
            return Certificate_State.valid;
        case 2:
        case "revoked":
            return Certificate_State.revoked;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Certificate_State.UNRECOGNIZED;
    }
}
exports.certificate_StateFromJSON = certificate_StateFromJSON;
function certificate_StateToJSON(object) {
    switch (object) {
        case Certificate_State.invalid:
            return "invalid";
        case Certificate_State.valid:
            return "valid";
        case Certificate_State.revoked:
            return "revoked";
        case Certificate_State.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.certificate_StateToJSON = certificate_StateToJSON;
function createBaseCertificateID() {
    return { $type: "akash.cert.v1beta2.CertificateID", owner: "", serial: "" };
}
exports.CertificateID = {
    $type: "akash.cert.v1beta2.CertificateID",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.serial !== "") {
            writer.uint32(18).string(message.serial);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCertificateID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.serial = reader.string();
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
            $type: exports.CertificateID.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            serial: isSet(object.serial) ? String(object.serial) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.serial !== undefined && (obj.serial = message.serial);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCertificateID();
        message.owner = object.owner ?? "";
        message.serial = object.serial ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.CertificateID.$type, exports.CertificateID);
function createBaseCertificate() {
    return {
        $type: "akash.cert.v1beta2.Certificate",
        state: 0,
        cert: new Uint8Array(),
        pubkey: new Uint8Array()
    };
}
exports.Certificate = {
    $type: "akash.cert.v1beta2.Certificate",
    encode(message, writer = _m0.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(16).int32(message.state);
        }
        if (message.cert.length !== 0) {
            writer.uint32(26).bytes(message.cert);
        }
        if (message.pubkey.length !== 0) {
            writer.uint32(34).bytes(message.pubkey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCertificate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.cert = reader.bytes();
                    break;
                case 4:
                    message.pubkey = reader.bytes();
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
            $type: exports.Certificate.$type,
            state: isSet(object.state) ? certificate_StateFromJSON(object.state) : 0,
            cert: isSet(object.cert) ? bytesFromBase64(object.cert) : new Uint8Array(),
            pubkey: isSet(object.pubkey) ? bytesFromBase64(object.pubkey) : new Uint8Array()
        };
    },
    toJSON(message) {
        const obj = {};
        message.state !== undefined && (obj.state = certificate_StateToJSON(message.state));
        message.cert !== undefined && (obj.cert = base64FromBytes(message.cert !== undefined ? message.cert : new Uint8Array()));
        message.pubkey !== undefined && (obj.pubkey = base64FromBytes(message.pubkey !== undefined ? message.pubkey : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCertificate();
        message.state = object.state ?? 0;
        message.cert = object.cert ?? new Uint8Array();
        message.pubkey = object.pubkey ?? new Uint8Array();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Certificate.$type, exports.Certificate);
function createBaseCertificateFilter() {
    return {
        $type: "akash.cert.v1beta2.CertificateFilter",
        owner: "",
        serial: "",
        state: ""
    };
}
exports.CertificateFilter = {
    $type: "akash.cert.v1beta2.CertificateFilter",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.serial !== "") {
            writer.uint32(18).string(message.serial);
        }
        if (message.state !== "") {
            writer.uint32(26).string(message.state);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCertificateFilter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.serial = reader.string();
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
            $type: exports.CertificateFilter.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            serial: isSet(object.serial) ? String(object.serial) : "",
            state: isSet(object.state) ? String(object.state) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.serial !== undefined && (obj.serial = message.serial);
        message.state !== undefined && (obj.state = message.state);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCertificateFilter();
        message.owner = object.owner ?? "";
        message.serial = object.serial ?? "";
        message.state = object.state ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.CertificateFilter.$type, exports.CertificateFilter);
function createBaseMsgCreateCertificate() {
    return {
        $type: "akash.cert.v1beta2.MsgCreateCertificate",
        owner: "",
        cert: new Uint8Array(),
        pubkey: new Uint8Array()
    };
}
exports.MsgCreateCertificate = {
    $type: "akash.cert.v1beta2.MsgCreateCertificate",
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.cert.length !== 0) {
            writer.uint32(18).bytes(message.cert);
        }
        if (message.pubkey.length !== 0) {
            writer.uint32(26).bytes(message.pubkey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateCertificate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.cert = reader.bytes();
                    break;
                case 3:
                    message.pubkey = reader.bytes();
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
            $type: exports.MsgCreateCertificate.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            cert: isSet(object.cert) ? bytesFromBase64(object.cert) : new Uint8Array(),
            pubkey: isSet(object.pubkey) ? bytesFromBase64(object.pubkey) : new Uint8Array()
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.cert !== undefined && (obj.cert = base64FromBytes(message.cert !== undefined ? message.cert : new Uint8Array()));
        message.pubkey !== undefined && (obj.pubkey = base64FromBytes(message.pubkey !== undefined ? message.pubkey : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateCertificate();
        message.owner = object.owner ?? "";
        message.cert = object.cert ?? new Uint8Array();
        message.pubkey = object.pubkey ?? new Uint8Array();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateCertificate.$type, exports.MsgCreateCertificate);
function createBaseMsgCreateCertificateResponse() {
    return { $type: "akash.cert.v1beta2.MsgCreateCertificateResponse" };
}
exports.MsgCreateCertificateResponse = {
    $type: "akash.cert.v1beta2.MsgCreateCertificateResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateCertificateResponse();
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
            $type: exports.MsgCreateCertificateResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateCertificateResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateCertificateResponse.$type, exports.MsgCreateCertificateResponse);
function createBaseMsgRevokeCertificate() {
    return { $type: "akash.cert.v1beta2.MsgRevokeCertificate", id: undefined };
}
exports.MsgRevokeCertificate = {
    $type: "akash.cert.v1beta2.MsgRevokeCertificate",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.CertificateID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRevokeCertificate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.CertificateID.decode(reader, reader.uint32());
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
            $type: exports.MsgRevokeCertificate.$type,
            id: isSet(object.id) ? exports.CertificateID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.CertificateID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgRevokeCertificate();
        message.id = object.id !== undefined && object.id !== null ? exports.CertificateID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgRevokeCertificate.$type, exports.MsgRevokeCertificate);
function createBaseMsgRevokeCertificateResponse() {
    return { $type: "akash.cert.v1beta2.MsgRevokeCertificateResponse" };
}
exports.MsgRevokeCertificateResponse = {
    $type: "akash.cert.v1beta2.MsgRevokeCertificateResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRevokeCertificateResponse();
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
            $type: exports.MsgRevokeCertificateResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgRevokeCertificateResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgRevokeCertificateResponse.$type, exports.MsgRevokeCertificateResponse);
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateCertificate = this.CreateCertificate.bind(this);
        this.RevokeCertificate = this.RevokeCertificate.bind(this);
    }
    CreateCertificate(request) {
        const data = exports.MsgCreateCertificate.encode(request).finish();
        const promise = this.rpc.request("akash.cert.v1beta2.Msg", "CreateCertificate", data);
        return promise.then(data => exports.MsgCreateCertificateResponse.decode(new _m0.Reader(data)));
    }
    RevokeCertificate(request) {
        const data = exports.MsgRevokeCertificate.encode(request).finish();
        const promise = this.rpc.request("akash.cert.v1beta2.Msg", "RevokeCertificate", data);
        return promise.then(data => exports.MsgRevokeCertificateResponse.decode(new _m0.Reader(data)));
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
