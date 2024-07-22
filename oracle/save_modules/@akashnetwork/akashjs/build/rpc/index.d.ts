import { SigningStargateClient } from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
export declare function getRpc(endpoint: string): Promise<import("@cosmjs/stargate").ProtobufRpcClient>;
export declare function getQueryClient(endpoint: string): Promise<import("@cosmjs/stargate").ProtobufRpcClient>;
export declare function getMsgClient(endpoint: string, signer: OfflineSigner): Promise<SigningStargateClient>;
