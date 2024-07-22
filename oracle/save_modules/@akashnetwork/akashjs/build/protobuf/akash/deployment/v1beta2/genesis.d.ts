import Long from "long";
import { Deployment } from "./deployment";
import { Group } from "./group";
import { Params } from "./params";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta2";
/** GenesisDeployment defines the basic genesis state used by deployment module */
export interface GenesisDeployment {
    $type: "akash.deployment.v1beta2.GenesisDeployment";
    deployment: Deployment | undefined;
    groups: Group[];
}
/** GenesisState stores slice of genesis deployment instance */
export interface GenesisState {
    $type: "akash.deployment.v1beta2.GenesisState";
    deployments: GenesisDeployment[];
    params: Params | undefined;
}
export declare const GenesisDeployment: {
    $type: "akash.deployment.v1beta2.GenesisDeployment";
    encode(message: GenesisDeployment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisDeployment;
    fromJSON(object: any): GenesisDeployment;
    toJSON(message: GenesisDeployment): unknown;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        }[] | undefined;
                    } & {
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
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"], "$type" | keyof {
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        }[] & ({
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        } & {
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        } & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
                            kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
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
    } & Record<Exclude<keyof I, "$type" | "groups" | "deployment">, never>>(object: I): GenesisDeployment;
};
export declare const GenesisState: {
    $type: "akash.deployment.v1beta2.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
        }[] | undefined;
        params?: {
            deploymentMinDeposit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } | undefined;
    } & {
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
                            }[] | undefined;
                        } & {
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
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number]["attributes"], "$type" | keyof {
                                    key?: string | undefined;
                                    value?: string | undefined;
                                }[]>, never>) | undefined;
                                quantity?: ({
                                    val?: Uint8Array | undefined;
                                } & {
                                    val?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                            } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["storage"], "$type" | keyof {
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
                            }[] & ({
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
                            } & {
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
                            } & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["deployments"][number]["groups"][number]["groupSpec"]["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
        } & Record<Exclude<keyof I["deployments"][number], "$type" | "groups" | "deployment">, never>)[] & Record<Exclude<keyof I["deployments"], "$type" | keyof {
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
                                kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                                sequenceNumber?: number | undefined;
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
        }[]>, never>) | undefined;
        params?: ({
            deploymentMinDeposit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            deploymentMinDeposit?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["params"]["deploymentMinDeposit"], "$type" | "denom" | "amount">, never>) | undefined;
        } & Record<Exclude<keyof I["params"], "$type" | "deploymentMinDeposit">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "deployments" | "params">, never>>(object: I): GenesisState;
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
