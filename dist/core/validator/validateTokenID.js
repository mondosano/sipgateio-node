"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenID = void 0;
const errors_1 = require("../errors");
exports.validateTokenID = (tokenID) => {
    if (!tokenID.match(/^token-[a-zA-Z\d]{6}$/g)) {
        return {
            isValid: false,
            cause: `${errors_1.ErrorMessage.VALIDATOR_INVALID_TOKEN_ID}: ${tokenID || '<empty>'}`,
        };
    }
    return { isValid: true };
};
//# sourceMappingURL=validateTokenID.js.map