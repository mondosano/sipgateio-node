"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCallError = exports.CallErrorMessage = void 0;
const core_1 = require("../../core");
var CallErrorMessage;
(function (CallErrorMessage) {
    CallErrorMessage["CALL_INVALID_EXTENSION"] = "Cannot access extension - not found or forbidden";
    CallErrorMessage["CALL_INSUFFICIENT_FUNDS"] = "Insufficient funds";
    CallErrorMessage["CALL_BAD_REQUEST"] = "Invalid Call object";
})(CallErrorMessage = exports.CallErrorMessage || (exports.CallErrorMessage = {}));
exports.handleCallError = (error) => {
    if (error.response && error.response.status === 400) {
        return new Error(CallErrorMessage.CALL_BAD_REQUEST);
    }
    if (error.response && error.response.status === 402) {
        return new Error(CallErrorMessage.CALL_INSUFFICIENT_FUNDS);
    }
    if (error.response && error.response.status === 403) {
        return new Error(CallErrorMessage.CALL_INVALID_EXTENSION);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleCallError.js.map