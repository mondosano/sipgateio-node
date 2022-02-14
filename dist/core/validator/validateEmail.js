"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const errors_1 = require("../errors");
const validateEmail = (email) => {
    const emailRegex = new RegExp(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i);
    if (!emailRegex.test(email)) {
        return {
            cause: `${errors_1.ErrorMessage.VALIDATOR_INVALID_EMAIL}: ${email || '<empty>'}`,
            isValid: false,
        };
    }
    return { isValid: true };
};
exports.validateEmail = validateEmail;
//# sourceMappingURL=validateEmail.js.map