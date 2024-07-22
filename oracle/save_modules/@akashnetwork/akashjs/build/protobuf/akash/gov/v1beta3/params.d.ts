import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.gov.v1beta3";
/** DepositParams defines the parameters for the x/gov module */
export interface DepositParams {
    $type: "akash.gov.v1beta3.DepositParams";
    /**
     * min_initial_deposit_rate minimum % of TotalDeposit
     * author of the proposal must put in order for proposal tx to be committed
     */
    minInitialDepositRate: Uint8Array;
}
export declare const DepositParams: {
    $type: "akash.gov.v1beta3.DepositParams";
    encode(message: DepositParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DepositParams;
    fromJSON(object: any): DepositParams;
    toJSON(message: DepositParams): unknown;
    fromPartial<I extends {
        minInitialDepositRate?: Uint8Array | undefined;
    } & {
        minInitialDepositRate?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "$type" | "minInitialDepositRate">, never>>(object: I): DepositParams;
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
