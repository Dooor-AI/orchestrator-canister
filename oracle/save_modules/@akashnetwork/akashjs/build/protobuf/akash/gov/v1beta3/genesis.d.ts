import Long from "long";
import { DepositParams } from "./params";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.gov.v1beta3";
/** GenesisState stores slice of genesis deployment instance */
export interface GenesisState {
    $type: "akash.gov.v1beta3.GenesisState";
    depositParams: DepositParams | undefined;
}
export declare const GenesisState: {
    $type: "akash.gov.v1beta3.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        depositParams?: {
            minInitialDepositRate?: Uint8Array | undefined;
        } | undefined;
    } & {
        depositParams?: ({
            minInitialDepositRate?: Uint8Array | undefined;
        } & {
            minInitialDepositRate?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["depositParams"], "$type" | "minInitialDepositRate">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "depositParams">, never>>(object: I): GenesisState;
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
