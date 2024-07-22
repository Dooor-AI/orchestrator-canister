"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFilters = exports.Order = exports.OrderID = exports.order_StateToJSON = exports.order_StateFromJSON = exports.Order_State = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const group_1 = require("../../../akash/deployment/v1beta1/group");
exports.protobufPackage = "akash.market.v1beta1";
/** State is an enum which refers to state of order */
var Order_State;
(function (Order_State) {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    Order_State[Order_State["invalid"] = 0] = "invalid";
    /** open - OrderOpen denotes state for order open */
    Order_State[Order_State["open"] = 1] = "open";
    /** active - OrderMatched denotes state for order matched */
    Order_State[Order_State["active"] = 2] = "active";
    /** closed - OrderClosed denotes state for order lost */
    Order_State[Order_State["closed"] = 3] = "closed";
    Order_State[Order_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order_State = exports.Order_State || (exports.Order_State = {}));
function order_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "invalid":
            return Order_State.invalid;
        case 1:
        case "open":
            return Order_State.open;
        case 2:
        case "active":
            return Order_State.active;
        case 3:
        case "closed":
            return Order_State.closed;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order_State.UNRECOGNIZED;
    }
}
exports.order_StateFromJSON = order_StateFromJSON;
function order_StateToJSON(object) {
    switch (object) {
        case Order_State.invalid:
            return "invalid";
        case Order_State.open:
            return "open";
        case Order_State.active:
            return "active";
        case Order_State.closed:
            return "closed";
        default:
            return "UNKNOWN";
    }
}
exports.order_StateToJSON = order_StateToJSON;
function createBaseOrderID() {
    return {
        $type: "akash.market.v1beta1.OrderID",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0,
        oseq: 0
    };
}
exports.OrderID = {
    $type: "akash.market.v1beta1.OrderID",
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderID();
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            $type: exports.OrderID.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromString(object.dseq) : long_1.default.UZERO,
            gseq: isSet(object.gseq) ? Number(object.gseq) : 0,
            oseq: isSet(object.oseq) ? Number(object.oseq) : 0
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        message.gseq !== undefined && (obj.gseq = Math.round(message.gseq));
        message.oseq !== undefined && (obj.oseq = Math.round(message.oseq));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseOrderID();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        message.oseq = object.oseq ?? 0;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.OrderID.$type, exports.OrderID);
function createBaseOrder() {
    return {
        $type: "akash.market.v1beta1.Order",
        orderId: undefined,
        state: 0,
        spec: undefined,
        createdAt: long_1.default.ZERO
    };
}
exports.Order = {
    $type: "akash.market.v1beta1.Order",
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.orderId !== undefined) {
            exports.OrderID.encode(message.orderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(16).int32(message.state);
        }
        if (message.spec !== undefined) {
            group_1.GroupSpec.encode(message.spec, writer.uint32(26).fork()).ldelim();
        }
        if (!message.createdAt.isZero()) {
            writer.uint32(32).int64(message.createdAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = exports.OrderID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.spec = group_1.GroupSpec.decode(reader, reader.uint32());
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
            $type: exports.Order.$type,
            orderId: isSet(object.orderId) ? exports.OrderID.fromJSON(object.orderId) : undefined,
            state: isSet(object.state) ? order_StateFromJSON(object.state) : 0,
            spec: isSet(object.spec) ? group_1.GroupSpec.fromJSON(object.spec) : undefined,
            createdAt: isSet(object.createdAt) ? long_1.default.fromString(object.createdAt) : long_1.default.ZERO
        };
    },
    toJSON(message) {
        const obj = {};
        message.orderId !== undefined && (obj.orderId = message.orderId ? exports.OrderID.toJSON(message.orderId) : undefined);
        message.state !== undefined && (obj.state = order_StateToJSON(message.state));
        message.spec !== undefined && (obj.spec = message.spec ? group_1.GroupSpec.toJSON(message.spec) : undefined);
        message.createdAt !== undefined && (obj.createdAt = (message.createdAt || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseOrder();
        message.orderId = object.orderId !== undefined && object.orderId !== null ? exports.OrderID.fromPartial(object.orderId) : undefined;
        message.state = object.state ?? 0;
        message.spec = object.spec !== undefined && object.spec !== null ? group_1.GroupSpec.fromPartial(object.spec) : undefined;
        message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Order.$type, exports.Order);
function createBaseOrderFilters() {
    return {
        $type: "akash.market.v1beta1.OrderFilters",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0,
        oseq: 0,
        state: ""
    };
}
exports.OrderFilters = {
    $type: "akash.market.v1beta1.OrderFilters",
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
        if (message.state !== "") {
            writer.uint32(42).string(message.state);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderFilters();
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
            $type: exports.OrderFilters.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromString(object.dseq) : long_1.default.UZERO,
            gseq: isSet(object.gseq) ? Number(object.gseq) : 0,
            oseq: isSet(object.oseq) ? Number(object.oseq) : 0,
            state: isSet(object.state) ? String(object.state) : ""
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        message.gseq !== undefined && (obj.gseq = Math.round(message.gseq));
        message.oseq !== undefined && (obj.oseq = Math.round(message.oseq));
        message.state !== undefined && (obj.state = message.state);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseOrderFilters();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        message.oseq = object.oseq ?? 0;
        message.state = object.state ?? "";
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.OrderFilters.$type, exports.OrderFilters);
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
