import Long from "long";
import { Params } from "./params";
import { Order } from "./order";
import { Lease } from "./lease";
import { Bid } from "./bid";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.market.v1beta4";
/** GenesisState defines the basic genesis state used by market module */
export interface GenesisState {
    $type: "akash.market.v1beta4.GenesisState";
    params: Params | undefined;
    orders: Order[];
    leases: Lease[];
    bids: Bid[];
}
export declare const GenesisState: {
    $type: "akash.market.v1beta4.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        params?: {
            bidMinDeposit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            orderMaxBids?: number | undefined;
        } | undefined;
        orders?: {
            state?: import("./order").Order_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            orderId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                oseq?: number | undefined;
            } | undefined;
            spec?: {
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
            } | undefined;
        }[] | undefined;
        leases?: {
            state?: import("./lease").Lease_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            leaseId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            closedOn?: string | number | Long.Long | undefined;
        }[] | undefined;
        bids?: {
            state?: import("./bid").Bid_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            bidId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            resourcesOffer?: {
                resources?: {
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
                count?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        params?: ({
            bidMinDeposit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            orderMaxBids?: number | undefined;
        } & {
            bidMinDeposit?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["params"]["bidMinDeposit"], "$type" | "denom" | "amount">, never>) | undefined;
            orderMaxBids?: number | undefined;
        } & Record<Exclude<keyof I["params"], "$type" | "bidMinDeposit" | "orderMaxBids">, never>) | undefined;
        orders?: ({
            state?: import("./order").Order_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            orderId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                oseq?: number | undefined;
            } | undefined;
            spec?: {
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
            } | undefined;
        }[] & ({
            state?: import("./order").Order_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            orderId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                oseq?: number | undefined;
            } | undefined;
            spec?: {
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
            } | undefined;
        } & {
            state?: import("./order").Order_State | undefined;
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
            } & Record<Exclude<keyof I["orders"][number]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
            orderId?: ({
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                oseq?: number | undefined;
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
                } & Record<Exclude<keyof I["orders"][number]["orderId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                gseq?: number | undefined;
                oseq?: number | undefined;
            } & Record<Exclude<keyof I["orders"][number]["orderId"], "$type" | "owner" | "dseq" | "gseq" | "oseq">, never>) | undefined;
            spec?: ({
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
                    } & Record<Exclude<keyof I["orders"][number]["spec"]["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["requirements"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    signedBy?: ({
                        allOf?: string[] | undefined;
                        anyOf?: string[] | undefined;
                    } & {
                        allOf?: (string[] & string[] & Record<Exclude<keyof I["orders"][number]["spec"]["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                        anyOf?: (string[] & string[] & Record<Exclude<keyof I["orders"][number]["spec"]["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
                    } & Record<Exclude<keyof I["orders"][number]["spec"]["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
                } & Record<Exclude<keyof I["orders"][number]["spec"]["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
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
                    } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["storage"][number]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["storage"], "$type" | keyof {
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
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["cpu"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            units?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["memory"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            quantity?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                        endpoints?: ({
                            kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        }[] & ({
                            kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        } & {
                            kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                            sequenceNumber?: number | undefined;
                        } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["endpoints"], "$type" | keyof {
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
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["gpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["gpu"]["attributes"], "$type" | keyof {
                                key?: string | undefined;
                                value?: string | undefined;
                            }[]>, never>) | undefined;
                            units?: ({
                                val?: Uint8Array | undefined;
                            } & {
                                val?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["gpu"]["units"], "$type" | "val">, never>) | undefined;
                        } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"]["gpu"], "$type" | "attributes" | "units">, never>) | undefined;
                    } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number]["resource"], "$type" | "id" | "storage" | "cpu" | "memory" | "endpoints" | "gpu">, never>) | undefined;
                } & Record<Exclude<keyof I["orders"][number]["spec"]["resources"][number], "$type" | "count" | "price" | "resource">, never>)[] & Record<Exclude<keyof I["orders"][number]["spec"]["resources"], "$type" | keyof {
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
            } & Record<Exclude<keyof I["orders"][number]["spec"], "$type" | "name" | "requirements" | "resources">, never>) | undefined;
        } & Record<Exclude<keyof I["orders"][number], "$type" | "state" | "createdAt" | "orderId" | "spec">, never>)[] & Record<Exclude<keyof I["orders"], "$type" | keyof {
            state?: import("./order").Order_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            orderId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                oseq?: number | undefined;
            } | undefined;
            spec?: {
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
            } | undefined;
        }[]>, never>) | undefined;
        leases?: ({
            state?: import("./lease").Lease_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            leaseId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            closedOn?: string | number | Long.Long | undefined;
        }[] & ({
            state?: import("./lease").Lease_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            leaseId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            closedOn?: string | number | Long.Long | undefined;
        } & {
            state?: import("./lease").Lease_State | undefined;
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
            } & Record<Exclude<keyof I["leases"][number]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
            price?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["leases"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
            leaseId?: ({
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
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
                } & Record<Exclude<keyof I["leases"][number]["leaseId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } & Record<Exclude<keyof I["leases"][number]["leaseId"], "$type" | "owner" | "dseq" | "gseq" | "provider" | "oseq">, never>) | undefined;
            closedOn?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["leases"][number]["closedOn"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["leases"][number], "$type" | "state" | "createdAt" | "price" | "leaseId" | "closedOn">, never>)[] & Record<Exclude<keyof I["leases"], "$type" | keyof {
            state?: import("./lease").Lease_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            leaseId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            closedOn?: string | number | Long.Long | undefined;
        }[]>, never>) | undefined;
        bids?: ({
            state?: import("./bid").Bid_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            bidId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            resourcesOffer?: {
                resources?: {
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
                count?: number | undefined;
            }[] | undefined;
        }[] & ({
            state?: import("./bid").Bid_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            bidId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            resourcesOffer?: {
                resources?: {
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
                count?: number | undefined;
            }[] | undefined;
        } & {
            state?: import("./bid").Bid_State | undefined;
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
            } & Record<Exclude<keyof I["bids"][number]["createdAt"], "$type" | keyof Long.Long>, never>) | undefined;
            price?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["bids"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
            bidId?: ({
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
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
                } & Record<Exclude<keyof I["bids"][number]["bidId"]["dseq"], "$type" | keyof Long.Long>, never>) | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } & Record<Exclude<keyof I["bids"][number]["bidId"], "$type" | "owner" | "dseq" | "gseq" | "provider" | "oseq">, never>) | undefined;
            resourcesOffer?: ({
                resources?: {
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
                count?: number | undefined;
            }[] & ({
                resources?: {
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
                count?: number | undefined;
            } & {
                resources?: ({
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
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["storage"][number]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["storage"], "$type" | keyof {
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
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        quantity?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                    endpoints?: ({
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    }[] & ({
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    } & {
                        kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                        sequenceNumber?: number | undefined;
                    } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["endpoints"], "$type" | keyof {
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
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["gpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["gpu"]["attributes"], "$type" | keyof {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[]>, never>) | undefined;
                        units?: ({
                            val?: Uint8Array | undefined;
                        } & {
                            val?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["gpu"]["units"], "$type" | "val">, never>) | undefined;
                    } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"]["gpu"], "$type" | "attributes" | "units">, never>) | undefined;
                } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number]["resources"], "$type" | "id" | "storage" | "cpu" | "memory" | "endpoints" | "gpu">, never>) | undefined;
                count?: number | undefined;
            } & Record<Exclude<keyof I["bids"][number]["resourcesOffer"][number], "$type" | "resources" | "count">, never>)[] & Record<Exclude<keyof I["bids"][number]["resourcesOffer"], "$type" | keyof {
                resources?: {
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
                count?: number | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["bids"][number], "$type" | "state" | "createdAt" | "price" | "bidId" | "resourcesOffer">, never>)[] & Record<Exclude<keyof I["bids"], "$type" | keyof {
            state?: import("./bid").Bid_State | undefined;
            createdAt?: string | number | Long.Long | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            bidId?: {
                owner?: string | undefined;
                dseq?: string | number | Long.Long | undefined;
                gseq?: number | undefined;
                provider?: string | undefined;
                oseq?: number | undefined;
            } | undefined;
            resourcesOffer?: {
                resources?: {
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
                count?: number | undefined;
            }[] | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "params" | "orders" | "leases" | "bids">, never>>(object: I): GenesisState;
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
