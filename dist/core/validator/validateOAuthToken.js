"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOAuthToken = void 0;
const errors_1 = require("../errors");
const utils_1 = require("../../utils");
exports.validateOAuthToken = (token) => {
    if (!isValidToken(token)) {
        return {
            isValid: false,
            cause: errors_1.ErrorMessage.VALIDATOR_INVALID_OAUTH_TOKEN,
        };
    }
    return { isValid: true };
};
const isValidToken = (token) => {
    try {
        const base64EncodedPayload = token
            .split('.')[1]
            .replace('-', '+')
            .replace('_', '/');
        JSON.parse(utils_1.fromBase64(base64EncodedPayload));
        return true;
    }
    catch (error) {
        return false;
    }
};
//# sourceMappingURL=validateOAuthToken.js.map