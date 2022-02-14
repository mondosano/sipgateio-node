"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookSettingsError = exports.WebhookSettingsErrorMessage = void 0;
const core_1 = require("../../core");
var WebhookSettingsErrorMessage;
(function (WebhookSettingsErrorMessage) {
    WebhookSettingsErrorMessage["WEBHOOK_SETTINGS_FEATURE_NOT_BOOKED"] = "sipgateIO is not booked for your account (or insufficient scopes)";
})(WebhookSettingsErrorMessage = exports.WebhookSettingsErrorMessage || (exports.WebhookSettingsErrorMessage = {}));
exports.handleWebhookSettingsError = (error) => {
    if (error.response && error.response.status === 403) {
        return new Error(WebhookSettingsErrorMessage.WEBHOOK_SETTINGS_FEATURE_NOT_BOOKED);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleWebhookSettingError.js.map