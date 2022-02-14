"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTMFSequence = void 0;
const handleRtcmError_1 = require("../errors/handleRtcmError");
exports.validateDTMFSequence = (sequence) => {
    if (/^[0-9A-D#*]+$/g.test(sequence)) {
        return { isValid: true };
    }
    return { isValid: false, cause: handleRtcmError_1.RtcmErrorMessage.DTMF_INVALID_SEQUENCE };
};
//# sourceMappingURL=validateDTMFSequence.js.map