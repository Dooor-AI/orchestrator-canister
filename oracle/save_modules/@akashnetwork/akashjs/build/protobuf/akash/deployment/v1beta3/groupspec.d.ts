import Long from "long";
import { PlacementRequirements } from "../../base/v1beta3/attribute";
import { ResourceUnit } from "./resourceunit";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.deployment.v1beta3";
/** GroupSpec stores group specifications */
export interface GroupSpec {
    $type: "akash.deployment.v1beta3.GroupSpec";
    name: string;
    requirements: PlacementRequirements | undefined;
    resources: ResourceUnit[];
}
export declare const GroupSpec: {
    $type: "akash.deployment.v1beta3.GroupSpec";
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
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            resource?: {
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
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
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
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            resource?: {
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
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
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
            } | undefined;
        }[] & ({
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            resource?: {
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
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
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
            } | undefined;
        } & {
            count?: number | undefined;
            price?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["resources"][number]["price"], "$type" | "denom" | "amount">, never>) | undefined;
            resource?: ({
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
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
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
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["storage"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resource"]["storage"][number]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    quantity?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["storage"][number]["quantity"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resource"]["storage"][number], "$type" | "name" | "attributes" | "quantity">, never>)[] & Record<Exclude<keyof I["resources"][number]["resource"]["storage"], "$type" | keyof {
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
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["cpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resource"]["cpu"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    units?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["cpu"]["units"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resource"]["cpu"], "$type" | "attributes" | "units">, never>) | undefined;
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
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["memory"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resource"]["memory"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    quantity?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["memory"]["quantity"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resource"]["memory"], "$type" | "attributes" | "quantity">, never>) | undefined;
                endpoints?: ({
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                }[] & ({
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                } & {
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
                    sequenceNumber?: number | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resource"]["endpoints"][number], "$type" | "kind" | "sequenceNumber">, never>)[] & Record<Exclude<keyof I["resources"][number]["resource"]["endpoints"], "$type" | keyof {
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
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
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["gpu"]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["resources"][number]["resource"]["gpu"]["attributes"], "$type" | keyof {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[]>, never>) | undefined;
                    units?: ({
                        val?: Uint8Array | undefined;
                    } & {
                        val?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["resources"][number]["resource"]["gpu"]["units"], "$type" | "val">, never>) | undefined;
                } & Record<Exclude<keyof I["resources"][number]["resource"]["gpu"], "$type" | "attributes" | "units">, never>) | undefined;
            } & Record<Exclude<keyof I["resources"][number]["resource"], "$type" | "id" | "storage" | "cpu" | "memory" | "endpoints" | "gpu">, never>) | undefined;
        } & Record<Exclude<keyof I["resources"][number], "$type" | "count" | "price" | "resource">, never>)[] & Record<Exclude<keyof I["resources"], "$type" | keyof {
            count?: number | undefined;
            price?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            resource?: {
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
                    kind?: import("../../base/v1beta3/endpoint").Endpoint_Kind | undefined;
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
