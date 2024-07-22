import { Any } from "../../google/protobuf/any";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "akash.icaauth";
/** MsgRegisterAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterAccount {
    $type: "akash.icaauth.MsgRegisterAccount";
    owner: string;
    connectionId: string;
}
/** MsgRegisterAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterAccountResponse {
    $type: "akash.icaauth.MsgRegisterAccountResponse";
}
/** MsgSubmitTx defines the payload for Msg/SubmitTx */
export interface MsgSubmitTx {
    $type: "akash.icaauth.MsgSubmitTx";
    owner: string;
    connectionId: string;
    msg?: Any;
}
/** MsgSubmitTxResponse defines the response for Msg/SubmitTx */
export interface MsgSubmitTxResponse {
    $type: "akash.icaauth.MsgSubmitTxResponse";
}
export declare const MsgRegisterAccount: {
    $type: "akash.icaauth.MsgRegisterAccount";
    encode(message: MsgRegisterAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterAccount;
    fromJSON(object: any): MsgRegisterAccount;
    toJSON(message: MsgRegisterAccount): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        connectionId?: string | undefined;
    } & {
        owner?: string | undefined;
        connectionId?: string | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "connectionId">, never>>(object: I): MsgRegisterAccount;
};
export declare const MsgRegisterAccountResponse: {
    $type: "akash.icaauth.MsgRegisterAccountResponse";
    encode(_: MsgRegisterAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterAccountResponse;
    fromJSON(_: any): MsgRegisterAccountResponse;
    toJSON(_: MsgRegisterAccountResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgRegisterAccountResponse;
};
export declare const MsgSubmitTx: {
    $type: "akash.icaauth.MsgSubmitTx";
    encode(message: MsgSubmitTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitTx;
    fromJSON(object: any): MsgSubmitTx;
    toJSON(message: MsgSubmitTx): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        connectionId?: string | undefined;
        msg?: {
            value?: Uint8Array | undefined;
            typeUrl?: string | undefined;
        } | undefined;
    } & {
        owner?: string | undefined;
        connectionId?: string | undefined;
        msg?: ({
            value?: Uint8Array | undefined;
            typeUrl?: string | undefined;
        } & {
            value?: Uint8Array | undefined;
            typeUrl?: string | undefined;
        } & Record<Exclude<keyof I["msg"], "$type" | "value" | "typeUrl">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "connectionId" | "msg">, never>>(object: I): MsgSubmitTx;
};
export declare const MsgSubmitTxResponse: {
    $type: "akash.icaauth.MsgSubmitTxResponse";
    encode(_: MsgSubmitTxResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitTxResponse;
    fromJSON(_: any): MsgSubmitTxResponse;
    toJSON(_: MsgSubmitTxResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, "$type">, never>>(_: I): MsgSubmitTxResponse;
};
/** Msg defines the icaauth Msg service. */
export interface Msg {
    /** Register defines a rpc handler for MsgRegisterAccount */
    RegisterAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse>;
    /** SubmitTx defines a rpc handler for MsgSubmitTx */
    SubmitTx(request: MsgSubmitTx): Promise<MsgSubmitTxResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    RegisterAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse>;
    SubmitTx(request: MsgSubmitTx): Promise<MsgSubmitTxResponse>;
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
