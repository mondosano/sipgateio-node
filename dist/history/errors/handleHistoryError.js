"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHistoryError = exports.HistoryErrorMessage = void 0;
const core_1 = require("../../core");
var HistoryErrorMessage;
(function (HistoryErrorMessage) {
    HistoryErrorMessage["BAD_REQUEST"] = "Invalid filter or pagination input";
    HistoryErrorMessage["EVENT_NOT_FOUND"] = "The requested history event could not be found";
})(HistoryErrorMessage = exports.HistoryErrorMessage || (exports.HistoryErrorMessage = {}));
exports.handleHistoryError = (error) => {
    if (error.response && error.response.status === 400) {
        return new Error(HistoryErrorMessage.BAD_REQUEST);
    }
    if (error.response && error.response.status === 404) {
        return new Error(HistoryErrorMessage.EVENT_NOT_FOUND);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleHistoryError.js.map