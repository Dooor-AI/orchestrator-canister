import Long from "long";
import { ResourceValue } from "./resourcevalue";
import { Attribute } from "./attribute";
import { Endpoint } from "./endpoint";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.base.v1beta1";
/** CPU stores resource units and cpu config attributes */
export interface CPU {
    $type: "akash.base.v1beta1.CPU";
    units: ResourceValue | undefined;
    attributes: Attribute[];
}
/** Memory stores resource quantity and memory attributes */
export interface Memory {
    $type: "akash.base.v1beta1.Memory";
    quantity: ResourceValue | undefined;
    attributes: Attribute[];
}
/** Storage stores resource quantity and storage attributes */
export interface Storage {
    $type: "akash.base.v1beta1.Storage";
    quantity: ResourceValue | undefined;
    attributes: Attribute[];
}
/**
 * ResourceUnits describes all available resources types for deployment/node etc
 * if field is nil resource is not present in the given data-structure
 */
export interface ResourceUnits {
    $type: "akash.base.v1beta1.ResourceUnits";
    cpu: CPU | undefined;
    memory: Memory | undefined;
    storage: Storage | undefined;
    endpoints: Endpoint[];
}
export declare const CPU: {
    $type: "akash.base.v1beta1.CPU";
    encode(message: CPU, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CPU;
    fromJSON(object: any): CPU;
    toJSON(message: CPU): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        units?: ({
            val?: Uint8Array | undefined;
        } & {
            val?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["units"], "$type" | "val">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "attributes" | "units">, never>>(object: I): CPU;
};
export declare const Memory: {
    $type: "akash.base.v1beta1.Memory";
    encode(message: Memory, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Memory;
    fromJSON(object: any): Memory;
    toJSON(message: Memory): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        quantity?: ({
            val?: Uint8Array | undefined;
        } & {
            val?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["quantity"], "$type" | "val">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "attributes" | "quantity">, never>>(object: I): Memory;
};
export declare const Storage: {
    $type: "akash.base.v1beta1.Storage";
    encode(message: Storage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Storage;
    fromJSON(object: any): Storage;
    toJSON(message: Storage): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        quantity?: ({
            val?: Uint8Array | undefined;
        } & {
            val?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["quantity"], "$type" | "val">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "attributes" | "quantity">, never>>(object: I): Storage;
};
export declare const ResourceUnits: {
    $type: "akash.base.v1beta1.ResourceUnits";
    encode(message: ResourceUnits, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResourceUnits;
    fromJSON(object: any): ResourceUnits;
    toJSON(message: ResourceUnits): unknown;
    fromPartial<I extends {
        storage?: {
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            quantity?: {
                val?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
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
        }[] | undefined;
    } & {
        storage?: ({
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
            } & Record<Exclude<keyof I["storage"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["storage"]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            quantity?: ({
                val?: Uint8Array | undefined;
            } & {
                val?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["storage"]["quantity"], "$type" | "val">, never>) | undefined;
        } & Record<Exclude<keyof I["storage"], "$type" | "attributes" | "quantity">, never>) | undefined;
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
        }[] & ({
            kind?: import("./endpoint").Endpoint_Kind | undefined;
        } & {
            kind?: import("./endpoint").Endpoint_Kind | undefined;
        } & Record<Exclude<keyof I["endpoints"][number], "$type" | "kind">, never>)[] & Record<Exclude<keyof I["endpoints"], "$type" | keyof {
            kind?: import("./endpoint").Endpoint_Kind | undefined;
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
