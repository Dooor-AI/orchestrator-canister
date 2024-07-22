import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.market.v1beta2";
/** Params is the params for the x/market module */
export interface Params {
    $type: "akash.market.v1beta2.Params";
    bidMinDeposit: Coin | undefined;
    orderMaxBids: number;
}
export declare const Params: {
    $type: "akash.market.v1beta2.Params";
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["bidMinDeposit"], "$type" | "denom" | "amount">, never>) | undefined;
        orderMaxBids?: number | undefined;
    } & Record<Exclude<keyof I, "$type" | "bidMinDeposit" | "orderMaxBids">, never>>(object: I): Params;
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
