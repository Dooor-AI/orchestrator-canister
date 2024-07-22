export interface pems {
    csr: string;
    publicKey: string;
    privateKey: string;
}
export declare function create(address: string): Promise<pems>;
