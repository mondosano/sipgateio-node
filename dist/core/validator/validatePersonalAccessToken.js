"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePersonalAccessToken = void 0;
const errors_1 = require("../errors");
exports.validatePersonalAccessToken = (token) => {
    if (!token.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/ig)) {
        return {
            isValid: false,
            cause: `${errors_1.ErrorMessage.VALIDATOR_INVALID_PERSONAL_ACCESS_TOKEN}: ${token || '<empty>'}`,
        };
    }
    return { isValid: true };
};
//# sourceMappingURL=validatePersonalAccessToken.js.map