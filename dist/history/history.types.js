"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallStatusType = exports.FaxStatusType = exports.Starred = exports.HistoryDirection = exports.HistoryEntryType = void 0;
var HistoryEntryType;
(function (HistoryEntryType) {
    HistoryEntryType["CALL"] = "CALL";
    HistoryEntryType["VOICEMAIL"] = "VOICEMAIL";
    HistoryEntryType["SMS"] = "SMS";
    HistoryEntryType["FAX"] = "FAX";
})(HistoryEntryType = exports.HistoryEntryType || (exports.HistoryEntryType = {}));
var HistoryDirection;
(function (HistoryDirection) {
    HistoryDirection["INCOMING"] = "INCOMING";
    HistoryDirection["OUTGOING"] = "OUTGOING";
    HistoryDirection["MISSED_INCOMING"] = "MISSED_INCOMING";
    HistoryDirection["MISSED_OUTGOING"] = "MISSED_OUTGOING";
})(HistoryDirection = exports.HistoryDirection || (exports.HistoryDirection = {}));
var Starred;
(function (Starred) {
    Starred["STARRED"] = "STARRED";
    Starred["UNSTARRED"] = "UNSTARRED";
})(Starred = exports.Starred || (exports.Starred = {}));
var FaxStatusType;
(function (FaxStatusType) {
    FaxStatusType["PENDING"] = "PENDING";
    FaxStatusType["SENDING"] = "SENDING";
    FaxStatusType["FAILED"] = "FAILED";
    FaxStatusType["SENT"] = "SENT";
    FaxStatusType["SCHEDULED"] = "SCHEDULED";
})(FaxStatusType = exports.FaxStatusType || (exports.FaxStatusType = {}));
var CallStatusType;
(function (CallStatusType) {
    CallStatusType["SUCCESS"] = "SUCCESS";
    CallStatusType["FAILURE"] = "FAILURE";
    CallStatusType["REJECTED"] = "REJECTED";
    CallStatusType["REJECTED_DND"] = "REJECTED_DND";
    CallStatusType["VOICEMAIL_NO_MESSAGE"] = "VOICEMAIL_NO_MESSAGE";
    CallStatusType["BUSY_ON_BUSY"] = "BUSY_ON_BUSY";
    CallStatusType["BUSY"] = "BUSY";
    CallStatusType["MISSED"] = "MISSED";
})(CallStatusType = exports.CallStatusType || (exports.CallStatusType = {}));
//# sourceMappingURL=history.types.js.map