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
exports.QueryClientImpl = exports.QueryCertificatesResponse = exports.QueryCertificatesRequest = exports.CertificateResponse = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const cert_1 = require("./cert");
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.cert.v1beta3";
function createBaseCertificateResponse() {
    return {
        $type: "akash.cert.v1beta3.CertificateResponse",
        certificate: undefined,
        serial: ""
    };
}
exports.CertificateResponse = {
    $type: "akash.cert.v1beta3.CertificateResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.certificate !== undefined) {
            cert_1.Certificate.encode(message.certificate, writer.uint32(10).fork()).ldelim();
        }
        if (message.serial !== "") {
            writer.uint32(18).string(message.serial);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCertificateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.certificate = cert_1.Certificate.decode(reader, reader.uint32());
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
            $type: exports.CertificateResponse.$type,
            certificate: isSet(object.certificate) ? cert_1.Certificate.fromJSON(object.certificate) : undefined,
            serial: isSet(object.serial) ? String(object.serial) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.certificate !== undefined && (obj.certificate = message.certificate ? cert_1.Certificate.toJSON(message.certificate) : undefined);
        message.serial !== undefined && (obj.serial = message.serial);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCertificateResponse();
        message.certificate = object.certificate !== undefined && object.certificate !== null ? cert_1.Certificate.fromPartial(object.certificate) : undefined;
        message.serial = object.serial ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.CertificateResponse.$type, exports.CertificateResponse);
function createBaseQueryCertificatesRequest() {
    return {
        $type: "akash.cert.v1beta3.QueryCertificatesRequest",
        filter: undefined,
        pagination: undefined
    };
}
exports.QueryCertificatesRequest = {
    $type: "akash.cert.v1beta3.QueryCertificatesRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.filter !== undefined) {
            cert_1.CertificateFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCertificatesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filter = cert_1.CertificateFilter.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
            $type: exports.QueryCertificatesRequest.$type,
            filter: isSet(object.filter) ? cert_1.CertificateFilter.fromJSON(object.filter) : undefined,
            pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.filter !== undefined && (obj.filter = message.filter ? cert_1.CertificateFilter.toJSON(message.filter) : undefined);
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryCertificatesRequest();
        message.filter = object.filter !== undefined && object.filter !== null ? cert_1.CertificateFilter.fromPartial(object.filter) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryCertificatesRequest.$type, exports.QueryCertificatesRequest);
function createBaseQueryCertificatesResponse() {
    return {
        $type: "akash.cert.v1beta3.QueryCertificatesResponse",
        certificates: [],
        pagination: undefined
    };
}
exports.QueryCertificatesResponse = {
    $type: "akash.cert.v1beta3.QueryCertificatesResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.certificates) {
            exports.CertificateResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCertificatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.certificates.push(exports.CertificateResponse.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
            $type: exports.QueryCertificatesResponse.$type,
            certificates: Array.isArray(object?.certificates) ? object.certificates.map((e) => exports.CertificateResponse.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.certificates) {
            obj.certificates = message.certificates.map(e => (e ? exports.CertificateResponse.toJSON(e) : undefined));
        }
        else {
            obj.certificates = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryCertificatesResponse();
        message.certificates = object.certificates?.map(e => exports.CertificateResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryCertificatesResponse.$type, exports.QueryCertificatesResponse);
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Certificates = this.Certificates.bind(this);
    }
    Certificates(request) {
        const data = exports.QueryCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request("akash.cert.v1beta3.Query", "Certificates", data);
        return promise.then(data => exports.QueryCertificatesResponse.decode(new _m0.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
