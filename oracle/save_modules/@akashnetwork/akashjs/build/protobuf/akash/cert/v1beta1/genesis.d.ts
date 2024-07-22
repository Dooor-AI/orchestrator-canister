import Long from "long";
import _m0 from "protobufjs/minimal";
import { Certificate } from "../../../akash/cert/v1beta1/cert";
export declare const protobufPackage = "akash.cert.v1beta1";
/** GenesisCertificate defines certificate entry at genesis */
export interface GenesisCertificate {
    $type: "akash.cert.v1beta1.GenesisCertificate";
    owner: string;
    certificate?: Certificate;
}
/** GenesisState defines the basic genesis state used by cert module */
export interface GenesisState {
    $type: "akash.cert.v1beta1.GenesisState";
    certificates: GenesisCertificate[];
}
export declare const GenesisCertificate: {
    $type: "akash.cert.v1beta1.GenesisCertificate";
    encode(message: GenesisCertificate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisCertificate;
    fromJSON(object: any): GenesisCertificate;
    toJSON(message: GenesisCertificate): unknown;
    fromPartial<I extends {
        owner?: string | undefined;
        certificate?: {
            cert?: Uint8Array | undefined;
            pubkey?: Uint8Array | undefined;
            state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
        } | undefined;
    } & {
        owner?: string | undefined;
        certificate?: ({
            cert?: Uint8Array | undefined;
            pubkey?: Uint8Array | undefined;
            state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
        } & {
            cert?: Uint8Array | undefined;
            pubkey?: Uint8Array | undefined;
            state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
        } & Record<Exclude<keyof I["certificate"], "$type" | "cert" | "pubkey" | "state">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "owner" | "certificate">, never>>(object: I): GenesisCertificate;
};
export declare const GenesisState: {
    $type: "akash.cert.v1beta1.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        certificates?: {
            owner?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        certificates?: ({
            owner?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        }[] & ({
            owner?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        } & {
            owner?: string | undefined;
            certificate?: ({
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } & {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } & Record<Exclude<keyof I["certificates"][number]["certificate"], "$type" | "cert" | "pubkey" | "state">, never>) | undefined;
        } & Record<Exclude<keyof I["certificates"][number], "$type" | "owner" | "certificate">, never>)[] & Record<Exclude<keyof I["certificates"], "$type" | keyof {
            owner?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "certificates">, never>>(object: I): GenesisState;
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
