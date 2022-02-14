"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWebhookUrl = void 0;
const ValidatorMessages_1 = require("./ValidatorMessages");
const validateWebhookUrl = (url) => {
    const webhookUrlRegex = new RegExp(/^(http|https):\/\//i);
    if (!webhookUrlRegex.test(url)) {
        return {
            cause: `${ValidatorMessages_1.ValidatorMessages.INVALID_WEBHOOK_URL}: ${url}`,
            isValid: false,
        };
    }
    return { isValid: true };
};
exports.validateWebhookUrl = validateWebhookUrl;
//# sourceMappingURL=validateWebhookUrl.js.map