/**
 * This file fills keytar in browser, to use localStorage in place.
 */
export declare function getPassword(): Promise<string>;
export declare function setPassword(): Promise<void>;
declare const _default: {
    getPassword: typeof getPassword;
    setPassword: typeof setPassword;
};
export default _default;
