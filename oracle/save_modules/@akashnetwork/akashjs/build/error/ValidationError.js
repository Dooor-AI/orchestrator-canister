"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    static assert(condition, message) {
        if (!condition) {
            throw new ValidationError(message);
        }
    }
    constructor(message) {
        super(message);
        this.name = "SdlValidationError";
    }
}
exports.ValidationError = ValidationError;
