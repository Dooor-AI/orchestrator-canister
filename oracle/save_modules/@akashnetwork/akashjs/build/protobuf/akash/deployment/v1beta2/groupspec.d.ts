import Long from "long";
import { PlacementRequirements } from "../../base/v1beta2/attribute";
import { Resource } from "./resource";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta2";
/** GroupSpec stores group specifications */
export interface GroupSpec {
    $type: "akash.deployment.v1beta2.GroupSpec";
    name: string;
    requirements: PlacementRequirements | undefined;
    resources: Resource[];
}
export declare const GroupSpec: {
    $type: "akash.deployment.v1beta2.GroupSpec";
    encode(message: GroupSpec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupSpec;
    fromJSON(object: any): GroupSpec;
    toJSON(message: GroupSpec): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        requirements?: {
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            signedBy?: {
                allOf?: string[] | undefined;
                anyOf?: string[] | undefined;
            } | undefined;
        } | undefined;
        resources?: {
            resources?: {
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
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        name?: string | undefined;
        requirements?: ({
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            signedBy?: {
                allOf?: string[] | undefined;
                anyOf?: string[] | undefined;
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
            } & Record<Exclude<keyof I["requirements"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["requirements"]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            signedBy?: ({
                allOf?: string[] | undefined;
                anyOf?: string[] | undefined;
            } & {
                allOf?: (string[] & string[] & Record<Exclude<keyof I["requirements"]["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
                anyOf?: (string[] & string[] & Record<Exclude<keyof I["requirements"]["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
            } & Record<Exclude<keyof I["requirements"]["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
        } & Record<Exclude<keyof I["requirements"], "$type" | "attributes" | "signedBy">, never>) | undefined;
        resources?: ({
            resources?: {
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
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[] & ({
            resources?: {
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
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            resources?: ({
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
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
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
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["storage"][number]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    quantity?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["storage"], "$type" | keyof {
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
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    units?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["memory"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    quantity?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resources"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                endpoints?: ({
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[] & ({
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                } & {
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resources"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["resources"][number]["resources"]["endpoints"], "$type" | keyof {
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["resources"][number]["resources"], "$type" | "storage" | "cpu" | "memory" | "endpoints">, never>) | undefined;
            count?: number | undefined;
            price?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
        } & Record<Exclude<keyof I["resources"][number], "$type" | "resources" | "count" | "price">, never>)[] & Record<Exclude<keyof I["resources"], "$type" | keyof {
            resources?: {
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
                    kind?: import("../../base/v1beta2/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[] | undefined;
            } | undefined;
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "name" | "requirements" | "resources">, never>>(object: I): GroupSpec;
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
