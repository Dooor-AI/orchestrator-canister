import Long from "long";
import _m0 from "protobufjs/minimal";
import { Certificate, CertificateFilter } from "../../../akash/cert/v1beta1/cert";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
export declare const protobufPackage = "akash.cert.v1beta1";
export interface CertificateResponse {
    $type: "akash.cert.v1beta1.CertificateResponse";
    certificate?: Certificate;
    serial: string;
}
/** QueryDeploymentsRequest is request type for the Query/Deployments RPC method */
export interface QueryCertificatesRequest {
    $type: "akash.cert.v1beta1.QueryCertificatesRequest";
    filter?: CertificateFilter;
    pagination?: PageRequest;
}
/** QueryCertificatesResponse is response type for the Query/Certificates RPC method */
export interface QueryCertificatesResponse {
    $type: "akash.cert.v1beta1.QueryCertificatesResponse";
    certificates: CertificateResponse[];
    pagination?: PageResponse;
}
export declare const CertificateResponse: {
    $type: "akash.cert.v1beta1.CertificateResponse";
    encode(message: CertificateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CertificateResponse;
    fromJSON(object: any): CertificateResponse;
    toJSON(message: CertificateResponse): unknown;
    fromPartial<I extends {
        serial?: string | undefined;
        certificate?: {
            cert?: Uint8Array | undefined;
            pubkey?: Uint8Array | undefined;
            state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
        } | undefined;
    } & {
        serial?: string | undefined;
        certificate?: ({
            cert?: Uint8Array | undefined;
            pubkey?: Uint8Array | undefined;
            state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
        } & {
            cert?: Uint8Array | undefined;
            pubkey?: Uint8Array | undefined;
            state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
        } & Record<Exclude<keyof I["certificate"], "$type" | "cert" | "pubkey" | "state">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "serial" | "certificate">, never>>(object: I): CertificateResponse;
};
export declare const QueryCertificatesRequest: {
    $type: "akash.cert.v1beta1.QueryCertificatesRequest";
    encode(message: QueryCertificatesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCertificatesRequest;
    fromJSON(object: any): QueryCertificatesRequest;
    toJSON(message: QueryCertificatesRequest): unknown;
    fromPartial<I extends {
        filter?: {
            owner?: string | undefined;
            serial?: string | undefined;
            state?: string | undefined;
        } | undefined;
        pagination?: {
            key?: Uint8Array | undefined;
            reverse?: boolean | undefined;
            offset?: string | number | Long.Long | undefined;
            limit?: string | number | Long.Long | undefined;
            countTotal?: boolean | undefined;
        } | undefined;
    } & {
        filter?: ({
            owner?: string | undefined;
            serial?: string | undefined;
            state?: string | undefined;
        } & {
            owner?: string | undefined;
            serial?: string | undefined;
            state?: string | undefined;
        } & Record<Exclude<keyof I["filter"], "$type" | "owner" | "serial" | "state">, never>) | undefined;
        pagination?: ({
            key?: Uint8Array | undefined;
            reverse?: boolean | undefined;
            offset?: string | number | Long.Long | undefined;
            limit?: string | number | Long.Long | undefined;
            countTotal?: boolean | undefined;
        } & {
            key?: Uint8Array | undefined;
            reverse?: boolean | undefined;
            offset?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["pagination"]["offset"], "$type" | keyof Long.Long>, never>) | undefined;
            limit?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["pagination"]["limit"], "$type" | keyof Long.Long>, never>) | undefined;
            countTotal?: boolean | undefined;
        } & Record<Exclude<keyof I["pagination"], "$type" | "key" | "reverse" | "offset" | "limit" | "countTotal">, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "filter" | "pagination">, never>>(object: I): QueryCertificatesRequest;
};
export declare const QueryCertificatesResponse: {
    $type: "akash.cert.v1beta1.QueryCertificatesResponse";
    encode(message: QueryCertificatesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCertificatesResponse;
    fromJSON(object: any): QueryCertificatesResponse;
    toJSON(message: QueryCertificatesResponse): unknown;
    fromPartial<I extends {
        pagination?: {
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long.Long | undefined;
        } | undefined;
        certificates?: {
            serial?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        pagination?: ({
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long.Long | undefined;
        } & {
            nextKey?: Uint8Array | undefined;
            total?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & Record<Exclude<keyof I["pagination"]["total"], "$type" | keyof Long.Long>, never>) | undefined;
        } & Record<Exclude<keyof I["pagination"], "$type" | "nextKey" | "total">, never>) | undefined;
        certificates?: ({
            serial?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        }[] & ({
            serial?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        } & {
            serial?: string | undefined;
            certificate?: ({
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } & {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } & Record<Exclude<keyof I["certificates"][number]["certificate"], "$type" | "cert" | "pubkey" | "state">, never>) | undefined;
        } & Record<Exclude<keyof I["certificates"][number], "$type" | "serial" | "certificate">, never>)[] & Record<Exclude<keyof I["certificates"], "$type" | keyof {
            serial?: string | undefined;
            certificate?: {
                cert?: Uint8Array | undefined;
                pubkey?: Uint8Array | undefined;
                state?: import("../../../akash/cert/v1beta1/cert").Certificate_State | undefined;
            } | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "$type" | "pagination" | "certificates">, never>>(object: I): QueryCertificatesResponse;
};
/** Query defines the gRPC querier service */
export interface Query {
    /** Certificates queries certificates */
    Certificates(request: QueryCertificatesRequest): Promise<QueryCertificatesResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Certificates(request: QueryCertificatesRequest): Promise<QueryCertificatesResponse>;
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
