import Long from "long";
import { CPU } from "./cpu";
import { Memory } from "./memory";
import { Storage } from "./storage";
import { GPU } from "./gpu";
import { Endpoint } from "./endpoint";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.base.v1beta3";
/**
 * Resources describes all available resources types for deployment/node etc
 * if field is nil resource is not present in the given data-structure
 */
export interface Resources {
    $type: "akash.base.v1beta3.Resources";
    id: number;
    cpu: CPU | undefined;
    memory: Memory | undefined;
    storage: Storage[];
    gpu: GPU | undefined;
    endpoints: Endpoint[];
}
export declare const Resources: {
    $type: "akash.base.v1beta3.Resources";
    encode(message: Resources, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Resources;
    fromJSON(object: any): Resources;
    toJSON(message: Resources): unknown;
    fromPartial<I extends {
        id?: number | undefined;
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
        gpu?: {
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            units?: {
                val?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
    } & {
        id?: number | undefined;
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
        gpu?: ({
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
            } & Record<Exclude<keyof I["gpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["gpu"]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            units?: ({
                val?: Uint8Array | undefined;
            } & {
                val?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["gpu"]["units"], "$type" | "val">, never>) | undefined;
        } & Record<Exclude<keyof I["gpu"], "$type" | "attributes" | "units">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "id" | "storage" | "cpu" | "memory" | "endpoints" | "gpu">, never>>(object: I): Resources;
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
