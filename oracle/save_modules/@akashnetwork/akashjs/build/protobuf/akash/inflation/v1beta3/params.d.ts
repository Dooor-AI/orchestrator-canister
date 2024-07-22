import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.inflation.v1beta3";
/** Params defines the parameters for the x/deployment package */
export interface Params {
    $type: "akash.inflation.v1beta3.Params";
    /** InflationDecayFactor is the number of years it takes inflation to halve. */
    inflationDecayFactor: string;
    /**
     * InitialInflation is the rate at which inflation starts at genesis.
     * It is a decimal value in the range [0.0, 100.0].
     */
    initialInflation: string;
    /**
     * Variance defines the fraction by which inflation can vary from ideal inflation in a block.
     * It is a decimal value in the range [0.0, 1.0].
     */
    variance: string;
}
export declare const Params: {
    $type: "akash.inflation.v1beta3.Params";
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    fromPartial<I extends {
        inflationDecayFactor?: string | undefined;
        initialInflation?: string | undefined;
        variance?: string | undefined;
    } & {
        inflationDecayFactor?: string | undefined;
        initialInflation?: string | undefined;
        variance?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "inflationDecayFactor" | "initialInflation" | "variance">, never>>(object: I): Params;
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
