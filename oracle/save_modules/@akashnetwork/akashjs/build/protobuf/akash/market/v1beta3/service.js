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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.protobufPackage = void 0;
/* eslint-disable */
const bid_1 = require("./bid");
const lease_1 = require("./lease");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.market.v1beta3";
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateBid = this.CreateBid.bind(this);
        this.CloseBid = this.CloseBid.bind(this);
        this.WithdrawLease = this.WithdrawLease.bind(this);
        this.CreateLease = this.CreateLease.bind(this);
        this.CloseLease = this.CloseLease.bind(this);
    }
    CreateBid(request) {
        const data = bid_1.MsgCreateBid.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta3.Msg", "CreateBid", data);
        return promise.then(data => bid_1.MsgCreateBidResponse.decode(new _m0.Reader(data)));
    }
    CloseBid(request) {
        const data = bid_1.MsgCloseBid.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta3.Msg", "CloseBid", data);
        return promise.then(data => bid_1.MsgCloseBidResponse.decode(new _m0.Reader(data)));
    }
    WithdrawLease(request) {
        const data = lease_1.MsgWithdrawLease.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta3.Msg", "WithdrawLease", data);
        return promise.then(data => lease_1.MsgWithdrawLeaseResponse.decode(new _m0.Reader(data)));
    }
    CreateLease(request) {
        const data = lease_1.MsgCreateLease.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta3.Msg", "CreateLease", data);
        return promise.then(data => lease_1.MsgCreateLeaseResponse.decode(new _m0.Reader(data)));
    }
    CloseLease(request) {
        const data = lease_1.MsgCloseLease.encode(request).finish();
        const promise = this.rpc.request("akash.market.v1beta3.Msg", "CloseLease", data);
        return promise.then(data => lease_1.MsgCloseLeaseResponse.decode(new _m0.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
