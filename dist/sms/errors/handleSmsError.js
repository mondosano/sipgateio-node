"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSmsError = exports.SmsErrorMessage = void 0;
const core_1 = require("../../core");
var SmsErrorMessage;
(function (SmsErrorMessage) {
    SmsErrorMessage["INVALID_MESSAGE"] = "Invalid SMS message";
    SmsErrorMessage["INVALID_EXTENSION"] = "Invalid SMS extension";
    SmsErrorMessage["TIME_MUST_BE_IN_FUTURE"] = "Scheduled time must be in future";
    SmsErrorMessage["TIME_TOO_FAR_IN_FUTURE"] = "Scheduled time should not be further than 30 days in the future";
    SmsErrorMessage["TIME_INVALID"] = "Invalid date format";
    SmsErrorMessage["NO_ASSIGNED_ID"] = "smsId must be assigned";
    SmsErrorMessage["NO_DEFAULT_SENDER_ID"] = "No default SmsId set";
    SmsErrorMessage["NUMBER_NOT_VERIFIED"] = "Number is not verified yet";
    SmsErrorMessage["NUMBER_NOT_REGISTERED"] = "Number is not registered as a sender ID in your account";
})(SmsErrorMessage = exports.SmsErrorMessage || (exports.SmsErrorMessage = {}));
exports.handleSmsError = (error) => {
    if (error.response && error.response.status === 403) {
        return new Error(SmsErrorMessage.INVALID_EXTENSION);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleSmsError.js.map