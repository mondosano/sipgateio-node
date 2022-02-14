"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRtcmError = exports.RtcmErrorMessage = void 0;
const core_1 = require("../../core");
var RtcmErrorMessage;
(function (RtcmErrorMessage) {
    RtcmErrorMessage["CALL_NOT_FOUND"] = "The requested Call could not be found";
    RtcmErrorMessage["DTMF_INVALID_SEQUENCE"] = "The provided DTMF sequence is invalid";
})(RtcmErrorMessage = exports.RtcmErrorMessage || (exports.RtcmErrorMessage = {}));
exports.handleRtcmError = (error) => {
    if (error.response && error.response.status === 404) {
        return new Error(RtcmErrorMessage.CALL_NOT_FOUND);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleRtcmError.js.map