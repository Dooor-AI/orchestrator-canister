import Long from "long";
import { Params } from "./params";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.staking.v1beta3";
/** GenesisState stores slice of genesis deployment instance */
export interface GenesisState {
    $type: "akash.staking.v1beta3.GenesisState";
    params: Params | undefined;
}
export declare const GenesisState: {
    $type: "akash.staking.v1beta3.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        params?: {
            minCommissionRate?: string | undefined;
        } | undefined;
    } & {
        params?: ({
            minCommissionRate?: string | undefined;
        } & {
            minCommissionRate?: string | undefined;
        } & Record<Exclude<keyof I["params"], "$type" | "minCommissionRate">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "params">, never>>(object: I): GenesisState;
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
