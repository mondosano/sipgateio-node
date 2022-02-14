"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = void 0;
const errors_1 = require("../errors");
const google_libphonenumber_1 = require("google-libphonenumber");
const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberUtil = google_libphonenumber_1.PhoneNumberUtil.getInstance();
    try {
        const parsedPhoneNumber = phoneNumberUtil.parse(phoneNumber);
        phoneNumberUtil.format(parsedPhoneNumber, google_libphonenumber_1.PhoneNumberFormat.E164);
        return { isValid: true };
    }
    catch (exception) {
        return {
            cause: `${errors_1.ErrorMessage.VALIDATOR_INVALID_PHONE_NUMBER}: ${phoneNumber}`,
            isValid: false,
        };
    }
};
exports.validatePhoneNumber = validatePhoneNumber;
//# sourceMappingURL=validatePhoneNumber.js.map