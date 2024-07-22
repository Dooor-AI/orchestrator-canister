import Long from "long";
import { Attribute } from "../../base/v1beta1/attribute";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.provider.v1beta1";
/** ProviderInfo */
export interface ProviderInfo {
    $type: "akash.provider.v1beta1.ProviderInfo";
    email: string;
    website: string;
}
/** MsgCreateProvider defines an SDK message for creating a provider */
export interface MsgCreateProvider {
    $type: "akash.provider.v1beta1.MsgCreateProvider";
    owner: string;
    hostUri: string;
    attributes: Attribute[];
    info: ProviderInfo | undefined;
}
/** MsgCreateProviderResponse defines the Msg/CreateProvider response type. */
export interface MsgCreateProviderResponse {
    $type: "akash.provider.v1beta1.MsgCreateProviderResponse";
}
/** MsgUpdateProvider defines an SDK message for updating a provider */
export interface MsgUpdateProvider {
    $type: "akash.provider.v1beta1.MsgUpdateProvider";
    owner: string;
    hostUri: string;
    attributes: Attribute[];
    info: ProviderInfo | undefined;
}
/** MsgUpdateProviderResponse defines the Msg/UpdateProvider response type. */
export interface MsgUpdateProviderResponse {
    $type: "akash.provider.v1beta1.MsgUpdateProviderResponse";
}
/** MsgDeleteProvider defines an SDK message for deleting a provider */
export interface MsgDeleteProvider {
    $type: "akash.provider.v1beta1.MsgDeleteProvider";
    owner: string;
}
/** MsgDeleteProviderResponse defines the Msg/DeleteProvider response type. */
export interface MsgDeleteProviderResponse {
    $type: "akash.provider.v1beta1.MsgDeleteProviderResponse";
}
/** Provider stores owner and host details */
export interface Provider {
    $type: "akash.provider.v1beta1.Provider";
    owner: string;
    hostUri: string;
    attributes: Attribute[];
    info: ProviderInfo | undefined;
}
export declare const ProviderInfo: {
    $type: "akash.provider.v1beta1.ProviderInfo";
    encode(message: ProviderInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ProviderInfo;
    fromJSON(object: any): ProviderInfo;
    toJSON(message: ProviderInfo): unknown;
    fromPartial<I extends {
        email?: string | undefined;
        website?: string | undefined;
    } & {
        email?: string | undefined;
        website?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "email" | "website">, never>>(object: I): ProviderInfo;
};
export declare const MsgCreateProvider: {
    $type: "akash.provider.v1beta1.MsgCreateProvider";
    encode(message: MsgCreateProvider, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateProvider;
    fromJSON(object: any): MsgCreateProvider;
    toJSON(message: MsgCreateProvider): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
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
        } & Record<Exclude<keyof I["info"], "$type" | "email" | "website">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "attributes" | "hostUri" | "info">, never>>(object: I): MsgCreateProvider;
};
export declare const MsgCreateProviderResponse: {
    $type: "akash.provider.v1beta1.MsgCreateProviderResponse";
    encode(_: MsgCreateProviderResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateProviderResponse;
    fromJSON(_: any): MsgCreateProviderResponse;
    toJSON(_: MsgCreateProviderResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgCreateProviderResponse;
};
export declare const MsgUpdateProvider: {
    $type: "akash.provider.v1beta1.MsgUpdateProvider";
    encode(message: MsgUpdateProvider, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateProvider;
    fromJSON(object: any): MsgUpdateProvider;
    toJSON(message: MsgUpdateProvider): unknown;
    fromPartial<I extends {
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
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
        } & Record<Exclude<keyof I["info"], "$type" | "email" | "website">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "attributes" | "hostUri" | "info">, never>>(object: I): MsgUpdateProvider;
};
export declare const MsgUpdateProviderResponse: {
    $type: "akash.provider.v1beta1.MsgUpdateProviderResponse";
    encode(_: MsgUpdateProviderResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateProviderResponse;
    fromJSON(_: any): MsgUpdateProviderResponse;
    toJSON(_: MsgUpdateProviderResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgUpdateProviderResponse;
};
export declare const MsgDeleteProvider: {
    $type: "akash.provider.v1beta1.MsgDeleteProvider";
    encode(message: MsgDeleteProvider, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteProvider;
    fromJSON(object: any): MsgDeleteProvider;
    toJSON(message: MsgDeleteProvider): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
    } & {
        owner?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner">, never>>(object: I): MsgDeleteProvider;
};
export declare const MsgDeleteProviderResponse: {
    $type: "akash.provider.v1beta1.MsgDeleteProviderResponse";
    encode(_: MsgDeleteProviderResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteProviderResponse;
    fromJSON(_: any): MsgDeleteProviderResponse;
    toJSON(_: MsgDeleteProviderResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgDeleteProviderResponse;
};
export declare const Provider: {
    $type: "akash.provider.v1beta1.Provider";
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
        } & Record<Exclude<keyof I["attributes"][number], "$type" | "key" | "value">, never>)[] & Record<Exclude<keyof I["attributes"], "$type" | keyof {
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
        } & Record<Exclude<keyof I["info"], "$type" | "email" | "website">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "attributes" | "hostUri" | "info">, never>>(object: I): Provider;
};
/** Msg defines the provider Msg service */
export interface Msg {
    /** CreateProvider defines a method that creates a provider given the proper inputs */
    CreateProvider(request: MsgCreateProvider): Promise<MsgCreateProviderResponse>;
    /** UpdateProvider defines a method that updates a provider given the proper inputs */
    UpdateProvider(request: MsgUpdateProvider): Promise<MsgUpdateProviderResponse>;
    /** DeleteProvider defines a method that deletes a provider given the proper inputs */
    DeleteProvider(request: MsgDeleteProvider): Promise<MsgDeleteProviderResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateProvider(request: MsgCreateProvider): Promise<MsgCreateProviderResponse>;
    UpdateProvider(request: MsgUpdateProvider): Promise<MsgUpdateProviderResponse>;
    DeleteProvider(request: MsgDeleteProvider): Promise<MsgDeleteProviderResponse>;
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
