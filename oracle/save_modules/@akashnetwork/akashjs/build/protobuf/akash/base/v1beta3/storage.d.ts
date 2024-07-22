import Long from "long";
import { ResourceValue } from "./resourcevalue";
import { Attribute } from "./attribute";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.base.v1beta3";
/** Storage stores resource quantity and storage attributes */
export interface Storage {
    $type: "akash.base.v1beta3.Storage";
    name: string;
    quantity: ResourceValue | undefined;
    attributes: Attribute[];
}
export declare const Storage: {
    $type: "akash.base.v1beta3.Storage";
    encode(message: Storage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Storage;
    fromJSON(object: any): Storage;
    toJSON(message: Storage): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        quantity?: ({
            val?: Uint8Array | undefined;
        } & {
            val?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["quantity"], "$type" | "val">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "name" | "attributes" | "quantity">, never>>(object: I): Storage;
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
