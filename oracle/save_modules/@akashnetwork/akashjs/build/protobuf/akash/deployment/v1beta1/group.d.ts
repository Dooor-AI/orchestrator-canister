import Long from "long";
import { PlacementRequirements } from "../../base/v1beta1/attribute";
import { ResourceUnits } from "../../base/v1beta1/resource";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta1";
/** MsgCloseGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgCloseGroup {
    $type: "akash.deployment.v1beta1.MsgCloseGroup";
    id: GroupID | undefined;
}
/** MsgCloseGroupResponse defines the Msg/CloseGroup response type. */
export interface MsgCloseGroupResponse {
    $type: "akash.deployment.v1beta1.MsgCloseGroupResponse";
}
/** MsgPauseGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgPauseGroup {
    $type: "akash.deployment.v1beta1.MsgPauseGroup";
    id: GroupID | undefined;
}
/** MsgPauseGroupResponse defines the Msg/PauseGroup response type. */
export interface MsgPauseGroupResponse {
    $type: "akash.deployment.v1beta1.MsgPauseGroupResponse";
}
/** MsgStartGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgStartGroup {
    $type: "akash.deployment.v1beta1.MsgStartGroup";
    id: GroupID | undefined;
}
/** MsgStartGroupResponse defines the Msg/StartGroup response type. */
export interface MsgStartGroupResponse {
    $type: "akash.deployment.v1beta1.MsgStartGroupResponse";
}
/** GroupID stores owner, deployment sequence number and group sequence number */
export interface GroupID {
    $type: "akash.deployment.v1beta1.GroupID";
    owner: string;
    dseq: Long;
    gseq: number;
}
/** GroupSpec stores group specifications */
export interface GroupSpec {
    $type: "akash.deployment.v1beta1.GroupSpec";
    name: string;
    requirements: PlacementRequirements | undefined;
    resources: Resource[];
}
/** Group stores group id, state and specifications of group */
export interface Group {
    $type: "akash.deployment.v1beta1.Group";
    groupId: GroupID | undefined;
    state: Group_State;
    groupSpec: GroupSpec | undefined;
    createdAt: Long;
}
/** State is an enum which refers to state of group */
export declare enum Group_State {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    invalid = 0,
    /** open - GroupOpen denotes state for group open */
    open = 1,
    /** paused - GroupOrdered denotes state for group ordered */
    paused = 2,
    /** insufficient_funds - GroupInsufficientFunds denotes state for group insufficient_funds */
    insufficient_funds = 3,
    /** closed - GroupClosed denotes state for group closed */
    closed = 4,
    UNRECOGNIZED = -1
}
export declare function group_StateFromJSON(object: any): Group_State;
export declare function group_StateToJSON(object: Group_State): string;
/** Resource stores unit, total count and price of resource */
export interface Resource {
    $type: "akash.deployment.v1beta1.Resource";
    resources: ResourceUnits | undefined;
    count: number;
    price: Coin | undefined;
}
export declare const MsgCloseGroup: {
    $type: "akash.deployment.v1beta1.MsgCloseGroup";
    encode(message: MsgCloseGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseGroup;
    fromJSON(object: any): MsgCloseGroup;
    toJSON(message: MsgCloseGroup): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } & {
            owner?: string | undefined;
            dseq?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["id"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
            gseq?: number | undefined;
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id">, never>>(object: I): MsgCloseGroup;
};
export declare const MsgCloseGroupResponse: {
    $type: "akash.deployment.v1beta1.MsgCloseGroupResponse";
    encode(_: MsgCloseGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseGroupResponse;
    fromJSON(_: any): MsgCloseGroupResponse;
    toJSON(_: MsgCloseGroupResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgCloseGroupResponse;
};
export declare const MsgPauseGroup: {
    $type: "akash.deployment.v1beta1.MsgPauseGroup";
    encode(message: MsgPauseGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPauseGroup;
    fromJSON(object: any): MsgPauseGroup;
    toJSON(message: MsgPauseGroup): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } & {
            owner?: string | undefined;
            dseq?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["id"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
            gseq?: number | undefined;
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id">, never>>(object: I): MsgPauseGroup;
};
export declare const MsgPauseGroupResponse: {
    $type: "akash.deployment.v1beta1.MsgPauseGroupResponse";
    encode(_: MsgPauseGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPauseGroupResponse;
    fromJSON(_: any): MsgPauseGroupResponse;
    toJSON(_: MsgPauseGroupResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgPauseGroupResponse;
};
export declare const MsgStartGroup: {
    $type: "akash.deployment.v1beta1.MsgStartGroup";
    encode(message: MsgStartGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartGroup;
    fromJSON(object: any): MsgStartGroup;
    toJSON(message: MsgStartGroup): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } & {
            owner?: string | undefined;
            dseq?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["id"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
            gseq?: number | undefined;
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id">, never>>(object: I): MsgStartGroup;
};
export declare const MsgStartGroupResponse: {
    $type: "akash.deployment.v1beta1.MsgStartGroupResponse";
    encode(_: MsgStartGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartGroupResponse;
    fromJSON(_: any): MsgStartGroupResponse;
    toJSON(_: MsgStartGroupResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgStartGroupResponse;
};
export declare const GroupID: {
    $type: "akash.deployment.v1beta1.GroupID";
    encode(message: GroupID, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupID;
    fromJSON(object: any): GroupID;
    toJSON(message: GroupID): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        dseq?: string | number | Long.Long | undefined;
        gseq?: number | undefined;
    } & {
        owner?: string | undefined;
        dseq?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & Record<Exclude<keyof I["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
        gseq?: number | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "dseq" | "gseq">, never>>(object: I): GroupID;
};
export declare const GroupSpec: {
    $type: "akash.deployment.v1beta1.GroupSpec";
    encode(message: GroupSpec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupSpec;
    fromJSON(object: any): GroupSpec;
    toJSON(message: GroupSpec): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        requirements?: {
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            signedBy?: {
                allOf?: string[] | undefined;
                anyOf?: string[] | undefined;
            } | undefined;
        } | undefined;
        resources?: {
            resources?: {
                storage?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                cpu?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    units?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                memory?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                endpoints?: {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        name?: string | undefined;
        requirements?: ({
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            signedBy?: {
                allOf?: string[] | undefined;
                anyOf?: string[] | undefined;
            } | undefined;
        } & {
            attributes?: ({
                key?: string | undefined;
                value?: string | undefined;
            }[] & ({
                key?: string | undefined;
                value?: string | undefined;
            } & {
                key?: string | undefined;
                value?: string | undefined;
            } & Record<Exclude<keyof I["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["requirements"]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            signedBy?: ({
                allOf?: string[] | undefined;
                anyOf?: string[] | undefined;
            } & {
                allOf?: (string[] & string[] & Record<Exclude<keyof I["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                anyOf?: (string[] & string[] & Record<Exclude<keyof I["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
            } & Record<Exclude<keyof I["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
        } & Record<Exclude<keyof I["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
        resources?: ({
            resources?: {
                storage?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                cpu?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    units?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                memory?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                endpoints?: {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[] & ({
            resources?: {
                storage?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                cpu?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    units?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                memory?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                endpoints?: {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            resources?: ({
                storage?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                cpu?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    units?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                memory?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                endpoints?: {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[] | undefined;
            } & {
                storage?: ({
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    attributes?: ({
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] & ({
                        key?: string | undefined;
                        value?: string | undefined;
                    } & {
                        key?: string | undefined;
                        value?: string | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    quantity?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
                cpu?: ({
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    units?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    attributes?: ({
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] & ({
                        key?: string | undefined;
                        value?: string | undefined;
                    } & {
                        key?: string | undefined;
                        value?: string | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    units?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
                memory?: ({
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    attributes?: ({
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] & ({
                        key?: string | undefined;
                        value?: string | undefined;
                    } & {
                        key?: string | undefined;
                        value?: string | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    quantity?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                endpoints?: ({
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[] & ({
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                } & {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
            count?: number | undefined;
            price?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
        } & Record<Exclude<keyof I["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["resources"], "$type" | keyof {
            resources?: {
                storage?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                cpu?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    units?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                memory?: {
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                    quantity?: {
                        val?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                endpoints?: {
                    kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "name" | "requirements" | "resources">, never>>(object: I): GroupSpec;
};
export declare const Group: {
    $type: "akash.deployment.v1beta1.Group";
    encode(message: Group, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Group;
    fromJSON(object: any): Group;
    toJSON(message: Group): unknown;
    fromPartial<I extends {
        state?: Group_State | undefined;
        createdAt?: string | number | Long.Long | undefined;
        groupId?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } | undefined;
        groupSpec?: {
            name?: string | undefined;
            requirements?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                signedBy?: {
                    allOf?: string[] | undefined;
                    anyOf?: string[] | undefined;
                } | undefined;
            } | undefined;
            resources?: {
                resources?: {
                    storage?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    cpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    memory?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    endpoints?: {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] | undefined;
                } | undefined;
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        state?: Group_State | undefined;
        createdAt?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & Record<Exclude<keyof I["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
        groupId?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
            gseq?: number | undefined;
        } & {
            owner?: string | undefined;
            dseq?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["groupId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
            gseq?: number | undefined;
        } & Record<Exclude<keyof I["groupId"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
        groupSpec?: ({
            name?: string | undefined;
            requirements?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                signedBy?: {
                    allOf?: string[] | undefined;
                    anyOf?: string[] | undefined;
                } | undefined;
            } | undefined;
            resources?: {
                resources?: {
                    storage?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    cpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    memory?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    endpoints?: {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] | undefined;
                } | undefined;
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] | undefined;
        } & {
            name?: string | undefined;
            requirements?: ({
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                signedBy?: {
                    allOf?: string[] | undefined;
                    anyOf?: string[] | undefined;
                } | undefined;
            } & {
                attributes?: ({
                    key?: string | undefined;
                    value?: string | undefined;
                }[] & ({
                    key?: string | undefined;
                    value?: string | undefined;
                } & {
                    key?: string | undefined;
                    value?: string | undefined;
                } & Record<Exclude<keyof I["groupSpec"]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groupSpec"]["requirements"]["attributes"], "$type" | keyof {
                    key?: string | undefined;
                    value?: string | undefined;
                }[]>, never>) | undefined;
                signedBy?: ({
                    allOf?: string[] | undefined;
                    anyOf?: string[] | undefined;
                } & {
                    allOf?: (string[] & string[] & Record<Exclude<keyof I["groupSpec"]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                    anyOf?: (string[] & string[] & Record<Exclude<keyof I["groupSpec"]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                } & Record<Exclude<keyof I["groupSpec"]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
            } & Record<Exclude<keyof I["groupSpec"]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
            resources?: ({
                resources?: {
                    storage?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    cpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    memory?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    endpoints?: {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] | undefined;
                } | undefined;
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] & ({
                resources?: {
                    storage?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    cpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    memory?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    endpoints?: {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] | undefined;
                } | undefined;
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            } & {
                resources?: ({
                    storage?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    cpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    memory?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    endpoints?: {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] | undefined;
                } & {
                    storage?: ({
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        attributes?: ({
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] & ({
                            key?: string | undefined;
                            value?: string | undefined;
                        } & {
                            key?: string | undefined;
                            value?: string | undefined;
                        } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
                    cpu?: ({
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        attributes?: ({
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] & ({
                            key?: string | undefined;
                            value?: string | undefined;
                        } & {
                            key?: string | undefined;
                            value?: string | undefined;
                        } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
                    memory?: ({
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        attributes?: ({
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] & ({
                            key?: string | undefined;
                            value?: string | undefined;
                        } & {
                            key?: string | undefined;
                            value?: string | undefined;
                        } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                    endpoints?: ({
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] & ({
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    } & {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
                count?: number | undefined;
                price?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["groupSpec"]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
            } & Record<Exclude<keyof I["groupSpec"]["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["groupSpec"]["resources"], "$type" | keyof {
                resources?: {
                    storage?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    cpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    memory?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    endpoints?: {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] | undefined;
                } | undefined;
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["groupSpec"], "$type" | "name" | "requirements" | "resources">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "state" | "createdAt" | "groupId" | "groupSpec">, never>>(object: I): Group;
};
export declare const Resource: {
    $type: "akash.deployment.v1beta1.Resource";
    encode(message: Resource, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Resource;
    fromJSON(object: any): Resource;
    toJSON(message: Resource): unknown;
    fromPartial<I extends {
        resources?: {
            storage?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                quantity?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            cpu?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                units?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            memory?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                quantity?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            endpoints?: {
                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
            }[] | undefined;
        } | undefined;
        count?: number | undefined;
        price?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
    } & {
        resources?: ({
            storage?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                quantity?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            cpu?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                units?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            memory?: {
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                quantity?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            endpoints?: {
                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
            }[] | undefined;
        } & {
            storage?: ({
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                quantity?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } & {
                attributes?: ({
                    key?: string | undefined;
                    value?: string | undefined;
                }[] & ({
                    key?: string | undefined;
                    value?: string | undefined;
                } & {
                    key?: string | undefined;
                    value?: string | undefined;
                } & Record<Exclude<keyof I["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"]["storage"]["attributes"], "$type" | keyof {
                    key?: string | undefined;
                    value?: string | undefined;
                }[]>, never>) | undefined;
                quantity?: ({
                    val?: Uint8Array | undefined;
                } & {
                    val?: Uint8Array | undefined;
                } & Record<Exclude<keyof I["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
            } & Record<Exclude<keyof I["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
            cpu?: ({
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                units?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } & {
                attributes?: ({
                    key?: string | undefined;
                    value?: string | undefined;
                }[] & ({
                    key?: string | undefined;
                    value?: string | undefined;
                } & {
                    key?: string | undefined;
                    value?: string | undefined;
                } & Record<Exclude<keyof I["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"]["cpu"]["attributes"], "$type" | keyof {
                    key?: string | undefined;
                    value?: string | undefined;
                }[]>, never>) | undefined;
                units?: ({
                    val?: Uint8Array | undefined;
                } & {
                    val?: Uint8Array | undefined;
                } & Record<Exclude<keyof I["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
            } & Record<Exclude<keyof I["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
            memory?: ({
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                quantity?: {
                    val?: Uint8Array | undefined;
                } | undefined;
            } & {
                attributes?: ({
                    key?: string | undefined;
                    value?: string | undefined;
                }[] & ({
                    key?: string | undefined;
                    value?: string | undefined;
                } & {
                    key?: string | undefined;
                    value?: string | undefined;
                } & Record<Exclude<keyof I["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"]["memory"]["attributes"], "$type" | keyof {
                    key?: string | undefined;
                    value?: string | undefined;
                }[]>, never>) | undefined;
                quantity?: ({
                    val?: Uint8Array | undefined;
                } & {
                    val?: Uint8Array | undefined;
                } & Record<Exclude<keyof I["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
            } & Record<Exclude<keyof I["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
            endpoints?: ({
                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
            }[] & ({
                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
            } & {
                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
            } & Record<Exclude<keyof I["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["resources"]["endpoints"], "$type" | keyof {
                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
        count?: number | undefined;
        price?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["price"], "$type" | "denom" | "amount">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "resources" | "count" | "price">, never>>(object: I): Resource;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P> | "$type">, never>;
export {};
