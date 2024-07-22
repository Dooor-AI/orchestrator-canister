import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.take.v1beta3";
/** DenomTakeRate describes take rate for specified denom */
export interface DenomTakeRate {
    $type: "akash.take.v1beta3.DenomTakeRate";
    denom: string;
    rate: number;
}
/** Params defines the parameters for the x/take package */
export interface Params {
    $type: "akash.take.v1beta3.Params";
    /** denom -> % take rate */
    denomTakeRates: DenomTakeRate[];
    defaultTakeRate: number;
}
export declare const DenomTakeRate: {
    $type: "akash.take.v1beta3.DenomTakeRate";
    encode(message: DenomTakeRate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DenomTakeRate;
    fromJSON(object: any): DenomTakeRate;
    toJSON(message: DenomTakeRate): unknown;
    fromPartial<I extends {
        denom?: string | undefined;
        rate?: number | undefined;
    } & {
        denom?: string | undefined;
        rate?: number | undefined;
    } & Record<Exclude<keyof I, "$type" | "denom" | "rate">, never>>(object: I): DenomTakeRate;
};
export declare const Params: {
    $type: "akash.take.v1beta3.Params";
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    fromPartial<I extends {
        denomTakeRates?: {
            denom?: string | undefined;
            rate?: number | undefined;
        }[] | undefined;
        defaultTakeRate?: number | undefined;
    } & {
        denomTakeRates?: ({
            denom?: string | undefined;
            rate?: number | undefined;
        }[] & ({
            denom?: string | undefined;
            rate?: number | undefined;
        } & {
            denom?: string | undefined;
            rate?: number | undefined;
        } & Record<Exclude<keyof I["denomTakeRates"][number], "$type" | "denom" | "rate">, never>)[] & Record<Exclude<keyof I["denomTakeRates"], "$type" | keyof {
            denom?: string | undefined;
            rate?: number | undefined;
        }[]>, never>) | undefined;
        defaultTakeRate?: number | undefined;
    } & Record<Exclude<keyof I, "$type" | "denomTakeRates" | "defaultTakeRate">, never>>(object: I): Params;
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
