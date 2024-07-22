import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.base.v1beta2";
/** Attribute represents key value pair */
export interface Attribute {
    $type: "akash.base.v1beta2.Attribute";
    key: string;
    value: string;
}
/**
 * SignedBy represents validation accounts that tenant expects signatures for provider attributes
 * AllOf has precedence i.e. if there is at least one entry AnyOf is ignored regardless to how many
 * entries there
 * this behaviour to be discussed
 */
export interface SignedBy {
    $type: "akash.base.v1beta2.SignedBy";
    /** all_of all keys in this list must have signed attributes */
    allOf: string[];
    /** any_of at least of of the keys from the list must have signed attributes */
    anyOf: string[];
}
/** PlacementRequirements */
export interface PlacementRequirements {
    $type: "akash.base.v1beta2.PlacementRequirements";
    /** SignedBy list of keys that tenants expect to have signatures from */
    signedBy: SignedBy | undefined;
    /** Attribute list of attributes tenant expects from the provider */
    attributes: Attribute[];
}
export declare const Attribute: {
    $type: "akash.base.v1beta2.Attribute";
    encode(message: Attribute, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Attribute;
    fromJSON(object: any): Attribute;
    toJSON(message: Attribute): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "key" | "value">, never>>(object: I): Attribute;
};
export declare const SignedBy: {
    $type: "akash.base.v1beta2.SignedBy";
    encode(message: SignedBy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignedBy;
    fromJSON(object: any): SignedBy;
    toJSON(message: SignedBy): unknown;
    fromPartial<I extends {
        allOf?: string[] | undefined;
        anyOf?: string[] | undefined;
    } & {
        allOf?: (string[] & string[] & Record<Exclude<keyof I["allOf"], "$type" | keyof string[]>, never>) | undefined;
        anyOf?: (string[] & string[] & Record<Exclude<keyof I["anyOf"], "$type" | keyof string[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "allOf" | "anyOf">, never>>(object: I): SignedBy;
};
export declare const PlacementRequirements: {
    $type: "akash.base.v1beta2.PlacementRequirements";
    encode(message: PlacementRequirements, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PlacementRequirements;
    fromJSON(object: any): PlacementRequirements;
    toJSON(message: PlacementRequirements): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        signedBy?: ({
            allOf?: string[] | undefined;
            anyOf?: string[] | undefined;
        } & {
            allOf?: (string[] & string[] & Record<Exclude<keyof I["signedBy"]["allOf"], "$type" | keyof string[]>, never>) | undefined;
            anyOf?: (string[] & string[] & Record<Exclude<keyof I["signedBy"]["anyOf"], "$type" | keyof string[]>, never>) | undefined;
        } & Record<Exclude<keyof I["signedBy"], "$type" | "allOf" | "anyOf">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "attributes" | "signedBy">, never>>(object: I): PlacementRequirements;
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
