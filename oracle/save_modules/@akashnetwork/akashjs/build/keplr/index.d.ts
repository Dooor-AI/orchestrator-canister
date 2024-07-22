import { SigningStargateClient } from "@cosmjs/stargate";
import { OfflineDirectSigner, OfflineSigner } from "@cosmjs/proto-signing";
interface Chain {
    id: string;
}
export declare function getChains(): {
    mainnet: {
        id: string;
        name: string;
        messagePath: string;
    };
    testnet: {
        id: string;
        name: string;
        messagePath: string;
    };
};
export declare function getSigner(chain: Chain): Promise<OfflineSigner>;
export declare function get(chain: Chain, signer: OfflineSigner | OfflineDirectSigner, endPoint: string): Promise<SigningStargateClient>;
export {};
