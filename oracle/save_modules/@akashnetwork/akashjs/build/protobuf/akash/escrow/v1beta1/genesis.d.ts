import Long from "long";
import { Account, Payment } from "./types";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.escrow.v1beta1";
/** GenesisState defines the basic genesis state used by escrow module */
export interface GenesisState {
    $type: "akash.escrow.v1beta1.GenesisState";
    accounts: Account[];
    payments: Payment[];
}
export declare const GenesisState: {
    $type: "akash.escrow.v1beta1.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        accounts?: {
            owner?: string | undefined;
            id?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            state?: import("./types").Account_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            transferred?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            settledAt?: string | number | Long.Long | undefined;
        }[] | undefined;
        payments?: {
            owner?: string | undefined;
            state?: import("./types").Payment_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            accountId?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            paymentId?: string | undefined;
            rate?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            withdrawn?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        accounts?: ({
            owner?: string | undefined;
            id?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            state?: import("./types").Account_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            transferred?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            settledAt?: string | number | Long.Long | undefined;
        }[] & ({
            owner?: string | undefined;
            id?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            state?: import("./types").Account_State | undefined;
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
            } & Record<Exclude<keyof I["accounts"][number]["id"], "$type" | "scope" | "xid">, never>) | undefined;
            state?: import("./types").Account_State | undefined;
            balance?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["accounts"][number]["balance"], "$type" | "denom" | "amount">, never>) | undefined;
            transferred?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["accounts"][number]["transferred"], "$type" | "denom" | "amount">, never>) | undefined;
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
            } & Record<Exclude<keyof I["accounts"][number]["settledAt"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["accounts"][number], "$type" | "owner" | "id" | "state" | "balance" | "transferred" | "settledAt">, never>)[] & Record<Exclude<keyof I["accounts"], "$type" | keyof {
            owner?: string | undefined;
            id?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            state?: import("./types").Account_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            transferred?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            settledAt?: string | number | Long.Long | undefined;
        }[]>, never>) | undefined;
        payments?: ({
            owner?: string | undefined;
            state?: import("./types").Payment_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            accountId?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            paymentId?: string | undefined;
            rate?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            withdrawn?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[] & ({
            owner?: string | undefined;
            state?: import("./types").Payment_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            accountId?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            paymentId?: string | undefined;
            rate?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            withdrawn?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            owner?: string | undefined;
            state?: import("./types").Payment_State | undefined;
            balance?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["payments"][number]["balance"], "$type" | "denom" | "amount">, never>) | undefined;
            accountId?: ({
                scope?: string | undefined;
                xid?: string | undefined;
            } & {
                scope?: string | undefined;
                xid?: string | undefined;
            } & Record<Exclude<keyof I["payments"][number]["accountId"], "$type" | "scope" | "xid">, never>) | undefined;
            paymentId?: string | undefined;
            rate?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["payments"][number]["rate"], "$type" | "denom" | "amount">, never>) | undefined;
            withdrawn?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["payments"][number]["withdrawn"], "$type" | "denom" | "amount">, never>) | undefined;
        } & Record<Exclude<keyof I["payments"][number], "$type" | "owner" | "state" | "balance" | "accountId" | "paymentId" | "rate" | "withdrawn">, never>)[] & Record<Exclude<keyof I["payments"], "$type" | keyof {
            owner?: string | undefined;
            state?: import("./types").Payment_State | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            accountId?: {
                scope?: string | undefined;
                xid?: string | undefined;
            } | undefined;
            paymentId?: string | undefined;
            rate?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            withdrawn?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "accounts" | "payments">, never>>(object: I): GenesisState;
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
