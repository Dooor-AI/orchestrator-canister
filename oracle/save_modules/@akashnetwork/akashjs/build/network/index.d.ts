declare type NETWORK_TYPE = "mainnet" | "testnet" | "edgenet";
declare type ENDPOINT_TYPE = "rpc" | "rest";
interface INetworkMetadata {
    chain_name: string;
    status: string;
    network_type: string;
    pretty_name: string;
    chain_id: string;
    bech32_prefix: string;
    daemon_name: string;
    node_home: string;
    genesis: {
        genesis_url: string;
    };
    codebase: {
        git_repo: string;
        recommended_version: string;
        compatible_versions: [string];
        binaries: {
            [target: string]: string;
        };
    };
    peers: {
        seeds: [
            {
                id: string;
                address: string;
            }
        ];
        persistent_peers: [
            {
                id: string;
                address: string;
            }
        ];
    };
    apis: {
        [type: string]: [{
            address: string;
        }];
    };
}
export declare function getMetadata(network: NETWORK_TYPE): Promise<INetworkMetadata>;
export declare function getEndpoints(network: NETWORK_TYPE, type: ENDPOINT_TYPE): Promise<[{
    address: string;
}]>;
export declare function getEndpointsSorted(network: NETWORK_TYPE, type: ENDPOINT_TYPE): Promise<any[]>;
export {};
