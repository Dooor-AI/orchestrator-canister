import Long from "long";
import _m0 from "protobufjs/minimal";
import { AuditedAttributes } from "../../../akash/audit/v1beta1/audit";
export declare const protobufPackage = "akash.audit.v1beta1";
/** GenesisState defines the basic genesis state used by audit module */
export interface GenesisState {
    $type: "akash.audit.v1beta1.GenesisState";
    attributes: AuditedAttributes[];
}
export declare const GenesisState: {
    $type: "akash.audit.v1beta1.GenesisState";
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
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
    } & Record<Exclude<keyof I, "$type" | "attributes">, never>>(object: I): GenesisState;
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
