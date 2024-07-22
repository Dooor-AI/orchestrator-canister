export declare class ValidationError extends Error {
    static assert(condition: unknown, message: string): asserts condition;
    constructor(message: string);
}
