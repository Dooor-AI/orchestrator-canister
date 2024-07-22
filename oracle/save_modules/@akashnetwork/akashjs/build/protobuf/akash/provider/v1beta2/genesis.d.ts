import Long from "long";
import { Provider } from "./provider";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.provider.v1beta2";
/** GenesisState defines the basic genesis state used by provider module */
export interface GenesisState {
    $type: "akash.provider.v1beta2.GenesisState";
    providers: Provider[];
}
export declare const GenesisState: {
    $type: "akash.provider.v1beta2.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        providers?: {
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            hostUri?: string | undefined;
            info?: {
                email?: string | undefined;
                website?: string | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        providers?: ({
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            hostUri?: string | undefined;
            info?: {
                email?: string | undefined;
                website?: string | undefined;
            } | undefined;
        }[] & ({
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            hostUri?: string | undefined;
            info?: {
                email?: string | undefined;
                website?: string | undefined;
            } | undefined;
        } & {
            owner?: string | undefined;
            attributes?: ({
                key?: string | undefined;
                value?: string | undefined;
            }[] & ({
                key?: string | undefined;
                value?: string | undefined;
            } & {
                key?: string | undefined;
                value?: string | undefined;
            } & Record<Exclude<keyof I["providers"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["providers"][number]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            hostUri?: string | undefined;
            info?: ({
                email?: string | undefined;
                website?: string | undefined;
            } & {
                email?: string | undefined;
                website?: string | undefined;
            } & Record<Exclude<keyof I["providers"][number]["info"], "$type" | "email" | "website">, never>) | undefined;
        } & Record<Exclude<keyof I["providers"][number], "$type" | "owner" | "attributes" | "hostUri" | "info">, never>)[] & Record<Exclude<keyof I["providers"], "$type" | keyof {
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            hostUri?: string | undefined;
            info?: {
                email?: string | undefined;
                website?: string | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "providers">, never>>(object: I): GenesisState;
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
