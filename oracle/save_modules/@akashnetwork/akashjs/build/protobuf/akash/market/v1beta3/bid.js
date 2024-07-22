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
exports.BidFilters = exports.Bid = exports.BidID = exports.MsgCloseBidResponse = exports.MsgCloseBid = exports.MsgCreateBidResponse = exports.MsgCreateBid = exports.bid_StateToJSON = exports.bid_StateFromJSON = exports.Bid_State = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const order_1 = require("./order");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.market.v1beta3";
/** State is an enum which refers to state of bid */
var Bid_State;
(function (Bid_State) {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    Bid_State[Bid_State["invalid"] = 0] = "invalid";
    /** open - BidOpen denotes state for bid open */
    Bid_State[Bid_State["open"] = 1] = "open";
    /** active - BidMatched denotes state for bid open */
    Bid_State[Bid_State["active"] = 2] = "active";
    /** lost - BidLost denotes state for bid lost */
    Bid_State[Bid_State["lost"] = 3] = "lost";
    /** closed - BidClosed denotes state for bid closed */
    Bid_State[Bid_State["closed"] = 4] = "closed";
    Bid_State[Bid_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Bid_State = exports.Bid_State || (exports.Bid_State = {}));
function bid_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "invalid":
            return Bid_State.invalid;
        case 1:
        case "open":
            return Bid_State.open;
        case 2:
        case "active":
            return Bid_State.active;
        case 3:
        case "lost":
            return Bid_State.lost;
        case 4:
        case "closed":
            return Bid_State.closed;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Bid_State.UNRECOGNIZED;
    }
}
exports.bid_StateFromJSON = bid_StateFromJSON;
function bid_StateToJSON(object) {
    switch (object) {
        case Bid_State.invalid:
            return "invalid";
        case Bid_State.open:
            return "open";
        case Bid_State.active:
            return "active";
        case Bid_State.lost:
            return "lost";
        case Bid_State.closed:
            return "closed";
        case Bid_State.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.bid_StateToJSON = bid_StateToJSON;
function createBaseMsgCreateBid() {
    return {
        $type: "akash.market.v1beta3.MsgCreateBid",
        order: undefined,
        provider: "",
        price: undefined,
        deposit: undefined
    };
}
exports.MsgCreateBid = {
    $type: "akash.market.v1beta3.MsgCreateBid",
    encode(message, writer = _m0.Writer.create()) {
        if (message.order !== undefined) {
            order_1.OrderID.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        if (message.provider !== "") {
            writer.uint32(18).string(message.provider);
        }
        if (message.price !== undefined) {
            coin_1.DecCoin.encode(message.price, writer.uint32(26).fork()).ldelim();
        }
        if (message.deposit !== undefined) {
            coin_1.Coin.encode(message.deposit, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateBid();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = order_1.OrderID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.provider = reader.string();
                    break;
                case 3:
                    message.price = coin_1.DecCoin.decode(reader, reader.uint32());
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
            $type: exports.MsgCreateBid.$type,
            order: isSet(object.order) ? order_1.OrderID.fromJSON(object.order) : undefined,
            provider: isSet(object.provider) ? String(object.provider) : "",
            price: isSet(object.price) ? coin_1.DecCoin.fromJSON(object.price) : undefined,
            deposit: isSet(object.deposit) ? coin_1.Coin.fromJSON(object.deposit) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.order !== undefined && (obj.order = message.order ? order_1.OrderID.toJSON(message.order) : undefined);
        message.provider !== undefined && (obj.provider = message.provider);
        message.price !== undefined && (obj.price = message.price ? coin_1.DecCoin.toJSON(message.price) : undefined);
        message.deposit !== undefined && (obj.deposit = message.deposit ? coin_1.Coin.toJSON(message.deposit) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateBid();
        message.order = object.order !== undefined && object.order !== null ? order_1.OrderID.fromPartial(object.order) : undefined;
        message.provider = object.provider ?? "";
        message.price = object.price !== undefined && object.price !== null ? coin_1.DecCoin.fromPartial(object.price) : undefined;
        message.deposit = object.deposit !== undefined && object.deposit !== null ? coin_1.Coin.fromPartial(object.deposit) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateBid.$type, exports.MsgCreateBid);
function createBaseMsgCreateBidResponse() {
    return { $type: "akash.market.v1beta3.MsgCreateBidResponse" };
}
exports.MsgCreateBidResponse = {
    $type: "akash.market.v1beta3.MsgCreateBidResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateBidResponse();
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
            $type: exports.MsgCreateBidResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateBidResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCreateBidResponse.$type, exports.MsgCreateBidResponse);
function createBaseMsgCloseBid() {
    return { $type: "akash.market.v1beta3.MsgCloseBid", bidId: undefined };
}
exports.MsgCloseBid = {
    $type: "akash.market.v1beta3.MsgCloseBid",
    encode(message, writer = _m0.Writer.create()) {
        if (message.bidId !== undefined) {
            exports.BidID.encode(message.bidId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseBid();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bidId = exports.BidID.decode(reader, reader.uint32());
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
            $type: exports.MsgCloseBid.$type,
            bidId: isSet(object.bidId) ? exports.BidID.fromJSON(object.bidId) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.bidId !== undefined && (obj.bidId = message.bidId ? exports.BidID.toJSON(message.bidId) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCloseBid();
        message.bidId = object.bidId !== undefined && object.bidId !== null ? exports.BidID.fromPartial(object.bidId) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseBid.$type, exports.MsgCloseBid);
function createBaseMsgCloseBidResponse() {
    return { $type: "akash.market.v1beta3.MsgCloseBidResponse" };
}
exports.MsgCloseBidResponse = {
    $type: "akash.market.v1beta3.MsgCloseBidResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseBidResponse();
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
            $type: exports.MsgCloseBidResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCloseBidResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseBidResponse.$type, exports.MsgCloseBidResponse);
function createBaseBidID() {
    return {
        $type: "akash.market.v1beta3.BidID",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0,
        oseq: 0,
        provider: ""
    };
}
exports.BidID = {
    $type: "akash.market.v1beta3.BidID",
    encode(message, writer = _m0.Writer.create()) {
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBidID();
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
            $type: exports.BidID.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO,
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
        const message = createBaseBidID();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        message.oseq = object.oseq ?? 0;
        message.provider = object.provider ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.BidID.$type, exports.BidID);
function createBaseBid() {
    return {
        $type: "akash.market.v1beta3.Bid",
        bidId: undefined,
        state: 0,
        price: undefined,
        createdAt: long_1.default.ZERO
    };
}
exports.Bid = {
    $type: "akash.market.v1beta3.Bid",
    encode(message, writer = _m0.Writer.create()) {
        if (message.bidId !== undefined) {
            exports.BidID.encode(message.bidId, writer.uint32(10).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(16).int32(message.state);
        }
        if (message.price !== undefined) {
            coin_1.DecCoin.encode(message.price, writer.uint32(26).fork()).ldelim();
        }
        if (!message.createdAt.isZero()) {
            writer.uint32(32).int64(message.createdAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBid();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bidId = exports.BidID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.price = coin_1.DecCoin.decode(reader, reader.uint32());
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
            $type: exports.Bid.$type,
            bidId: isSet(object.bidId) ? exports.BidID.fromJSON(object.bidId) : undefined,
            state: isSet(object.state) ? bid_StateFromJSON(object.state) : 0,
            price: isSet(object.price) ? coin_1.DecCoin.fromJSON(object.price) : undefined,
            createdAt: isSet(object.createdAt) ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO
        };
    },
    toJSON(message) {
        const obj = {};
        message.bidId !== undefined && (obj.bidId = message.bidId ? exports.BidID.toJSON(message.bidId) : undefined);
        message.state !== undefined && (obj.state = bid_StateToJSON(message.state));
        message.price !== undefined && (obj.price = message.price ? coin_1.DecCoin.toJSON(message.price) : undefined);
        message.createdAt !== undefined && (obj.createdAt = (message.createdAt || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseBid();
        message.bidId = object.bidId !== undefined && object.bidId !== null ? exports.BidID.fromPartial(object.bidId) : undefined;
        message.state = object.state ?? 0;
        message.price = object.price !== undefined && object.price !== null ? coin_1.DecCoin.fromPartial(object.price) : undefined;
        message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Bid.$type, exports.Bid);
function createBaseBidFilters() {
    return {
        $type: "akash.market.v1beta3.BidFilters",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0,
        oseq: 0,
        provider: "",
        state: ""
    };
}
exports.BidFilters = {
    $type: "akash.market.v1beta3.BidFilters",
    encode(message, writer = _m0.Writer.create()) {
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
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBidFilters();
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
            $type: exports.BidFilters.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO,
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
        const message = createBaseBidFilters();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        message.oseq = object.oseq ?? 0;
        message.provider = object.provider ?? "";
        message.state = object.state ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.BidFilters.$type, exports.BidFilters);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
