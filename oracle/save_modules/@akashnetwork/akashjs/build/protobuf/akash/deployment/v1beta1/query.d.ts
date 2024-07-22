import Long from "long";
import { DeploymentFilters, DeploymentID, Deployment } from "./deployment";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Group, GroupID } from "./group";
import { Account } from "../../escrow/v1beta1/types";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta1";
/** QueryDeploymentsRequest is request type for the Query/Deployments RPC method */
export interface QueryDeploymentsRequest {
    $type: "akash.deployment.v1beta1.QueryDeploymentsRequest";
    filters: DeploymentFilters | undefined;
    pagination: PageRequest | undefined;
}
/** QueryDeploymentsResponse is response type for the Query/Deployments RPC method */
export interface QueryDeploymentsResponse {
    $type: "akash.deployment.v1beta1.QueryDeploymentsResponse";
    deployments: QueryDeploymentResponse[];
    pagination: PageResponse | undefined;
}
/** QueryDeploymentRequest is request type for the Query/Deployment RPC method */
export interface QueryDeploymentRequest {
    $type: "akash.deployment.v1beta1.QueryDeploymentRequest";
    id: DeploymentID | undefined;
}
/** QueryDeploymentResponse is response type for the Query/Deployment RPC method */
export interface QueryDeploymentResponse {
    $type: "akash.deployment.v1beta1.QueryDeploymentResponse";
    deployment: Deployment | undefined;
    groups: Group[];
    escrowAccount: Account | undefined;
}
/** QueryGroupRequest is request type for the Query/Group RPC method */
export interface QueryGroupRequest {
    $type: "akash.deployment.v1beta1.QueryGroupRequest";
    id: GroupID | undefined;
}
/** QueryGroupResponse is response type for the Query/Group RPC method */
export interface QueryGroupResponse {
    $type: "akash.deployment.v1beta1.QueryGroupResponse";
    group: Group | undefined;
}
export declare const QueryDeploymentsRequest: {
    $type: "akash.deployment.v1beta1.QueryDeploymentsRequest";
    encode(message: QueryDeploymentsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDeploymentsRequest;
    fromJSON(object: any): QueryDeploymentsRequest;
    toJSON(message: QueryDeploymentsRequest): unknown;
    fromPartial<I extends {
        pagination?: {
            key?: Uint8Array | undefined;
            reverse?: boolean | undefined;
            offset?: string | number | Long.Long | undefined;
            limit?: string | number | Long.Long | undefined;
            countTotal?: boolean | undefined;
        } | undefined;
        filters?: {
            owner?: string | undefined;
            state?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
    } & {
        pagination?: ({
            key?: Uint8Array | undefined;
            reverse?: boolean | undefined;
            offset?: string | number | Long.Long | undefined;
            limit?: string | number | Long.Long | undefined;
            countTotal?: boolean | undefined;
        } & {
            key?: Uint8Array | undefined;
            reverse?: boolean | undefined;
            offset?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["pagination"]["offset"], "$type" | keyof Long.Long>, never>) | undefined;
            limit?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["pagination"]["limit"], "$type" | keyof Long.Long>, never>) | undefined;
            countTotal?: boolean | undefined;
        } & Record<Exclude<keyof I["pagination"], "$type" | "key" | "reverse" | "offset" | "limit" | "countTotal">, never>) | undefined;
        filters?: ({
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
            } & Record<Exclude<keyof I["filters"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["filters"], "$type" | "owner" | "state" | "dseq">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "pagination" | "filters">, never>>(object: I): QueryDeploymentsRequest;
};
export declare const QueryDeploymentsResponse: {
    $type: "akash.deployment.v1beta1.QueryDeploymentsResponse";
    encode(message: QueryDeploymentsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDeploymentsResponse;
    fromJSON(object: any): QueryDeploymentsResponse;
    toJSON(message: QueryDeploymentsResponse): unknown;
    fromPartial<I extends {
        pagination?: {
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long.Long | undefined;
        } | undefined;
        deployments?: {
            groups?: {
                state?: import("./group").Group_State | undefined;
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
            }[] | undefined;
            deployment?: {
                state?: import("./deployment").Deployment_State | undefined;
                version?: Uint8Array | undefined;
                deploymentId?: {
                    owner?: string | undefined;
                    dseq?: string | number | Long.Long | undefined;
                } | undefined;
                createdAt?: string | number | Long.Long | undefined;
            } | undefined;
            escrowAccount?: {
                owner?: string | undefined;
                id?: {
                    scope?: string | undefined;
                    xid?: string | undefined;
                } | undefined;
                state?: import("../../escrow/v1beta1/types").Account_State | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                transferred?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                settledAt?: string | number | Long.Long | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        pagination?: ({
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long.Long | undefined;
        } & {
            nextKey?: Uint8Array | undefined;
            total?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["pagination"]["total"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["pagination"], "$type" | "nextKey" | "total">, never>) | undefined;
        deployments?: ({
            groups?: {
                state?: import("./group").Group_State | undefined;
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
            }[] | undefined;
            deployment?: {
                state?: import("./deployment").Deployment_State | undefined;
                version?: Uint8Array | undefined;
                deploymentId?: {
                    owner?: string | undefined;
                    dseq?: string | number | Long.Long | undefined;
                } | undefined;
                createdAt?: string | number | Long.Long | undefined;
            } | undefined;
            escrowAccount?: {
                owner?: string | undefined;
                id?: {
                    scope?: string | undefined;
                    xid?: string | undefined;
                } | undefined;
                state?: import("../../escrow/v1beta1/types").Account_State | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                transferred?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                settledAt?: string | number | Long.Long | undefined;
            } | undefined;
        }[] & ({
            groups?: {
                state?: import("./group").Group_State | undefined;
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
            }[] | undefined;
            deployment?: {
                state?: import("./deployment").Deployment_State | undefined;
                version?: Uint8Array | undefined;
                deploymentId?: {
                    owner?: string | undefined;
                    dseq?: string | number | Long.Long | undefined;
                } | undefined;
                createdAt?: string | number | Long.Long | undefined;
            } | undefined;
            escrowAccount?: {
                owner?: string | undefined;
                id?: {
                    scope?: string | undefined;
                    xid?: string | undefined;
                } | undefined;
                state?: import("../../escrow/v1beta1/types").Account_State | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                transferred?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                settledAt?: string | number | Long.Long | undefined;
            } | undefined;
        } & {
            groups?: ({
                state?: import("./group").Group_State | undefined;
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
            }[] & ({
                state?: import("./group").Group_State | undefined;
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
                state?: import("./group").Group_State | undefined;
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
                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
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
                    } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                    gseq?: number | undefined;
                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupId"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["requirements"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        signedBy?: ({
                            allOf?: string[] | undefined;
                            anyOf?: string[] | undefined;
                        } & {
                            allOf?: (string[] & string[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                            anyOf?: (string[] & string[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                        } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
                    } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
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
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                                    key?: string | undefined;
                                    value?: string | undefined;
                                }[]>, never>) | undefined;
                                quantity?: ({
                                    val?: Uint8Array | undefined;
                                } & {
                                    val?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                            } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
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
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                                    key?: string | undefined;
                                    value?: string | undefined;
                                }[]>, never>) | undefined;
                                units?: ({
                                    val?: Uint8Array | undefined;
                                } & {
                                    val?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                            } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                                    key?: string | undefined;
                                    value?: string | undefined;
                                }[]>, never>) | undefined;
                                quantity?: ({
                                    val?: Uint8Array | undefined;
                                } & {
                                    val?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                            } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                            endpoints?: ({
                                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                            }[] & ({
                                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                            } & {
                                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                            } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                                kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                            }[]>, never>) | undefined;
                        } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
                        count?: number | undefined;
                        price?: ({
                            denom?: string | undefined;
                            amount?: string | undefined;
                        } & {
                            denom?: string | undefined;
                            amount?: string | undefined;
                        } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
                    } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"], "$type" | keyof {
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
                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"], "$type" | "name" | "requirements" | "resources">, never>) | undefined;
            } & Record<Exclude<keyof I["deployments"][number]["groups"][number], "$type" | "state" | "createdAt" | "groupId" | "groupSpec">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"], "$type" | keyof {
                state?: import("./group").Group_State | undefined;
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
            }[]>, never>) | undefined;
            deployment?: ({
                state?: import("./deployment").Deployment_State | undefined;
                version?: Uint8Array | undefined;
                deploymentId?: {
                    owner?: string | undefined;
                    dseq?: string | number | Long.Long | undefined;
                } | undefined;
                createdAt?: string | number | Long.Long | undefined;
            } & {
                state?: import("./deployment").Deployment_State | undefined;
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
                    } & Record<Exclude<keyof I["deployments"][number]["deployment"]["deploymentId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                } & Record<Exclude<keyof I["deployments"][number]["deployment"]["deploymentId"], "$type" | "owner" | "dseq">, never>) | undefined;
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
                } & Record<Exclude<keyof I["deployments"][number]["deployment"]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
            } & Record<Exclude<keyof I["deployments"][number]["deployment"], "$type" | "state" | "version" | "deploymentId" | "createdAt">, never>) | undefined;
            escrowAccount?: ({
                owner?: string | undefined;
                id?: {
                    scope?: string | undefined;
                    xid?: string | undefined;
                } | undefined;
                state?: import("../../escrow/v1beta1/types").Account_State | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                transferred?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                settledAt?: string | number | Long.Long | undefined;
            } & {
                owner?: string | undefined;
                id?: ({
                    scope?: string | undefined;
                    xid?: string | undefined;
                } & {
                    scope?: string | undefined;
                    xid?: string | undefined;
                } & Record<Exclude<keyof I["deployments"][number]["escrowAccount"]["id"], "$type" | "scope" | "xid">, never>) | undefined;
                state?: import("../../escrow/v1beta1/types").Account_State | undefined;
                balance?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["deployments"][number]["escrowAccount"]["balance"], "$type" | "denom" | "amount">, never>) | undefined;
                transferred?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["deployments"][number]["escrowAccount"]["transferred"], "$type" | "denom" | "amount">, never>) | undefined;
                settledAt?: string | number | (Long.Long & {
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
                } & Record<Exclude<keyof I["deployments"][number]["escrowAccount"]["settledAt"], "$type" | keyof Long.Long>, never>) | undefined;
            } & Record<Exclude<keyof I["deployments"][number]["escrowAccount"], "$type" | "owner" | "id" | "state" | "balance" | "transferred" | "settledAt">, never>) | undefined;
        } & Record<Exclude<keyof I["deployments"][number], "$type" | "groups" | "deployment" | "escrowAccount">, never>)[] & Record<Exclude<keyof I["deployments"], "$type" | keyof {
            groups?: {
                state?: import("./group").Group_State | undefined;
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
            }[] | undefined;
            deployment?: {
                state?: import("./deployment").Deployment_State | undefined;
                version?: Uint8Array | undefined;
                deploymentId?: {
                    owner?: string | undefined;
                    dseq?: string | number | Long.Long | undefined;
                } | undefined;
                createdAt?: string | number | Long.Long | undefined;
            } | undefined;
            escrowAccount?: {
                owner?: string | undefined;
                id?: {
                    scope?: string | undefined;
                    xid?: string | undefined;
                } | undefined;
                state?: import("../../escrow/v1beta1/types").Account_State | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                transferred?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                settledAt?: string | number | Long.Long | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "pagination" | "deployments">, never>>(object: I): QueryDeploymentsResponse;
};
export declare const QueryDeploymentRequest: {
    $type: "akash.deployment.v1beta1.QueryDeploymentRequest";
    encode(message: QueryDeploymentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDeploymentRequest;
    fromJSON(object: any): QueryDeploymentRequest;
    toJSON(message: QueryDeploymentRequest): unknown;
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
    } & Record<Exclude<keyof I, "$type" | "id">, never>>(object: I): QueryDeploymentRequest;
};
export declare const QueryDeploymentResponse: {
    $type: "akash.deployment.v1beta1.QueryDeploymentResponse";
    encode(message: QueryDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDeploymentResponse;
    fromJSON(object: any): QueryDeploymentResponse;
    toJSON(message: QueryDeploymentResponse): unknown;
    fromPartial<I extends {
        groups?: {
            state?: import("./group").Group_State | undefined;
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
        }[] | undefined;
        deployment?: {
            state?: import("./deployment").Deployment_State | undefined;
            version?: Uint8Array | undefined;
            deploymentId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
            } | undefined;
            createdAt?: string | number | Long.Long | undefined;
        } | undefined;
        escrowAccount?: {
            owner?: string | undefined;
            id?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            state?: import("../../escrow/v1beta1/types").Account_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            transferred?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            settledAt?: string | number | Long.Long | undefined;
        } | undefined;
    } & {
        groups?: ({
            state?: import("./group").Group_State | undefined;
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
        }[] & ({
            state?: import("./group").Group_State | undefined;
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
            state?: import("./group").Group_State | undefined;
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
            } & Record<Exclude<keyof I["groups"][number]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
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
                } & Record<Exclude<keyof I["groups"][number]["groupId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                gseq?: number | undefined;
            } & Record<Exclude<keyof I["groups"][number]["groupId"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
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
                    } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["requirements"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    signedBy?: ({
                        allOf?: string[] | undefined;
                        anyOf?: string[] | undefined;
                    } & {
                        allOf?: (string[] & string[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                        anyOf?: (string[] & string[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            units?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                        endpoints?: ({
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        }[] & ({
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        } & {
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        }[]>, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
                    count?: number | undefined;
                    price?: ({
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"], "$type" | keyof {
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
            } & Record<Exclude<keyof I["groups"][number]["groupSpec"], "$type" | "name" | "requirements" | "resources">, never>) | undefined;
        } & Record<Exclude<keyof I["groups"][number], "$type" | "state" | "createdAt" | "groupId" | "groupSpec">, never>)[] & Record<Exclude<keyof I["groups"], "$type" | keyof {
            state?: import("./group").Group_State | undefined;
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
        }[]>, never>) | undefined;
        deployment?: ({
            state?: import("./deployment").Deployment_State | undefined;
            version?: Uint8Array | undefined;
            deploymentId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
            } | undefined;
            createdAt?: string | number | Long.Long | undefined;
        } & {
            state?: import("./deployment").Deployment_State | undefined;
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
                } & Record<Exclude<keyof I["deployment"]["deploymentId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
            } & Record<Exclude<keyof I["deployment"]["deploymentId"], "$type" | "owner" | "dseq">, never>) | undefined;
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
            } & Record<Exclude<keyof I["deployment"]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["deployment"], "$type" | "state" | "version" | "deploymentId" | "createdAt">, never>) | undefined;
        escrowAccount?: ({
            owner?: string | undefined;
            id?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            state?: import("../../escrow/v1beta1/types").Account_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            transferred?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            settledAt?: string | number | Long.Long | undefined;
        } & {
            owner?: string | undefined;
            id?: ({
                scope?: string | undefined;
                xid?: string | undefined;
            } & {
                scope?: string | undefined;
                xid?: string | undefined;
            } & Record<Exclude<keyof I["escrowAccount"]["id"], "$type" | "scope" | "xid">, never>) | undefined;
            state?: import("../../escrow/v1beta1/types").Account_State | undefined;
            balance?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["escrowAccount"]["balance"], "$type" | "denom" | "amount">, never>) | undefined;
            transferred?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["escrowAccount"]["transferred"], "$type" | "denom" | "amount">, never>) | undefined;
            settledAt?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["escrowAccount"]["settledAt"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["escrowAccount"], "$type" | "owner" | "id" | "state" | "balance" | "transferred" | "settledAt">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "groups" | "deployment" | "escrowAccount">, never>>(object: I): QueryDeploymentResponse;
};
export declare const QueryGroupRequest: {
    $type: "akash.deployment.v1beta1.QueryGroupRequest";
    encode(message: QueryGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupRequest;
    fromJSON(object: any): QueryGroupRequest;
    toJSON(message: QueryGroupRequest): unknown;
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
    } & Record<Exclude<keyof I, "$type" | "id">, never>>(object: I): QueryGroupRequest;
};
export declare const QueryGroupResponse: {
    $type: "akash.deployment.v1beta1.QueryGroupResponse";
    encode(message: QueryGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupResponse;
    fromJSON(object: any): QueryGroupResponse;
    toJSON(message: QueryGroupResponse): unknown;
    fromPartial<I extends {
        group?: {
            state?: import("./group").Group_State | undefined;
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
        } | undefined;
    } & {
        group?: ({
            state?: import("./group").Group_State | undefined;
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
            state?: import("./group").Group_State | undefined;
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
            } & Record<Exclude<keyof I["group"]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
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
                } & Record<Exclude<keyof I["group"]["groupId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                gseq?: number | undefined;
            } & Record<Exclude<keyof I["group"]["groupId"], "$type" | "owner" | "dseq" | "gseq">, never>) | undefined;
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
                    } & Record<Exclude<keyof I["group"]["groupSpec"]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["group"]["groupSpec"]["requirements"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    signedBy?: ({
                        allOf?: string[] | undefined;
                        anyOf?: string[] | undefined;
                    } & {
                        allOf?: (string[] & string[] & Record<Exclude<keyof I["group"]["groupSpec"]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                        anyOf?: (string[] & string[] & Record<Exclude<keyof I["group"]["groupSpec"]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                    } & Record<Exclude<keyof I["group"]["groupSpec"]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
                } & Record<Exclude<keyof I["group"]["groupSpec"]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["storage"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["storage"]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            units?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                        endpoints?: ({
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        }[] & ({
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        } & {
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                            kind?: import("../../base/v1beta1/endpoint").Endpoint_Kind | undefined;
                        }[]>, never>) | undefined;
                    } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
                    count?: number | undefined;
                    price?: ({
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
                } & Record<Exclude<keyof I["group"]["groupSpec"]["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["group"]["groupSpec"]["resources"], "$type" | keyof {
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
            } & Record<Exclude<keyof I["group"]["groupSpec"], "$type" | "name" | "requirements" | "resources">, never>) | undefined;
        } & Record<Exclude<keyof I["group"], "$type" | "state" | "createdAt" | "groupId" | "groupSpec">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "group">, never>>(object: I): QueryGroupResponse;
};
/** Query defines the gRPC querier service */
export interface Query {
    /** Deployments queries deployments */
    Deployments(request: QueryDeploymentsRequest): Promise<QueryDeploymentsResponse>;
    /** Deployment queries deployment details */
    Deployment(request: QueryDeploymentRequest): Promise<QueryDeploymentResponse>;
    /** Group queries group details */
    Group(request: QueryGroupRequest): Promise<QueryGroupResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Deployments(request: QueryDeploymentsRequest): Promise<QueryDeploymentsResponse>;
    Deployment(request: QueryDeploymentRequest): Promise<QueryDeploymentResponse>;
    Group(request: QueryGroupRequest): Promise<QueryGroupResponse>;
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
