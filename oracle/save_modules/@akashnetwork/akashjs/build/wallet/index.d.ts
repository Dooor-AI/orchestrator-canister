export declare function createAccount(): Promise<{
    mnemonic: any;
    address: any;
}>;
export declare function importAccount(mnemonic: string): Promise<any>;
export declare function getAccount(address: string): Promise<any>;
export declare function getLastLoaded(): Promise<any>;
