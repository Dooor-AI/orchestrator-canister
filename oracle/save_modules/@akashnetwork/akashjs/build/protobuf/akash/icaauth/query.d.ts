import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.icaauth";
/** QueryInterchainAccountFromAddressRequest is the request type for the Query/InterchainAccountAddress RPC */
export interface QueryInterchainAccountFromAddressRequest {
    $type: "akash.icaauth.QueryInterchainAccountFromAddressRequest";
    owner: string;
    connectionId: string;
}
/** QueryInterchainAccountFromAddressResponse the response type for the Query/InterchainAccountAddress RPC */
export interface QueryInterchainAccountFromAddressResponse {
    $type: "akash.icaauth.QueryInterchainAccountFromAddressResponse";
    interchainAccountAddress: string;
}
export declare const QueryInterchainAccountFromAddressRequest: {
    $type: "akash.icaauth.QueryInterchainAccountFromAddressRequest";
    encode(message: QueryInterchainAccountFromAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInterchainAccountFromAddressRequest;
    fromJSON(object: any): QueryInterchainAccountFromAddressRequest;
    toJSON(message: QueryInterchainAccountFromAddressRequest): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        connectionId?: string | undefined;
    } & {
        owner?: string | undefined;
        connectionId?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "connectionId">, never>>(object: I): QueryInterchainAccountFromAddressRequest;
};
export declare const QueryInterchainAccountFromAddressResponse: {
    $type: "akash.icaauth.QueryInterchainAccountFromAddressResponse";
    encode(message: QueryInterchainAccountFromAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInterchainAccountFromAddressResponse;
    fromJSON(object: any): QueryInterchainAccountFromAddressResponse;
    toJSON(message: QueryInterchainAccountFromAddressResponse): unknown;
    fromPartial<I extends {
        interchainAccountAddress?: string | undefined;
    } & {
        interchainAccountAddress?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "interchainAccountAddress">, never>>(object: I): QueryInterchainAccountFromAddressResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** QueryInterchainAccountFromAddress returns the interchain account for given owner address on a given connection pair */
    InterchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest): Promise<QueryInterchainAccountFromAddressResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    InterchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest): Promise<QueryInterchainAccountFromAddressResponse>;
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
