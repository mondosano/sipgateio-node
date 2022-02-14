"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HangUpCause = exports.WebhookDirection = exports.RejectReason = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["NEW_CALL"] = "newCall";
    EventType["ANSWER"] = "answer";
    EventType["HANGUP"] = "hangup";
    EventType["DATA"] = "dtmf";
})(EventType = exports.EventType || (exports.EventType = {}));
var RejectReason;
(function (RejectReason) {
    RejectReason["BUSY"] = "busy";
    RejectReason["REJECTED"] = "rejected";
})(RejectReason = exports.RejectReason || (exports.RejectReason = {}));
var WebhookDirection;
(function (WebhookDirection) {
    WebhookDirection["IN"] = "in";
    WebhookDirection["OUT"] = "out";
})(WebhookDirection = exports.WebhookDirection || (exports.WebhookDirection = {}));
var HangUpCause;
(function (HangUpCause) {
    HangUpCause["NORMAL_CLEARING"] = "normalClearing";
    HangUpCause["BUSY"] = "busy";
    HangUpCause["CANCEL"] = "cancel";
    HangUpCause["NO_ANSWER"] = "noAnswer";
    HangUpCause["CONGESTION"] = "congestion";
    HangUpCause["NOT_FOUND"] = "notFound";
    HangUpCause["FORWARDED"] = "forwarded";
})(HangUpCause = exports.HangUpCause || (exports.HangUpCause = {}));
//# sourceMappingURL=webhook.types.js.map