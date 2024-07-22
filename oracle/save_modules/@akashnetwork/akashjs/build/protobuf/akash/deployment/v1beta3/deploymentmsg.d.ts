import Long from "long";
import { DeploymentID } from "./deployment";
import { GroupSpec } from "./groupspec";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta3";
/** MsgCreateDeployment defines an SDK message for creating deployment */
export interface MsgCreateDeployment {
    $type: "akash.deployment.v1beta3.MsgCreateDeployment";
    id: DeploymentID | undefined;
    groups: GroupSpec[];
    version: Uint8Array;
    deposit: Coin | undefined;
    /** Depositor pays for the deposit */
    depositor: string;
}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgCreateDeploymentResponse {
    $type: "akash.deployment.v1beta3.MsgCreateDeploymentResponse";
}
/** MsgDepositDeployment deposits more funds into the deposit account */
export interface MsgDepositDeployment {
    $type: "akash.deployment.v1beta3.MsgDepositDeployment";
    id: DeploymentID | undefined;
    amount: Coin | undefined;
    /** Depositor pays for the deposit */
    depositor: string;
}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgDepositDeploymentResponse {
    $type: "akash.deployment.v1beta3.MsgDepositDeploymentResponse";
}
/** MsgUpdateDeployment defines an SDK message for updating deployment */
export interface MsgUpdateDeployment {
    $type: "akash.deployment.v1beta3.MsgUpdateDeployment";
    id: DeploymentID | undefined;
    version: Uint8Array;
}
/** MsgUpdateDeploymentResponse defines the Msg/UpdateDeployment response type. */
export interface MsgUpdateDeploymentResponse {
    $type: "akash.deployment.v1beta3.MsgUpdateDeploymentResponse";
}
/** MsgCloseDeployment defines an SDK message for closing deployment */
export interface MsgCloseDeployment {
    $type: "akash.deployment.v1beta3.MsgCloseDeployment";
    id: DeploymentID | undefined;
}
/** MsgCloseDeploymentResponse defines the Msg/CloseDeployment response type. */
export interface MsgCloseDeploymentResponse {
    $type: "akash.deployment.v1beta3.MsgCloseDeploymentResponse";
}
export declare const MsgCreateDeployment: {
    $type: "akash.deployment.v1beta3.MsgCreateDeployment";
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
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
        }[] | undefined;
        version?: Uint8Array | undefined;
        deposit?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        depositor?: string | undefined;
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
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
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
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
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
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            }[] & ({
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } & {
                count?: number | undefined;
                price?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["groups"][number]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
                resource?: ({
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                } & {
                    id?: number | undefined;
                    storage?: ({
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] & ({
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } & {
                        name?: string | undefined;
                        attributes?: ({
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] & ({
                            key?: string | undefined;
                            value?: string | undefined;
                        } & {
                            key?: string | undefined;
                            value?: string | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["storage"][number]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["storage"], "$type" | keyof {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[]>, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["cpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["memory"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                    endpoints?: ({
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] & ({
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    } & {
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["endpoints"], "$type" | keyof {
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[]>, never>) | undefined;
                    gpu?: ({
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
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["gpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["gpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["gpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"]["gpu"], "$type" | "attributes" | "units">, never>) | undefined;
                } & Record<Exclude<keyof I["groups"][number]["resources"][number]["resource"], "$type" | "id" | "storage" | "cpu" | "memory" | "endpoints" | "gpu">, never>) | undefined;
            } & Record<Exclude<keyof I["groups"][number]["resources"][number], "$type" | "count" | "price" | "resource">, never>)[] & Record<Exclude<keyof I["groups"][number]["resources"], "$type" | keyof {
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
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
                count?: number | undefined;
                price?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
                resource?: {
                    id?: number | undefined;
                    storage?: {
                        name?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        quantity?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
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
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] | undefined;
                    gpu?: {
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                        units?: {
                            val?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
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
        depositor?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "groups" | "version" | "deposit" | "depositor">, never>>(object: I): MsgCreateDeployment;
};
export declare const MsgCreateDeploymentResponse: {
    $type: "akash.deployment.v1beta3.MsgCreateDeploymentResponse";
    encode(_: MsgCreateDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDeploymentResponse;
    fromJSON(_: any): MsgCreateDeploymentResponse;
    toJSON(_: MsgCreateDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgCreateDeploymentResponse;
};
export declare const MsgDepositDeployment: {
    $type: "akash.deployment.v1beta3.MsgDepositDeployment";
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
        depositor?: string | undefined;
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
        depositor?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "amount" | "depositor">, never>>(object: I): MsgDepositDeployment;
};
export declare const MsgDepositDeploymentResponse: {
    $type: "akash.deployment.v1beta3.MsgDepositDeploymentResponse";
    encode(_: MsgDepositDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositDeploymentResponse;
    fromJSON(_: any): MsgDepositDeploymentResponse;
    toJSON(_: MsgDepositDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgDepositDeploymentResponse;
};
export declare const MsgUpdateDeployment: {
    $type: "akash.deployment.v1beta3.MsgUpdateDeployment";
    encode(message: MsgUpdateDeployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDeployment;
    fromJSON(object: any): MsgUpdateDeployment;
    toJSON(message: MsgUpdateDeployment): unknown;
    fromPartial<I extends {
        id?: {
            owner?: string | undefined;
            dseq?: string | number | Long.Long | undefined;
        } | undefined;
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
        version?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "version">, never>>(object: I): MsgUpdateDeployment;
};
export declare const MsgUpdateDeploymentResponse: {
    $type: "akash.deployment.v1beta3.MsgUpdateDeploymentResponse";
    encode(_: MsgUpdateDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDeploymentResponse;
    fromJSON(_: any): MsgUpdateDeploymentResponse;
    toJSON(_: MsgUpdateDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgUpdateDeploymentResponse;
};
export declare const MsgCloseDeployment: {
    $type: "akash.deployment.v1beta3.MsgCloseDeployment";
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
    $type: "akash.deployment.v1beta3.MsgCloseDeploymentResponse";
    encode(_: MsgCloseDeploymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseDeploymentResponse;
    fromJSON(_: any): MsgCloseDeploymentResponse;
    toJSON(_: MsgCloseDeploymentResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgCloseDeploymentResponse;
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
