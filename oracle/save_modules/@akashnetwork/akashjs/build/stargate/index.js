"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.getTypeUrl = exports.getAkashTypeRegistry = void 0;
const typeRegistry_1 = require("@akashnetwork/akash-api/typeRegistry");
const getAkashTypeRegistry = () => Array.from(typeRegistry_1.messageTypeRegistry).map(([path, type]) => [`/${path}`, type]);
exports.getAkashTypeRegistry = getAkashTypeRegistry;
const getTypeUrl = type => `/${type.$type}`;
exports.getTypeUrl = getTypeUrl;
/* TODO: this should be generated from the proto files */
var Message;
(function (Message) {
    Message["MsgCreateCertificate"] = "/akash.cert.v1beta3.MsgCreateCertificate";
    Message["MsgRevokeCertificate"] = "/akash.cert.v1beta3.MsgRevokeCertificate";
    Message["MsgCreateDeployment"] = "/akash.deployment.v1beta3.MsgCreateDeployment";
    Message["MsgCloseDeployment"] = "/akash.deployment.v1beta3.MsgCloseDeployment";
    Message["MsgDepositDeployment"] = "/akash.deployment.v1beta3.MsgDepositDeployment";
    Message["MsgUpdateDeployment"] = "/akash.deployment.v1beta3.MsgUpdateDeployment";
    Message["MsgCloseGroup"] = "/akash.deployment.v1beta3.MsgCloseGroup";
    Message["MsgPauseGroup"] = "/akash.deployment.v1beta3.MsgPauseGroup";
    Message["MsgStartGroup"] = "/akash.deployment.v1beta3.MsgStartGroup";
    Message["MsgCreateLease"] = "/akash.market.v1beta4.MsgCreateLease";
})(Message = exports.Message || (exports.Message = {}));
