export declare const protobufPackage = "akash.take.v1beta3";
/** Query defines the gRPC querier service */
export interface Query {
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
export {};
