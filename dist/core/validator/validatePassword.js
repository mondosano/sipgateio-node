"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const errors_1 = require("../errors");
const validatePassword = (password) => {
    const passwordIsValid = password.length > 0 && !password.includes(' ');
    if (!passwordIsValid) {
        return {
            isValid: false,
            cause: errors_1.ErrorMessage.VALIDATOR_INVALID_PASSWORD,
        };
    }
    return { isValid: true };
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=validatePassword.js.map