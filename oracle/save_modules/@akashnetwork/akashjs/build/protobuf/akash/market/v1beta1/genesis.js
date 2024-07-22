"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const params_1 = require("../../../akash/market/v1beta1/params");
const order_1 = require("../../../akash/market/v1beta1/order");
const lease_1 = require("../../../akash/market/v1beta1/lease");
exports.protobufPackage = "akash.market.v1beta1";
function createBaseGenesisState() {
    return {
        $type: "akash.market.v1beta1.GenesisState",
        orders: [],
        leases: [],
        params: undefined
    };
}
exports.GenesisState = {
    $type: "akash.market.v1beta1.GenesisState",
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.orders) {
            order_1.Order.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.leases) {
            lease_1.Lease.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orders.push(order_1.Order.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.leases.push(lease_1.Lease.decode(reader, reader.uint32()));
                    break;
                case 3:
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
            orders: Array.isArray(object?.orders) ? object.orders.map((e) => order_1.Order.fromJSON(e)) : [],
            leases: Array.isArray(object?.leases) ? object.leases.map((e) => lease_1.Lease.fromJSON(e)) : [],
            params: isSet(object.params) ? params_1.Params.fromJSON(object.params) : undefined
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
        if (message.leases) {
            obj.leases = message.leases.map(e => (e ? lease_1.Lease.toJSON(e) : undefined));
        }
        else {
            obj.leases = [];
        }
        message.params !== undefined && (obj.params = message.params ? params_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.orders = object.orders?.map(e => order_1.Order.fromPartial(e)) || [];
        message.leases = object.leases?.map(e => lease_1.Lease.fromPartial(e)) || [];
        message.params = object.params !== undefined && object.params !== null ? params_1.Params.fromPartial(object.params) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GenesisState.$type, exports.GenesisState);
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
