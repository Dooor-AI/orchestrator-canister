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
exports.Resource = exports.Group = exports.GroupSpec = exports.GroupID = exports.MsgStartGroupResponse = exports.MsgStartGroup = exports.MsgPauseGroupResponse = exports.MsgPauseGroup = exports.MsgCloseGroupResponse = exports.MsgCloseGroup = exports.group_StateToJSON = exports.group_StateFromJSON = exports.Group_State = exports.protobufPackage = void 0;
/* eslint-disable */
const typeRegistry_1 = require("../../../typeRegistry");
const long_1 = __importDefault(require("long"));
const attribute_1 = require("../../base/v1beta1/attribute");
const resource_1 = require("../../base/v1beta1/resource");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "akash.deployment.v1beta1";
/** State is an enum which refers to state of group */
var Group_State;
(function (Group_State) {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    Group_State[Group_State["invalid"] = 0] = "invalid";
    /** open - GroupOpen denotes state for group open */
    Group_State[Group_State["open"] = 1] = "open";
    /** paused - GroupOrdered denotes state for group ordered */
    Group_State[Group_State["paused"] = 2] = "paused";
    /** insufficient_funds - GroupInsufficientFunds denotes state for group insufficient_funds */
    Group_State[Group_State["insufficient_funds"] = 3] = "insufficient_funds";
    /** closed - GroupClosed denotes state for group closed */
    Group_State[Group_State["closed"] = 4] = "closed";
    Group_State[Group_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Group_State = exports.Group_State || (exports.Group_State = {}));
function group_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "invalid":
            return Group_State.invalid;
        case 1:
        case "open":
            return Group_State.open;
        case 2:
        case "paused":
            return Group_State.paused;
        case 3:
        case "insufficient_funds":
            return Group_State.insufficient_funds;
        case 4:
        case "closed":
            return Group_State.closed;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Group_State.UNRECOGNIZED;
    }
}
exports.group_StateFromJSON = group_StateFromJSON;
function group_StateToJSON(object) {
    switch (object) {
        case Group_State.invalid:
            return "invalid";
        case Group_State.open:
            return "open";
        case Group_State.paused:
            return "paused";
        case Group_State.insufficient_funds:
            return "insufficient_funds";
        case Group_State.closed:
            return "closed";
        case Group_State.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.group_StateToJSON = group_StateToJSON;
function createBaseMsgCloseGroup() {
    return { $type: "akash.deployment.v1beta1.MsgCloseGroup", id: undefined };
}
exports.MsgCloseGroup = {
    $type: "akash.deployment.v1beta1.MsgCloseGroup",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseGroup();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.GroupID.decode(reader, reader.uint32());
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
            $type: exports.MsgCloseGroup.$type,
            id: isSet(object.id) ? exports.GroupID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.GroupID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgCloseGroup();
        message.id = object.id !== undefined && object.id !== null ? exports.GroupID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseGroup.$type, exports.MsgCloseGroup);
function createBaseMsgCloseGroupResponse() {
    return { $type: "akash.deployment.v1beta1.MsgCloseGroupResponse" };
}
exports.MsgCloseGroupResponse = {
    $type: "akash.deployment.v1beta1.MsgCloseGroupResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCloseGroupResponse();
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
            $type: exports.MsgCloseGroupResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCloseGroupResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgCloseGroupResponse.$type, exports.MsgCloseGroupResponse);
function createBaseMsgPauseGroup() {
    return { $type: "akash.deployment.v1beta1.MsgPauseGroup", id: undefined };
}
exports.MsgPauseGroup = {
    $type: "akash.deployment.v1beta1.MsgPauseGroup",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPauseGroup();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.GroupID.decode(reader, reader.uint32());
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
            $type: exports.MsgPauseGroup.$type,
            id: isSet(object.id) ? exports.GroupID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.GroupID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgPauseGroup();
        message.id = object.id !== undefined && object.id !== null ? exports.GroupID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgPauseGroup.$type, exports.MsgPauseGroup);
function createBaseMsgPauseGroupResponse() {
    return { $type: "akash.deployment.v1beta1.MsgPauseGroupResponse" };
}
exports.MsgPauseGroupResponse = {
    $type: "akash.deployment.v1beta1.MsgPauseGroupResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPauseGroupResponse();
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
            $type: exports.MsgPauseGroupResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgPauseGroupResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgPauseGroupResponse.$type, exports.MsgPauseGroupResponse);
function createBaseMsgStartGroup() {
    return { $type: "akash.deployment.v1beta1.MsgStartGroup", id: undefined };
}
exports.MsgStartGroup = {
    $type: "akash.deployment.v1beta1.MsgStartGroup",
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            exports.GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStartGroup();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = exports.GroupID.decode(reader, reader.uint32());
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
            $type: exports.MsgStartGroup.$type,
            id: isSet(object.id) ? exports.GroupID.fromJSON(object.id) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id ? exports.GroupID.toJSON(message.id) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgStartGroup();
        message.id = object.id !== undefined && object.id !== null ? exports.GroupID.fromPartial(object.id) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgStartGroup.$type, exports.MsgStartGroup);
function createBaseMsgStartGroupResponse() {
    return { $type: "akash.deployment.v1beta1.MsgStartGroupResponse" };
}
exports.MsgStartGroupResponse = {
    $type: "akash.deployment.v1beta1.MsgStartGroupResponse",
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStartGroupResponse();
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
            $type: exports.MsgStartGroupResponse.$type
        };
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgStartGroupResponse();
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.MsgStartGroupResponse.$type, exports.MsgStartGroupResponse);
function createBaseGroupID() {
    return {
        $type: "akash.deployment.v1beta1.GroupID",
        owner: "",
        dseq: long_1.default.UZERO,
        gseq: 0
    };
}
exports.GroupID = {
    $type: "akash.deployment.v1beta1.GroupID",
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupID();
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            $type: exports.GroupID.$type,
            owner: isSet(object.owner) ? String(object.owner) : "",
            dseq: isSet(object.dseq) ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO,
            gseq: isSet(object.gseq) ? Number(object.gseq) : 0
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.dseq !== undefined && (obj.dseq = (message.dseq || long_1.default.UZERO).toString());
        message.gseq !== undefined && (obj.gseq = Math.round(message.gseq));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupID();
        message.owner = object.owner ?? "";
        message.dseq = object.dseq !== undefined && object.dseq !== null ? long_1.default.fromValue(object.dseq) : long_1.default.UZERO;
        message.gseq = object.gseq ?? 0;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GroupID.$type, exports.GroupID);
function createBaseGroupSpec() {
    return {
        $type: "akash.deployment.v1beta1.GroupSpec",
        name: "",
        requirements: undefined,
        resources: []
    };
}
exports.GroupSpec = {
    $type: "akash.deployment.v1beta1.GroupSpec",
    encode(message, writer = _m0.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.requirements !== undefined) {
            attribute_1.PlacementRequirements.encode(message.requirements, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.resources) {
            exports.Resource.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupSpec();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.requirements = attribute_1.PlacementRequirements.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.resources.push(exports.Resource.decode(reader, reader.uint32()));
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
            $type: exports.GroupSpec.$type,
            name: isSet(object.name) ? String(object.name) : "",
            requirements: isSet(object.requirements) ? attribute_1.PlacementRequirements.fromJSON(object.requirements) : undefined,
            resources: Array.isArray(object?.resources) ? object.resources.map((e) => exports.Resource.fromJSON(e)) : []
        };
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.requirements !== undefined && (obj.requirements = message.requirements ? attribute_1.PlacementRequirements.toJSON(message.requirements) : undefined);
        if (message.resources) {
            obj.resources = message.resources.map(e => (e ? exports.Resource.toJSON(e) : undefined));
        }
        else {
            obj.resources = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroupSpec();
        message.name = object.name ?? "";
        message.requirements =
            object.requirements !== undefined && object.requirements !== null ? attribute_1.PlacementRequirements.fromPartial(object.requirements) : undefined;
        message.resources = object.resources?.map(e => exports.Resource.fromPartial(e)) || [];
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.GroupSpec.$type, exports.GroupSpec);
function createBaseGroup() {
    return {
        $type: "akash.deployment.v1beta1.Group",
        groupId: undefined,
        state: 0,
        groupSpec: undefined,
        createdAt: long_1.default.ZERO
    };
}
exports.Group = {
    $type: "akash.deployment.v1beta1.Group",
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== undefined) {
            exports.GroupID.encode(message.groupId, writer.uint32(10).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(16).int32(message.state);
        }
        if (message.groupSpec !== undefined) {
            exports.GroupSpec.encode(message.groupSpec, writer.uint32(26).fork()).ldelim();
        }
        if (!message.createdAt.isZero()) {
            writer.uint32(32).int64(message.createdAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroup();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = exports.GroupID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.groupSpec = exports.GroupSpec.decode(reader, reader.uint32());
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
            $type: exports.Group.$type,
            groupId: isSet(object.groupId) ? exports.GroupID.fromJSON(object.groupId) : undefined,
            state: isSet(object.state) ? group_StateFromJSON(object.state) : 0,
            groupSpec: isSet(object.groupSpec) ? exports.GroupSpec.fromJSON(object.groupSpec) : undefined,
            createdAt: isSet(object.createdAt) ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO
        };
    },
    toJSON(message) {
        const obj = {};
        message.groupId !== undefined && (obj.groupId = message.groupId ? exports.GroupID.toJSON(message.groupId) : undefined);
        message.state !== undefined && (obj.state = group_StateToJSON(message.state));
        message.groupSpec !== undefined && (obj.groupSpec = message.groupSpec ? exports.GroupSpec.toJSON(message.groupSpec) : undefined);
        message.createdAt !== undefined && (obj.createdAt = (message.createdAt || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGroup();
        message.groupId = object.groupId !== undefined && object.groupId !== null ? exports.GroupID.fromPartial(object.groupId) : undefined;
        message.state = object.state ?? 0;
        message.groupSpec = object.groupSpec !== undefined && object.groupSpec !== null ? exports.GroupSpec.fromPartial(object.groupSpec) : undefined;
        message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? long_1.default.fromValue(object.createdAt) : long_1.default.ZERO;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Group.$type, exports.Group);
function createBaseResource() {
    return {
        $type: "akash.deployment.v1beta1.Resource",
        resources: undefined,
        count: 0,
        price: undefined
    };
}
exports.Resource = {
    $type: "akash.deployment.v1beta1.Resource",
    encode(message, writer = _m0.Writer.create()) {
        if (message.resources !== undefined) {
            resource_1.ResourceUnits.encode(message.resources, writer.uint32(10).fork()).ldelim();
        }
        if (message.count !== 0) {
            writer.uint32(16).uint32(message.count);
        }
        if (message.price !== undefined) {
            coin_1.Coin.encode(message.price, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResource();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.resources = resource_1.ResourceUnits.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.count = reader.uint32();
                    break;
                case 3:
                    message.price = coin_1.Coin.decode(reader, reader.uint32());
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
            $type: exports.Resource.$type,
            resources: isSet(object.resources) ? resource_1.ResourceUnits.fromJSON(object.resources) : undefined,
            count: isSet(object.count) ? Number(object.count) : 0,
            price: isSet(object.price) ? coin_1.Coin.fromJSON(object.price) : undefined
        };
    },
    toJSON(message) {
        const obj = {};
        message.resources !== undefined && (obj.resources = message.resources ? resource_1.ResourceUnits.toJSON(message.resources) : undefined);
        message.count !== undefined && (obj.count = Math.round(message.count));
        message.price !== undefined && (obj.price = message.price ? coin_1.Coin.toJSON(message.price) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseResource();
        message.resources = object.resources !== undefined && object.resources !== null ? resource_1.ResourceUnits.fromPartial(object.resources) : undefined;
        message.count = object.count ?? 0;
        message.price = object.price !== undefined && object.price !== null ? coin_1.Coin.fromPartial(object.price) : undefined;
        return message;
    }
};
typeRegistry_1.messageTypeRegistry.set(exports.Resource.$type, exports.Resource);
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
