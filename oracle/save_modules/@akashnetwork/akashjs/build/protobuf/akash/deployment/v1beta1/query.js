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
exports.QueryClientImpl = exports.QueryGroupResponse = exports.QueryGroupRequest = exports.QueryDeploymentResponse = exports.QueryDeploymentRequest = exports.QueryDeploymentsResponse = exports.QueryDeploymentsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const deployment_1 = require("./deployment");
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const group_1 = require("./group");
const types_1 = require("../../escrow/v1beta1/types");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta1";
function createBaseQueryDeploymentsRequest() {
    return {
        $type: "akash.deployment.v1beta1.QueryDeploymentsRequest",
        filters: undefined,
        pagination: undefined
    };
}
exports.QueryDeploymentsRequest = {
    $type: "akash.deployment.v1beta1.QueryDeploymentsRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.filters !== undefined) {
            deployment_1.DeploymentFilters.encode(message.filters, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDeploymentsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters = deployment_1.DeploymentFilters.decode(reader, reader.uint32());
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
            $type: exports.QueryDeploymentsRequest.$type,
            filters: isSet(object.filters) ? deployment_1.DeploymentFilters.fromJSON(object.filters) : undefined,
            pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.filters !== undefined && (obj.filters = message.filters ? deployment_1.DeploymentFilters.toJSON(message.filters) : undefined);
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryDeploymentsRequest();
        message.filters = object.filters !== undefined && object.filters !== null ? deployment_1.DeploymentFilters.fromPartial(object.filters) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryDeploymentsRequest.$type, exports.QueryDeploymentsRequest);
function createBaseQueryDeploymentsResponse() {
    return {
        $type: "akash.deployment.v1beta1.QueryDeploymentsResponse",
        deployments: [],
        pagination: undefined
    };
}
exports.QueryDeploymentsResponse = {
    $type: "akash.deployment.v1beta1.QueryDeploymentsResponse",
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.deployments) {
            exports.QueryDeploymentResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDeploymentsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deployments.push(exports.QueryDeploymentResponse.decode(reader, reader.uint32()));
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
            $type: exports.QueryDeploymentsResponse.$type,
            deployments: Array.isArray(object?.deployments) ? object.deployments.map((e) => exports.QueryDeploymentResponse.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.deployments) {
            obj.deployments = message.deployments.map(e => (e ? exports.QueryDeploymentResponse.toJSON(e) : undefined));
        }
        else {
            obj.deployments = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryDeploymentsResponse();
        message.deployments = object.deployments?.map(e => exports.QueryDeploymentResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryDeploymentsResponse.$type, exports.QueryDeploymentsResponse);
function createBaseQueryDeploymentRequest() {
    return {
        $type: "akash.deployment.v1beta1.QueryDeploymentRequest",
        id: undefined
    };
}
exports.QueryDeploymentRequest = {
    $type: "akash.deployment.v1beta1.QueryDeploymentRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            deployment_1.DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDeploymentRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = deployment_1.DeploymentID.decode(reader, reader.uint32());
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
            $type: exports.QueryDeploymentRequest.$type,
            id: isSet(object.id) ? deployment_1.DeploymentID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? deployment_1.DeploymentID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryDeploymentRequest();
        message.id = object.id !== undefined && object.id !== null ? deployment_1.DeploymentID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryDeploymentRequest.$type, exports.QueryDeploymentRequest);
function createBaseQueryDeploymentResponse() {
    return {
        $type: "akash.deployment.v1beta1.QueryDeploymentResponse",
        deployment: undefined,
        groups: [],
        escrowAccount: undefined
    };
}
exports.QueryDeploymentResponse = {
    $type: "akash.deployment.v1beta1.QueryDeploymentResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.deployment !== undefined) {
            deployment_1.Deployment.encode(message.deployment, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.groups) {
            group_1.Group.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.escrowAccount !== undefined) {
            types_1.Account.encode(message.escrowAccount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDeploymentResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.deployment = deployment_1.Deployment.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.groups.push(group_1.Group.decode(reader, reader.uint32()));
                    break;
                case 3:
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
            $type: exports.QueryDeploymentResponse.$type,
            deployment: isSet(object.deployment) ? deployment_1.Deployment.fromJSON(object.deployment) : undefined,
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => group_1.Group.fromJSON(e)) : [],
            escrowAccount: isSet(object.escrowAccount) ? types_1.Account.fromJSON(object.escrowAccount) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.deployment !== undefined && (obj.deployment = message.deployment ? deployment_1.Deployment.toJSON(message.deployment) : undefined);
        if (message.groups) {
            obj.groups = message.groups.map(e => (e ? group_1.Group.toJSON(e) : undefined));
        }
        else {
            obj.groups = [];
        }
        message.escrowAccount !== undefined && (obj.escrowAccount = message.escrowAccount ? types_1.Account.toJSON(message.escrowAccount) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryDeploymentResponse();
        message.deployment = object.deployment !== undefined && object.deployment !== null ? deployment_1.Deployment.fromPartial(object.deployment) : undefined;
        message.groups = object.groups?.map(e => group_1.Group.fromPartial(e)) || [];
        message.escrowAccount = object.escrowAccount !== undefined && object.escrowAccount !== null ? types_1.Account.fromPartial(object.escrowAccount) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryDeploymentResponse.$type, exports.QueryDeploymentResponse);
function createBaseQueryGroupRequest() {
    return { $type: "akash.deployment.v1beta1.QueryGroupRequest", id: undefined };
}
exports.QueryGroupRequest = {
    $type: "akash.deployment.v1beta1.QueryGroupRequest",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            group_1.GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGroupRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = group_1.GroupID.decode(reader, reader.uint32());
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
            $type: exports.QueryGroupRequest.$type,
            id: isSet(object.id) ? group_1.GroupID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? group_1.GroupID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryGroupRequest();
        message.id = object.id !== undefined && object.id !== null ? group_1.GroupID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryGroupRequest.$type, exports.QueryGroupRequest);
function createBaseQueryGroupResponse() {
    return {
        $type: "akash.deployment.v1beta1.QueryGroupResponse",
        group: undefined
    };
}
exports.QueryGroupResponse = {
    $type: "akash.deployment.v1beta1.QueryGroupResponse",
    encode(message, writer = _m0.Writer.create()) {
        if (message.group !== undefined) {
            group_1.Group.encode(message.group, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGroupResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.group = group_1.Group.decode(reader, reader.uint32());
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
            $type: exports.QueryGroupResponse.$type,
            group: isSet(object.group) ? group_1.Group.fromJSON(object.group) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.group !== undefined && (obj.group = message.group ? group_1.Group.toJSON(message.group) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryGroupResponse();
        message.group = object.group !== undefined && object.group !== null ? group_1.Group.fromPartial(object.group) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.QueryGroupResponse.$type, exports.QueryGroupResponse);
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Deployments = this.Deployments.bind(this);
        this.Deployment = this.Deployment.bind(this);
        this.Group = this.Group.bind(this);
    }
    Deployments(request) {
        const data = exports.QueryDeploymentsRequest.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Query", "Deployments", data);
        return promise.then(data => exports.QueryDeploymentsResponse.decode(new _m0.Reader(data)));
    }
    Deployment(request) {
        const data = exports.QueryDeploymentRequest.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Query", "Deployment", data);
        return promise.then(data => exports.QueryDeploymentResponse.decode(new _m0.Reader(data)));
    }
    Group(request) {
        const data = exports.QueryGroupRequest.encode(request).finish();
        const promise = this.rpc.request("akash.deployment.v1beta1.Query", "Group", data);
        return promise.then(data => exports.QueryGroupResponse.decode(new _m0.Reader(data)));
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
