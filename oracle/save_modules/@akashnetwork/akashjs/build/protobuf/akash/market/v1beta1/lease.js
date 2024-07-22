"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgCloseLeaseResponse = exports.MsgCloseLease = exports.MsgWithdrawLeaseResponse = exports.MsgWithdrawLease = exports.MsgCreateLeaseResponse = exports.MsgCreateLease = exports.LeaseFilters = exports.Lease = exports.LeaseID = exports.lease_StateToJSON = exports.lease_StateFromJSON = exports.Lease_State = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const bid_1 = require("../../../akash/market/v1beta1/bid");
exports.protobufPackage = "akash.market.v1beta1";
/** State is an enum which refers to state of lease */
var Lease_State;
(function (Lease_State) {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    Lease_State[Lease_State["invalid"] = 0] = "invalid";
    /** active - LeaseActive denotes state for lease active */
    Lease_State[Lease_State["active"] = 1] = "active";
    /** insufficient_funds - LeaseInsufficientFunds denotes state for lease insufficient_funds */
    Lease_State[Lease_State["insufficient_funds"] = 2] = "insufficient_funds";
    /** closed - LeaseClosed denotes state for lease closed */
    Lease_State[Lease_State["closed"] = 3] = "closed";
    Lease_State[Lease_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Lease_State = exports.Lease_State || (exports.Lease_State = {}));
function lease_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "invalid":
            return Lease_State.invalid;
        case 1:
        case "active":
            return Lease_State.active;
        case 2:
        case "insufficient_funds":
            return Lease_State.insufficient_funds;
        case 3:
        case "closed":
            return Lease_State.closed;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Lease_State.UNRECOGNIZED;
    }
}
exports.lease_StateFromJSON = lease_StateFromJSON;
function lease_StateToJSON(object) {
    switch (object) {
        case Lease_State.invalid:
            return "invalid";
        case Lease_State.active:
            return "active";
        case Lease_State.insufficient_funds:
            return "insufficient_funds";
        case Lease_State.closed:
            return "closed";
        default:
            return "UNKNOWN";
    }
}
exports.lease_StateToJSON = lease_StateToJSON;
function createBaseLeaseID() {
    return {
        $type: "akash.market.v1beta1.LeaseID",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0,
        oseq: 0,
        provider: ""
    };
}
exports.LeaseID = {
    $type: "akash.market.v1beta1.LeaseID",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (!message.dseq.isZero()) {
            writer.uint32(16).uint64(message.dseq);
        }
        if (message.gseq !== 0) {
            writer.uint32(24).uint32(message.gseq);
        }
        if (message.oseq !== 0) {
            writer.uint32(32).uint32(message.oseq);
        }
        if (message.provider !== "") {
            writer.uint32(42).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLeaseID();
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
                    message.gseq = reader.uint32();
                    break;
                case 4:
                    message.oseq = reader.uint32();
                    break;
                case 5:
                    message.provider = reader.string();
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
            $type: exports.LeaseID.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromString(object.dseq) : long_1.default.UZERO,
            gseq: isSet(object.gseq) ? Number(object.gseq) : 0,
            oseq: isSet(object.oseq) ? Number(object.oseq) : 0,
            provider: isSet(object.provider) ? String(object.provider) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        message.gseq !== undefined && (obj.gseq = Math.round(message.gseq));
        message.oseq !== undefined && (obj.oseq = Math.round(message.oseq));
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseLeaseID();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        message.oseq = object.oseq ?? 0;
        message.provider = object.provider ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.LeaseID.$type, exports.LeaseID);
function createBaseLease() {
    return {
        $type: "akash.market.v1beta1.Lease",
        leaseId: undefined,
        state: 0,
        price: undefined,
        createdAt: long_1.default.ZERO
    };
}
exports.Lease = {
    $type: "akash.market.v1beta1.Lease",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.leaseId !== undefined) {
            exports.LeaseID.encode(message.leaseId, writer.uint32(10).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(16).int32(message.state);
        }
        if (message.price !== undefined) {
            coin_1.Coin.encode(message.price, writer.uint32(26).fork()).ldelim();
        }
        if (!message.createdAt.isZero()) {
            writer.uint32(32).int64(message.createdAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLease();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.leaseId = exports.LeaseID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.price = coin_1.Coin.decode(reader, reader.uint32());
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
            $type: exports.Lease.$type,
            leaseId: isSet(object.leaseId) ? exports.LeaseID.fromJSON(object.leaseId) : undefined,
            state: isSet(object.state) ? lease_StateFromJSON(object.state) : 0,
            price: isSet(object.price) ? coin_1.Coin.fromJSON(object.price) : undefined,
            createdAt: isSet(object.createdAt) ? long_1.default.fromString(object.createdAt) : long_1.default.ZERO
        };
    },
    toJSON(message) {
        const obj = {};
        message.leaseId !== undefined && (obj.leaseId = message.leaseId ? exports.LeaseID.toJSON(message.leaseId) : undefined);
        message.state !== undefined && (obj.state = lease_StateToJSON(message.state));
        message.price !== undefined && (obj.price = message.price ? coin_1.Coin.toJSON(message.price) : undefined);
        message.createdAt !== undefined && (obj.createdAt = (message.createdAt || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseLease();
        message.leaseId = object.leaseId !== undefined && object.leaseId !== null ? exports.LeaseID.fromPartial(object.leaseId) : undefined;
        message.state = object.state ?? 0;
        message.price = object.price !== undefined && object.price !== null ? coin_1.Coin.fromPartial(object.price) : undefined;
        message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Lease.$type, exports.Lease);
function createBaseLeaseFilters() {
    return {
        $type: "akash.market.v1beta1.LeaseFilters",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0,
        oseq: 0,
        provider: "",
        state: ""
    };
}
exports.LeaseFilters = {
    $type: "akash.market.v1beta1.LeaseFilters",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (!message.dseq.isZero()) {
            writer.uint32(16).uint64(message.dseq);
        }
        if (message.gseq !== 0) {
            writer.uint32(24).uint32(message.gseq);
        }
        if (message.oseq !== 0) {
            writer.uint32(32).uint32(message.oseq);
        }
        if (message.provider !== "") {
            writer.uint32(42).string(message.provider);
        }
        if (message.state !== "") {
            writer.uint32(50).string(message.state);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLeaseFilters();
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
                    message.gseq = reader.uint32();
                    break;
                case 4:
                    message.oseq = reader.uint32();
                    break;
                case 5:
                    message.provider = reader.string();
                    break;
                case 6:
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
            $type: exports.LeaseFilters.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromString(object.dseq) : long_1.default.UZERO,
            gseq: isSet(object.gseq) ? Number(object.gseq) : 0,
            oseq: isSet(object.oseq) ? Number(object.oseq) : 0,
            provider: isSet(object.provider) ? String(object.provider) : "",
            state: isSet(object.state) ? String(object.state) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        message.gseq !== undefined && (obj.gseq = Math.round(message.gseq));
        message.oseq !== undefined && (obj.oseq = Math.round(message.oseq));
        message.provider !== undefined && (obj.provider = message.provider);
        message.state !== undefined && (obj.state = message.state);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseLeaseFilters();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        message.oseq = object.oseq ?? 0;
        message.provider = object.provider ?? "";
        message.state = object.state ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.LeaseFilters.$type, exports.LeaseFilters);
function createBaseMsgCreateLease() {
    return { $type: "akash.market.v1beta1.MsgCreateLease", bidId: undefined };
}
exports.MsgCreateLease = {
    $type: "akash.market.v1beta1.MsgCreateLease",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bidId !== undefined) {
            bid_1.BidID.encode(message.bidId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateLease();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bidId = bid_1.BidID.decode(reader, reader.uint32());
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
            $type: exports.MsgCreateLease.$type,
            bidId: isSet(object.bidId) ? bid_1.BidID.fromJSON(object.bidId) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.bidId !== undefined && (obj.bidId = message.bidId ? bid_1.BidID.toJSON(message.bidId) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateLease();
        message.bidId = object.bidId !== undefined && object.bidId !== null ? bid_1.BidID.fromPartial(object.bidId) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateLease.$type, exports.MsgCreateLease);
function createBaseMsgCreateLeaseResponse() {
    return { $type: "akash.market.v1beta1.MsgCreateLeaseResponse" };
}
exports.MsgCreateLeaseResponse = {
    $type: "akash.market.v1beta1.MsgCreateLeaseResponse",
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateLeaseResponse();
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
            $type: exports.MsgCreateLeaseResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateLeaseResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateLeaseResponse.$type, exports.MsgCreateLeaseResponse);
function createBaseMsgWithdrawLease() {
    return { $type: "akash.market.v1beta1.MsgWithdrawLease", bidId: undefined };
}
exports.MsgWithdrawLease = {
    $type: "akash.market.v1beta1.MsgWithdrawLease",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bidId !== undefined) {
            exports.LeaseID.encode(message.bidId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawLease();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bidId = exports.LeaseID.decode(reader, reader.uint32());
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
            $type: exports.MsgWithdrawLease.$type,
            bidId: isSet(object.bidId) ? exports.LeaseID.fromJSON(object.bidId) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.bidId !== undefined && (obj.bidId = message.bidId ? exports.LeaseID.toJSON(message.bidId) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawLease();
        message.bidId = object.bidId !== undefined && object.bidId !== null ? exports.LeaseID.fromPartial(object.bidId) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgWithdrawLease.$type, exports.MsgWithdrawLease);
function createBaseMsgWithdrawLeaseResponse() {
    return { $type: "akash.market.v1beta1.MsgWithdrawLeaseResponse" };
}
exports.MsgWithdrawLeaseResponse = {
    $type: "akash.market.v1beta1.MsgWithdrawLeaseResponse",
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawLeaseResponse();
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
            $type: exports.MsgWithdrawLeaseResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgWithdrawLeaseResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgWithdrawLeaseResponse.$type, exports.MsgWithdrawLeaseResponse);
function createBaseMsgCloseLease() {
    return { $type: "akash.market.v1beta1.MsgCloseLease", leaseId: undefined };
}
exports.MsgCloseLease = {
    $type: "akash.market.v1beta1.MsgCloseLease",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.leaseId !== undefined) {
            exports.LeaseID.encode(message.leaseId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseLease();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.leaseId = exports.LeaseID.decode(reader, reader.uint32());
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
            $type: exports.MsgCloseLease.$type,
            leaseId: isSet(object.leaseId) ? exports.LeaseID.fromJSON(object.leaseId) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.leaseId !== undefined && (obj.leaseId = message.leaseId ? exports.LeaseID.toJSON(message.leaseId) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCloseLease();
        message.leaseId = object.leaseId !== undefined && object.leaseId !== null ? exports.LeaseID.fromPartial(object.leaseId) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseLease.$type, exports.MsgCloseLease);
function createBaseMsgCloseLeaseResponse() {
    return { $type: "akash.market.v1beta1.MsgCloseLeaseResponse" };
}
exports.MsgCloseLeaseResponse = {
    $type: "akash.market.v1beta1.MsgCloseLeaseResponse",
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseLeaseResponse();
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
            $type: exports.MsgCloseLeaseResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCloseLeaseResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseLeaseResponse.$type, exports.MsgCloseLeaseResponse);
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
