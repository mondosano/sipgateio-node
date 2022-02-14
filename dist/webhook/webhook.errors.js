"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookErrorMessage = void 0;
var WebhookErrorMessage;
(function (WebhookErrorMessage) {
    WebhookErrorMessage["SERVERADDRESS_MISSING_FOR_FOLLOWUPS"] = "No serverAddress set. No Follow-Up Events will be sent.";
    WebhookErrorMessage["SIPGATE_SIGNATURE_VERIFICATION_FAILED"] = "Signature verification failed.";
    WebhookErrorMessage["AUDIO_FORMAT_ERROR"] = "Invalid audio format. Please use 16bit PCM WAVE mono audio at 8kHz.";
    WebhookErrorMessage["INVALID_ORIGIN"] = "Caution! IP address is not from sipgate";
})(WebhookErrorMessage = exports.WebhookErrorMessage || (exports.WebhookErrorMessage = {}));
//# sourceMappingURL=webhook.errors.js.map