import Long from "long";
import { CPU, Memory, Storage } from "./resource";
import { Endpoint } from "./endpoint";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.base.v1beta2";
/**
 * ResourceUnits describes all available resources types for deployment/node etc
 * if field is nil resource is not present in the given data-structure
 */
export interface ResourceUnits {
    $type: "akash.base.v1beta2.ResourceUnits";
    cpu: CPU | undefined;
    memory: Memory | undefined;
    storage: Storage[];
    endpoints: Endpoint[];
}
export declare const ResourceUnits: {
    $type: "akash.base.v1beta2.ResourceUnits";
    encode(message: ResourceUnits, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResourceUnits;
    fromJSON(object: any): ResourceUnits;
    toJSON(message: ResourceUnits): unknown;
    fromPartial<I extends {
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
            kind?: import("./endpoint").Endpoint_Kind | undefined;
            sequenceNumber?: number | undefined;
        }[] | undefined;
    } & {
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
            } & Record<Exclude<keyof I["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["storage"][number]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            quantity?: ({
                val?: Uint8Array | undefined;
            } & {
                val?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
        } & Record<Exclude<keyof I["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["storage"], "$type" | keyof {
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
            } & Record<Exclude<keyof I["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["cpu"]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            units?: ({
                val?: Uint8Array | undefined;
            } & {
                val?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["cpu"]["units"], "$type" | "val">, never>) | undefined;
        } & Record<Exclude<keyof I["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
            } & Record<Exclude<keyof I["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["memory"]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            quantity?: ({
                val?: Uint8Array | undefined;
            } & {
                val?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["memory"]["quantity"], "$type" | "val">, never>) | undefined;
        } & Record<Exclude<keyof I["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
        endpoints?: ({
            kind?: import("./endpoint").Endpoint_Kind | undefined;
            sequenceNumber?: number | undefined;
        }[] & ({
            kind?: import("./endpoint").Endpoint_Kind | undefined;
            sequenceNumber?: number | undefined;
        } & {
            kind?: import("./endpoint").Endpoint_Kind | undefined;
            sequenceNumber?: number | undefined;
        } & Record<Exclude<keyof I["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["endpoints"], "$type" | keyof {
            kind?: import("./endpoint").Endpoint_Kind | undefined;
            sequenceNumber?: number | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>>(object: I): ResourceUnits;
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
