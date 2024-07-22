import Long from "long";
import { GroupSpec, MsgCloseGroupResponse, MsgPauseGroupResponse, MsgStartGroupResponse, MsgCloseGroup, MsgPauseGroup, MsgStartGroup } from "./group";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta1";
/** MsgCreateDeployment defines an SDK message for creating deployment */
export interface MsgCreateDeployment {
    $type: "akash.deployment.v1beta1.MsgCreateDeployment";
    id: DeploymentID | undefined;
    groups: GroupSpec[];
    version: Uint8Array;
    deposit: Coin | undefined;
}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgCreateDeploymentResponse {
    $type: "akash.deployment.v1beta1.MsgCreateDeploymentResponse";
}
/** MsgDepositDeployment deposits more funds into the deposit account */
export interface MsgDepositDeployment {
    $type: "akash.deployment.v1beta1.MsgDepositDeployment";
    id: DeploymentID | undefined;
    amount: Coin | undefined;
}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgDepositDeploymentResponse {
    $type: "akash.deployment.v1beta1.MsgDepositDeploymentResponse";
}
/** MsgUpdateDeployment defines an SDK message for updating deployment */
export interface MsgUpdateDeployment {
    $type: "akash.deployment.v1beta1.MsgUpdateDeployment";
    id: DeploymentID | undefined;
    groups: GroupSpec[];
    version: Uint8Array;
}
/** MsgUpdateDeploymentResponse defines the Msg/UpdateDeployment response type. */
export interface MsgUpdateDeploymentResponse {
    $type: "akash.deployment.v1beta1.MsgUpdateDeploymentResponse";
}
/** MsgCloseDeployment defines an SDK message for closing deployment */
export interface MsgCloseDeployment {
    $type: "akash.deployment.v1beta1.MsgCloseDeployment";
    id: DeploymentID | undefined;
}
/** MsgCloseDeploymentResponse defines the Msg/CloseDeployment response type. */
export interface MsgCloseDeploymentResponse {
    $type: "akash.deployment.v1beta1.MsgCloseDeploymentResponse";
}
/** DeploymentID stores owner and sequence number */
export interface DeploymentID {
    $type: "akash.deployment.v1beta1.DeploymentID";
    owner: string;
    dseq: Long;
}
/** Deployment stores deploymentID, state and version details */
export interface Deployment {
    $type: "akash.deployment.v1beta1.Deployment";
    deploymentId: DeploymentID | undefined;
    state: Deployment_State;
    version: Uint8Array;
    createdAt: Long;
}
/** State is an enum which refers to state of deployment */
export declare enum Deployment_State {
    /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
    invalid = 0,
    /** active - DeploymentActive denotes state for deployment active */
    active = 1,
    /** closed - DeploymentClosed denotes state for deployment closed */
    closed = 2,
    UNRECOGNIZED = -1
}
export declare function deployment_StateFromJSON(object: any): Deployment_State;
export declare function deployment_StateToJSON(object: Deployment_State): string;
/** DeploymentFilters defines filters used to filter deployments */
export interface DeploymentFilters {
    $type: "akash.deployment.v1beta1.DeploymentFilters";
    owner: string;
    dseq: Long;
    state: string;
}
export declare const MsgCreateDeployment: {
    $type: "akash.deployment.v1beta1.MsgCreateDeployment";
    encode(message: MsgCreateDeployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDeployment;
    fromJSON(object: any): MsgCreateDeployment;
    toJSON(message: MsgCreateDeployment): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
        groups?: {
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
        }[] | undefined;
        version?: Uint8Array | undefined;
        deposit?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
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
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq">, never>) | undefined;
        groups?: ({
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
        }[] & ({
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
                } & Record<Exclude<keyof I["groups"][number]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["requirements"]["attributes"], "$type" | keyof {
                    key?: string | undefined;
                    value?: string | undefined;
                }[]>, never>) | undefined;
                signedBy?: ({
                    allOf?: string[] | undefined;
                    anyOf?: string[] | undefined;
                } & {
                    allOf?: (string[] & string[] & Record<Exclude<keyof I["groups"][number]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                    anyOf?: (string[] & string[] & Record<Exclude<keyof I["groups"][number]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
            } & Record<Exclude<keyof I["groups"][number]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                    endpoints?: ({
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] & ({
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    } & {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
                count?: number | undefined;
                price?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["groups"][number]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
            } & Record<Exclude<keyof I["groups"][number]["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"], "$type" | keyof {
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
        } & Record<Exclude<keyof I["groups"][number], "$type" | "name" | "requirements" | "resources">, never>)[] & Record<Exclude<keyof I["groups"], "$type" | keyof {
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
        }[]>, never>) | undefined;
        version?: Uint8Array | undefined;
        deposit?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["deposit"], "$type" | "denom" | "amount">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "groups" | "version" | "deposit">, never>>(object: I): MsgCreateDeployment;
};
export declare const MsgCreateDeploymentResponse: {
    $type: "akash.deployment.v1beta1.MsgCreateDeploymentResponse";
    encode(_: MsgCreateDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDeploymentResponse;
    fromJSON(_: any): MsgCreateDeploymentResponse;
    toJSON(_: MsgCreateDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgCreateDeploymentResponse;
};
export declare const MsgDepositDeployment: {
    $type: "akash.deployment.v1beta1.MsgDepositDeployment";
    encode(message: MsgDepositDeployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositDeployment;
    fromJSON(object: any): MsgDepositDeployment;
    toJSON(message: MsgDepositDeployment): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
        amount?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
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
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq">, never>) | undefined;
        amount?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["amount"], "$type" | "denom" | "amount">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "amount">, never>>(object: I): MsgDepositDeployment;
};
export declare const MsgDepositDeploymentResponse: {
    $type: "akash.deployment.v1beta1.MsgDepositDeploymentResponse";
    encode(_: MsgDepositDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositDeploymentResponse;
    fromJSON(_: any): MsgDepositDeploymentResponse;
    toJSON(_: MsgDepositDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgDepositDeploymentResponse;
};
export declare const MsgUpdateDeployment: {
    $type: "akash.deployment.v1beta1.MsgUpdateDeployment";
    encode(message: MsgUpdateDeployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDeployment;
    fromJSON(object: any): MsgUpdateDeployment;
    toJSON(message: MsgUpdateDeployment): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
        groups?: {
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
        }[] | undefined;
        version?: Uint8Array | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
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
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq">, never>) | undefined;
        groups?: ({
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
        }[] & ({
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
                } & Record<Exclude<keyof I["groups"][number]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["requirements"]["attributes"], "$type" | keyof {
                    key?: string | undefined;
                    value?: string | undefined;
                }[]>, never>) | undefined;
                signedBy?: ({
                    allOf?: string[] | undefined;
                    anyOf?: string[] | undefined;
                } & {
                    allOf?: (string[] & string[] & Record<Exclude<keyof I["groups"][number]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                    anyOf?: (string[] & string[] & Record<Exclude<keyof I["groups"][number]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
            } & Record<Exclude<keyof I["groups"][number]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                    endpoints?: ({
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[] & ({
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    } & {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                        kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
                count?: number | undefined;
                price?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["groups"][number]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
            } & Record<Exclude<keyof I["groups"][number]["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"], "$type" | keyof {
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
        } & Record<Exclude<keyof I["groups"][number], "$type" | "name" | "requirements" | "resources">, never>)[] & Record<Exclude<keyof I["groups"], "$type" | keyof {
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
        }[]>, never>) | undefined;
        version?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "groups" | "version">, never>>(object: I): MsgUpdateDeployment;
};
export declare const MsgUpdateDeploymentResponse: {
    $type: "akash.deployment.v1beta1.MsgUpdateDeploymentResponse";
    encode(_: MsgUpdateDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDeploymentResponse;
    fromJSON(_: any): MsgUpdateDeploymentResponse;
    toJSON(_: MsgUpdateDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgUpdateDeploymentResponse;
};
export declare const MsgCloseDeployment: {
    $type: "akash.deployment.v1beta1.MsgCloseDeployment";
    encode(message: MsgCloseDeployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseDeployment;
    fromJSON(object: any): MsgCloseDeployment;
    toJSON(message: MsgCloseDeployment): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
    } & {
        id?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
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
        } & Record<Exclude<keyof I["id"], "$type" | "owner" | "dseq">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id">, never>>(object: I): MsgCloseDeployment;
};
export declare const MsgCloseDeploymentResponse: {
    $type: "akash.deployment.v1beta1.MsgCloseDeploymentResponse";
    encode(_: MsgCloseDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseDeploymentResponse;
    fromJSON(_: any): MsgCloseDeploymentResponse;
    toJSON(_: MsgCloseDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgCloseDeploymentResponse;
};
export declare const DeploymentID: {
    $type: "akash.deployment.v1beta1.DeploymentID";
    encode(message: DeploymentID, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeploymentID;
    fromJSON(object: any): DeploymentID;
    toJSON(message: DeploymentID): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        dseq?: string | number | Long.Long | undefined;
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
    } & Record<Exclude<keyof I, "$type" | "owner" | "dseq">, never>>(object: I): DeploymentID;
};
export declare const Deployment: {
    $type: "akash.deployment.v1beta1.Deployment";
    encode(message: Deployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Deployment;
    fromJSON(object: any): Deployment;
    toJSON(message: Deployment): unknown;
    fromPartial<I extends {
        state?: Deployment_State | undefined;
        version?: Uint8Array | undefined;
        deploymentId?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
        createdAt?: string | number | Long.Long | undefined;
    } & {
        state?: Deployment_State | undefined;
        version?: Uint8Array | undefined;
        deploymentId?: ({
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
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
            } & Record<Exclude<keyof I["deploymentId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["deploymentId"], "$type" | "owner" | "dseq">, never>) | undefined;
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
    } & Record<Exclude<keyof I, "$type" | "state" | "version" | "deploymentId" | "createdAt">, never>>(object: I): Deployment;
};
export declare const DeploymentFilters: {
    $type: "akash.deployment.v1beta1.DeploymentFilters";
    encode(message: DeploymentFilters, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeploymentFilters;
    fromJSON(object: any): DeploymentFilters;
    toJSON(message: DeploymentFilters): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        state?: string | undefined;
        dseq?: string | number | Long.Long | undefined;
    } & {
        owner?: string | undefined;
        state?: string | undefined;
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
    } & Record<Exclude<keyof I, "$type" | "owner" | "state" | "dseq">, never>>(object: I): DeploymentFilters;
};
/** Msg defines the deployment Msg service. */
export interface Msg {
    /** CreateDeployment defines a method to create new deployment given proper inputs. */
    CreateDeployment(request: MsgCreateDeployment): Promise<MsgCreateDeploymentResponse>;
    /** DepositDeployment deposits more funds into the deployment account */
    DepositDeployment(request: MsgDepositDeployment): Promise<MsgDepositDeploymentResponse>;
    /** UpdateDeployment defines a method to update a deployment given proper inputs. */
    UpdateDeployment(request: MsgUpdateDeployment): Promise<MsgUpdateDeploymentResponse>;
    /** CloseDeployment defines a method to close a deployment given proper inputs. */
    CloseDeployment(request: MsgCloseDeployment): Promise<MsgCloseDeploymentResponse>;
    /** CloseGroup defines a method to close a group of a deployment given proper inputs. */
    CloseGroup(request: MsgCloseGroup): Promise<MsgCloseGroupResponse>;
    /** PauseGroup defines a method to close a group of a deployment given proper inputs. */
    PauseGroup(request: MsgPauseGroup): Promise<MsgPauseGroupResponse>;
    /** StartGroup defines a method to close a group of a deployment given proper inputs. */
    StartGroup(request: MsgStartGroup): Promise<MsgStartGroupResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateDeployment(request: MsgCreateDeployment): Promise<MsgCreateDeploymentResponse>;
    DepositDeployment(request: MsgDepositDeployment): Promise<MsgDepositDeploymentResponse>;
    UpdateDeployment(request: MsgUpdateDeployment): Promise<MsgUpdateDeploymentResponse>;
    CloseDeployment(request: MsgCloseDeployment): Promise<MsgCloseDeploymentResponse>;
    CloseGroup(request: MsgCloseGroup): Promise<MsgCloseGroupResponse>;
    PauseGroup(request: MsgPauseGroup): Promise<MsgPauseGroupResponse>;
    StartGroup(request: MsgStartGroup): Promise<MsgStartGroupResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P> | "$type">, never>;
export {};
