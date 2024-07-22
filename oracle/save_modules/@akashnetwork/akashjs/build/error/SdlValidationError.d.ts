import { ValidationError } from "./ValidationError";
export declare class SdlValidationError extends ValidationError {
    static assert(condition: unknown, message: string): asserts condition;
    constructor(message: string);
}
