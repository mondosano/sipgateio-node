"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSendAt = void 0;
const handleSmsError_1 = require("../errors/handleSmsError");
const validateSendAt = (sendAt) => {
    if (Number.isNaN(sendAt.getTime())) {
        return {
            cause: handleSmsError_1.SmsErrorMessage.TIME_INVALID,
            isValid: false,
        };
    }
    if (sendAt.getTime() < Date.now()) {
        return {
            cause: handleSmsError_1.SmsErrorMessage.TIME_MUST_BE_IN_FUTURE,
            isValid: false,
        };
    }
    if (sendAt.getTime() > Date.now() + 30 * 24 * 60 * 60 * 1000) {
        return {
            cause: handleSmsError_1.SmsErrorMessage.TIME_TOO_FAR_IN_FUTURE,
            isValid: false,
        };
    }
    return { isValid: true };
};
exports.validateSendAt = validateSendAt;
//# sourceMappingURL=validateSendAt.js.map