"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdlValidationError = void 0;
const ValidationError_1 = require("./ValidationError");
class SdlValidationError extends ValidationError_1.ValidationError {
    static assert(condition, message) {
        if (!condition) {
            throw new SdlValidationError(message);
        }
    }
    constructor(message) {
        super(message);
        this.name = "SdlValidationError";
    }
}
exports.SdlValidationError = SdlValidationError;
