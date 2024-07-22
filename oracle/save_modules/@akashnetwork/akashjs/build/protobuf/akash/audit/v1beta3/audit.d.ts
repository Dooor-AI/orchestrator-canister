import Long from "long";
import { Attribute } from "../../base/v1beta3/attribute";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.audit.v1beta3";
/** Provider stores owner auditor and attributes details */
export interface Provider {
    $type: "akash.audit.v1beta3.Provider";
    owner: string;
    auditor: string;
    attributes: Attribute[];
}
/** Attributes */
export interface AuditedAttributes {
    $type: "akash.audit.v1beta3.AuditedAttributes";
    owner: string;
    auditor: string;
    attributes: Attribute[];
}
/** AttributesResponse represents details of deployment along with group details */
export interface AttributesResponse {
    $type: "akash.audit.v1beta3.AttributesResponse";
    attributes: AuditedAttributes[];
}
/** AttributesFilters defines filters used to filter deployments */
export interface AttributesFilters {
    $type: "akash.audit.v1beta3.AttributesFilters";
    auditors: string[];
    owners: string[];
}
/** MsgSignProviderAttributes defines an SDK message for signing a provider attributes */
export interface MsgSignProviderAttributes {
    $type: "akash.audit.v1beta3.MsgSignProviderAttributes";
    owner: string;
    auditor: string;
    attributes: Attribute[];
}
/** MsgSignProviderAttributesResponse defines the Msg/CreateProvider response type. */
export interface MsgSignProviderAttributesResponse {
    $type: "akash.audit.v1beta3.MsgSignProviderAttributesResponse";
}
/** MsgDeleteProviderAttributes defined the Msg/DeleteProviderAttributes */
export interface MsgDeleteProviderAttributes {
    $type: "akash.audit.v1beta3.MsgDeleteProviderAttributes";
    owner: string;
    auditor: string;
    keys: string[];
}
/** MsgDeleteProviderAttributesResponse defines the Msg/ProviderAttributes response type. */
export interface MsgDeleteProviderAttributesResponse {
    $type: "akash.audit.v1beta3.MsgDeleteProviderAttributesResponse";
}
export declare const Provider: {
    $type: "akash.audit.v1beta3.Provider";
    encode(message: Provider, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Provider;
    fromJSON(object: any): Provider;
    toJSON(message: Provider): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        attributes?: {
            key?: string | undefined;
            value?: string | undefined;
        }[] | undefined;
        auditor?: string | undefined;
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        auditor?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "attributes" | "auditor">, never>>(object: I): Provider;
};
export declare const AuditedAttributes: {
    $type: "akash.audit.v1beta3.AuditedAttributes";
    encode(message: AuditedAttributes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuditedAttributes;
    fromJSON(object: any): AuditedAttributes;
    toJSON(message: AuditedAttributes): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        attributes?: {
            key?: string | undefined;
            value?: string | undefined;
        }[] | undefined;
        auditor?: string | undefined;
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        auditor?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "attributes" | "auditor">, never>>(object: I): AuditedAttributes;
};
export declare const AttributesResponse: {
    $type: "akash.audit.v1beta3.AttributesResponse";
    encode(message: AttributesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AttributesResponse;
    fromJSON(object: any): AttributesResponse;
    toJSON(message: AttributesResponse): unknown;
    fromPartial<I extends {
        attributes?: {
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            auditor?: string | undefined;
        }[] | undefined;
    } & {
        attributes?: ({
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            auditor?: string | undefined;
        }[] & ({
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            auditor?: string | undefined;
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
            } & Record<Exclude<keyof I["attributes"][number]["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"][number]["attributes"], "$type" | keyof {
                key?: string | undefined;
                value?: string | undefined;
            }[]>, never>) | undefined;
            auditor?: string | undefined;
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "owner" | "attributes" | "auditor">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
            auditor?: string | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "attributes">, never>>(object: I): AttributesResponse;
};
export declare const AttributesFilters: {
    $type: "akash.audit.v1beta3.AttributesFilters";
    encode(message: AttributesFilters, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AttributesFilters;
    fromJSON(object: any): AttributesFilters;
    toJSON(message: AttributesFilters): unknown;
    fromPartial<I extends {
        auditors?: string[] | undefined;
        owners?: string[] | undefined;
    } & {
        auditors?: (string[] & string[] & Record<Exclude<keyof I["auditors"], "$type" | keyof string[]>, never>) | undefined;
        owners?: (string[] & string[] & Record<Exclude<keyof I["owners"], "$type" | keyof string[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "auditors" | "owners">, never>>(object: I): AttributesFilters;
};
export declare const MsgSignProviderAttributes: {
    $type: "akash.audit.v1beta3.MsgSignProviderAttributes";
    encode(message: MsgSignProviderAttributes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignProviderAttributes;
    fromJSON(object: any): MsgSignProviderAttributes;
    toJSON(message: MsgSignProviderAttributes): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        attributes?: {
            key?: string | undefined;
            value?: string | undefined;
        }[] | undefined;
        auditor?: string | undefined;
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
            key?: string | undefined;
            value?: string | undefined;
        }[]>, never>) | undefined;
        auditor?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "attributes" | "auditor">, never>>(object: I): MsgSignProviderAttributes;
};
export declare const MsgSignProviderAttributesResponse: {
    $type: "akash.audit.v1beta3.MsgSignProviderAttributesResponse";
    encode(_: MsgSignProviderAttributesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignProviderAttributesResponse;
    fromJSON(_: any): MsgSignProviderAttributesResponse;
    toJSON(_: MsgSignProviderAttributesResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgSignProviderAttributesResponse;
};
export declare const MsgDeleteProviderAttributes: {
    $type: "akash.audit.v1beta3.MsgDeleteProviderAttributes";
    encode(message: MsgDeleteProviderAttributes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteProviderAttributes;
    fromJSON(object: any): MsgDeleteProviderAttributes;
    toJSON(message: MsgDeleteProviderAttributes): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        auditor?: string | undefined;
        keys?: string[] | undefined;
    } & {
        owner?: string | undefined;
        auditor?: string | undefined;
        keys?: (string[] & string[] & Record<Exclude<keyof I["keys"], "$type" | keyof string[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "auditor" | "keys">, never>>(object: I): MsgDeleteProviderAttributes;
};
export declare const MsgDeleteProviderAttributesResponse: {
    $type: "akash.audit.v1beta3.MsgDeleteProviderAttributesResponse";
    encode(_: MsgDeleteProviderAttributesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteProviderAttributesResponse;
    fromJSON(_: any): MsgDeleteProviderAttributesResponse;
    toJSON(_: MsgDeleteProviderAttributesResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgDeleteProviderAttributesResponse;
};
/** Msg defines the provider Msg service */
export interface Msg {
    /** SignProviderAttributes defines a method that signs provider attributes */
    SignProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse>;
    /** DeleteProviderAttributes defines a method that deletes provider attributes */
    DeleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    SignProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse>;
    DeleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P> | "$type">, never>;
export {};
