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
const deploymentmsg_1 = require("./deploymentmsg");
const groupmsg_1 = require("./groupmsg");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta3";
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateDeployment = this.CreateDeployment.bind(this);
        this.DepositDeployment = this.DepositDeployment.bind(this);
        this.UpdateDeployment = this.UpdateDeployment.bind(this);
        this.CloseDeployment = this.CloseDeployment.bind(this);
        this.CloseGroup = this.CloseGroup.bind(this);
        this.PauseGroup = this.PauseGroup.bind(this);
        this.StartGroup = this.StartGroup.bind(this);
    }
    CreateDeployment(request) {
        const data = deploymentmsg_1.MsgCreateDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "CreateDeployment", data);
        return promise.then(data => deploymentmsg_1.MsgCreateDeploymentResponse.decode(new _m0.Reader(data)));
    }
    DepositDeployment(request) {
        const data = deploymentmsg_1.MsgDepositDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "DepositDeployment", data);
        return promise.then(data => deploymentmsg_1.MsgDepositDeploymentResponse.decode(new _m0.Reader(data)));
    }
    UpdateDeployment(request) {
        const data = deploymentmsg_1.MsgUpdateDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "UpdateDeployment", data);
        return promise.then(data => deploymentmsg_1.MsgUpdateDeploymentResponse.decode(new _m0.Reader(data)));
    }
    CloseDeployment(request) {
        const data = deploymentmsg_1.MsgCloseDeployment.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "CloseDeployment", data);
        return promise.then(data => deploymentmsg_1.MsgCloseDeploymentResponse.decode(new _m0.Reader(data)));
    }
    CloseGroup(request) {
        const data = groupmsg_1.MsgCloseGroup.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "CloseGroup", data);
        return promise.then(data => groupmsg_1.MsgCloseGroupResponse.decode(new _m0.Reader(data)));
    }
    PauseGroup(request) {
        const data = groupmsg_1.MsgPauseGroup.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "PauseGroup", data);
        return promise.then(data => groupmsg_1.MsgPauseGroupResponse.decode(new _m0.Reader(data)));
    }
    StartGroup(request) {
        const data = groupmsg_1.MsgStartGroup.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta3.Msg", "StartGroup", data);
        return promise.then(data => groupmsg_1.MsgStartGroupResponse.decode(new _m0.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
