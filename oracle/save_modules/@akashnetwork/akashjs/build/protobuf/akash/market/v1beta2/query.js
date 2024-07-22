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
exports.QueryClientImpl = exports.QueryLeaseResponse = exports.QueryLeaseRequest = exports.QueryLeasesResponse = exports.QueryLeasesRequest = exports.QueryBidResponse = exports.QueryBidRequest = exports.QueryBidsResponse = exports.QueryBidsRequest = exports.QueryOrderResponse = exports.QueryOrderRequest = exports.QueryOrdersResponse = exports.QueryOrdersRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const order_1 = require("./order");
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const bid_1 = require("./bid");
const types_1 = require("../../escrow/v1beta2/types");
const lease_1 = require("./lease");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.market.v1beta2";
function createBaseQueryOrdersRequest() {
    return {
        $type: "akash.market.v1beta2.QueryOrdersRequest",
        filters: undefined,
        pagination: undefined
    };
}
exports.QueryOrdersRequest = {
    $type: "akash.market.v1beta2.QueryOrdersRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.filters !== undefined) {
            order_1.OrderFilters.encode(message.filters, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryOrdersRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters = order_1.OrderFilters.decode(reader, reader.uint32());
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
            $type: exports.QueryOrdersRequest.$type,
            filters: isSet(object.filters) ? order_1.OrderFilters.fromJSON(object.filters) : undefined,
            pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.filters !== undefined && (obj.filters = message.filters ? order_1.OrderFilters.toJSON(message.filters) : undefined);
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryOrdersRequest();
        message.filters = object.filters !== undefined && object.filters !== null ? order_1.OrderFilters.fromPartial(object.filters) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryOrdersRequest.$type, exports.QueryOrdersRequest);
function createBaseQueryOrdersResponse() {
    return {
        $type: "akash.market.v1beta2.QueryOrdersResponse",
        orders: [],
        pagination: undefined
    };
}
exports.QueryOrdersResponse = {
    $type: "akash.market.v1beta2.QueryOrdersResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.orders) {
            order_1.Order.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryOrdersResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orders.push(order_1.Order.decode(reader, reader.uint32()));
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
            $type: exports.QueryOrdersResponse.$type,
            orders: Array.isArray(object?.orders) ? object.orders.map((e) => order_1.Order.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.orders) {
            obj.orders = message.orders.map(e => (e ? order_1.Order.toJSON(e) : undefined));
        }
        else {
            obj.orders = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryOrdersResponse();
        message.orders = object.orders?.map(e => order_1.Order.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryOrdersResponse.$type, exports.QueryOrdersResponse);
function createBaseQueryOrderRequest() {
    return { $type: "akash.market.v1beta2.QueryOrderRequest", id: undefined };
}
exports.QueryOrderRequest = {
    $type: "akash.market.v1beta2.QueryOrderRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            order_1.OrderID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryOrderRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = order_1.OrderID.decode(reader, reader.uint32());
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
            $type: exports.QueryOrderRequest.$type,
            id: isSet(object.id) ? order_1.OrderID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? order_1.OrderID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryOrderRequest();
        message.id = object.id !== undefined && object.id !== null ? order_1.OrderID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryOrderRequest.$type, exports.QueryOrderRequest);
function createBaseQueryOrderResponse() {
    return { $type: "akash.market.v1beta2.QueryOrderResponse", order: undefined };
}
exports.QueryOrderResponse = {
    $type: "akash.market.v1beta2.QueryOrderResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.order !== undefined) {
            order_1.Order.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryOrderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = order_1.Order.decode(reader, reader.uint32());
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
            $type: exports.QueryOrderResponse.$type,
            order: isSet(object.order) ? order_1.Order.fromJSON(object.order) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.order !== undefined && (obj.order = message.order ? order_1.Order.toJSON(message.order) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryOrderResponse();
        message.order = object.order !== undefined && object.order !== null ? order_1.Order.fromPartial(object.order) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryOrderResponse.$type, exports.QueryOrderResponse);
function createBaseQueryBidsRequest() {
    return {
        $type: "akash.market.v1beta2.QueryBidsRequest",
        filters: undefined,
        pagination: undefined
    };
}
exports.QueryBidsRequest = {
    $type: "akash.market.v1beta2.QueryBidsRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.filters !== undefined) {
            bid_1.BidFilters.encode(message.filters, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters = bid_1.BidFilters.decode(reader, reader.uint32());
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
            $type: exports.QueryBidsRequest.$type,
            filters: isSet(object.filters) ? bid_1.BidFilters.fromJSON(object.filters) : undefined,
            pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.filters !== undefined && (obj.filters = message.filters ? bid_1.BidFilters.toJSON(message.filters) : undefined);
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryBidsRequest();
        message.filters = object.filters !== undefined && object.filters !== null ? bid_1.BidFilters.fromPartial(object.filters) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryBidsRequest.$type, exports.QueryBidsRequest);
function createBaseQueryBidsResponse() {
    return {
        $type: "akash.market.v1beta2.QueryBidsResponse",
        bids: [],
        pagination: undefined
    };
}
exports.QueryBidsResponse = {
    $type: "akash.market.v1beta2.QueryBidsResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.bids) {
            exports.QueryBidResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bids.push(exports.QueryBidResponse.decode(reader, reader.uint32()));
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
            $type: exports.QueryBidsResponse.$type,
            bids: Array.isArray(object?.bids) ? object.bids.map((e) => exports.QueryBidResponse.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bids) {
            obj.bids = message.bids.map(e => (e ? exports.QueryBidResponse.toJSON(e) : undefined));
        }
        else {
            obj.bids = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryBidsResponse();
        message.bids = object.bids?.map(e => exports.QueryBidResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryBidsResponse.$type, exports.QueryBidsResponse);
function createBaseQueryBidRequest() {
    return { $type: "akash.market.v1beta2.QueryBidRequest", id: undefined };
}
exports.QueryBidRequest = {
    $type: "akash.market.v1beta2.QueryBidRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            bid_1.BidID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = bid_1.BidID.decode(reader, reader.uint32());
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
            $type: exports.QueryBidRequest.$type,
            id: isSet(object.id) ? bid_1.BidID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? bid_1.BidID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryBidRequest();
        message.id = object.id !== undefined && object.id !== null ? bid_1.BidID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryBidRequest.$type, exports.QueryBidRequest);
function createBaseQueryBidResponse() {
    return {
        $type: "akash.market.v1beta2.QueryBidResponse",
        bid: undefined,
        escrowAccount: undefined
    };
}
exports.QueryBidResponse = {
    $type: "akash.market.v1beta2.QueryBidResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.bid !== undefined) {
            bid_1.Bid.encode(message.bid, writer.uint32(10).fork()).ldelim();
        }
        if (message.escrowAccount !== undefined) {
            types_1.Account.encode(message.escrowAccount, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBidResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bid = bid_1.Bid.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.escrowAccount = types_1.Account.decode(reader, reader.uint32());
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
            $type: exports.QueryBidResponse.$type,
            bid: isSet(object.bid) ? bid_1.Bid.fromJSON(object.bid) : undefined,
            escrowAccount: isSet(object.escrowAccount) ? types_1.Account.fromJSON(object.escrowAccount) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.bid !== undefined && (obj.bid = message.bid ? bid_1.Bid.toJSON(message.bid) : undefined);
        message.escrowAccount !== undefined && (obj.escrowAccount = message.escrowAccount ? types_1.Account.toJSON(message.escrowAccount) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryBidResponse();
        message.bid = object.bid !== undefined && object.bid !== null ? bid_1.Bid.fromPartial(object.bid) : undefined;
        message.escrowAccount = object.escrowAccount !== undefined && object.escrowAccount !== null ? types_1.Account.fromPartial(object.escrowAccount) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryBidResponse.$type, exports.QueryBidResponse);
function createBaseQueryLeasesRequest() {
    return {
        $type: "akash.market.v1beta2.QueryLeasesRequest",
        filters: undefined,
        pagination: undefined
    };
}
exports.QueryLeasesRequest = {
    $type: "akash.market.v1beta2.QueryLeasesRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.filters !== undefined) {
            lease_1.LeaseFilters.encode(message.filters, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLeasesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters = lease_1.LeaseFilters.decode(reader, reader.uint32());
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
            $type: exports.QueryLeasesRequest.$type,
            filters: isSet(object.filters) ? lease_1.LeaseFilters.fromJSON(object.filters) : undefined,
            pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.filters !== undefined && (obj.filters = message.filters ? lease_1.LeaseFilters.toJSON(message.filters) : undefined);
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryLeasesRequest();
        message.filters = object.filters !== undefined && object.filters !== null ? lease_1.LeaseFilters.fromPartial(object.filters) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryLeasesRequest.$type, exports.QueryLeasesRequest);
function createBaseQueryLeasesResponse() {
    return {
        $type: "akash.market.v1beta2.QueryLeasesResponse",
        leases: [],
        pagination: undefined
    };
}
exports.QueryLeasesResponse = {
    $type: "akash.market.v1beta2.QueryLeasesResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.leases) {
            exports.QueryLeaseResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLeasesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.leases.push(exports.QueryLeaseResponse.decode(reader, reader.uint32()));
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
            $type: exports.QueryLeasesResponse.$type,
            leases: Array.isArray(object?.leases) ? object.leases.map((e) => exports.QueryLeaseResponse.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.leases) {
            obj.leases = message.leases.map(e => (e ? exports.QueryLeaseResponse.toJSON(e) : undefined));
        }
        else {
            obj.leases = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryLeasesResponse();
        message.leases = object.leases?.map(e => exports.QueryLeaseResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryLeasesResponse.$type, exports.QueryLeasesResponse);
function createBaseQueryLeaseRequest() {
    return { $type: "akash.market.v1beta2.QueryLeaseRequest", id: undefined };
}
exports.QueryLeaseRequest = {
    $type: "akash.market.v1beta2.QueryLeaseRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            lease_1.LeaseID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLeaseRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = lease_1.LeaseID.decode(reader, reader.uint32());
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
            $type: exports.QueryLeaseRequest.$type,
            id: isSet(object.id) ? lease_1.LeaseID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? lease_1.LeaseID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryLeaseRequest();
        message.id = object.id !== undefined && object.id !== null ? lease_1.LeaseID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryLeaseRequest.$type, exports.QueryLeaseRequest);
function createBaseQueryLeaseResponse() {
    return {
        $type: "akash.market.v1beta2.QueryLeaseResponse",
        lease: undefined,
        escrowPayment: undefined
    };
}
exports.QueryLeaseResponse = {
    $type: "akash.market.v1beta2.QueryLeaseResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.lease !== undefined) {
            lease_1.Lease.encode(message.lease, writer.uint32(10).fork()).ldelim();
        }
        if (message.escrowPayment !== undefined) {
            types_1.FractionalPayment.encode(message.escrowPayment, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLeaseResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.lease = lease_1.Lease.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.escrowPayment = types_1.FractionalPayment.decode(reader, reader.uint32());
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
            $type: exports.QueryLeaseResponse.$type,
            lease: isSet(object.lease) ? lease_1.Lease.fromJSON(object.lease) : undefined,
            escrowPayment: isSet(object.escrowPayment) ? types_1.FractionalPayment.fromJSON(object.escrowPayment) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.lease !== undefined && (obj.lease = message.lease ? lease_1.Lease.toJSON(message.lease) : undefined);
        message.escrowPayment !== undefined && (obj.escrowPayment = message.escrowPayment ? types_1.FractionalPayment.toJSON(message.escrowPayment) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryLeaseResponse();
        message.lease = object.lease !== undefined && object.lease !== null ? lease_1.Lease.fromPartial(object.lease) : undefined;
        message.escrowPayment =
            object.escrowPayment !== undefined && object.escrowPayment !== null ? types_1.FractionalPayment.fromPartial(object.escrowPayment) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryLeaseResponse.$type, exports.QueryLeaseResponse);
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Orders = this.Orders.bind(this);
        this.Order = this.Order.bind(this);
        this.Bids = this.Bids.bind(this);
        this.Bid = this.Bid.bind(this);
        this.Leases = this.Leases.bind(this);
        this.Lease = this.Lease.bind(this);
    }
    Orders(request) {
        const data = exports.QueryOrdersRequest.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta2.Query", "Orders", data);
        return promise.then(data => exports.QueryOrdersResponse.decode(new _m0.Reader(data)));
    }
    Order(request) {
        const data = exports.QueryOrderRequest.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta2.Query", "Order", data);
        return promise.then(data => exports.QueryOrderResponse.decode(new _m0.Reader(data)));
    }
    Bids(request) {
        const data = exports.QueryBidsRequest.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta2.Query", "Bids", data);
        return promise.then(data => exports.QueryBidsResponse.decode(new _m0.Reader(data)));
    }
    Bid(request) {
        const data = exports.QueryBidRequest.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta2.Query", "Bid", data);
        return promise.then(data => exports.QueryBidResponse.decode(new _m0.Reader(data)));
    }
    Leases(request) {
        const data = exports.QueryLeasesRequest.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta2.Query", "Leases", data);
        return promise.then(data => exports.QueryLeasesResponse.decode(new _m0.Reader(data)));
    }
    Lease(request) {
        const data = exports.QueryLeaseRequest.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta2.Query", "Lease", data);
        return promise.then(data => exports.QueryLeaseResponse.decode(new _m0.Reader(data)));
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
