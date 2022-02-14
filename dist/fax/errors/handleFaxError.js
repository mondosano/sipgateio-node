"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFaxError = exports.FaxErrorMessage = void 0;
const core_1 = require("../../core");
var FaxErrorMessage;
(function (FaxErrorMessage) {
    FaxErrorMessage["FAX_NOT_FOUND"] = "Fax was not found";
    FaxErrorMessage["NOT_A_FAX"] = "History item is not a fax";
})(FaxErrorMessage = exports.FaxErrorMessage || (exports.FaxErrorMessage = {}));
exports.handleFaxError = (error) => {
    if (error.response && error.response.status === 404) {
        return new Error(FaxErrorMessage.FAX_NOT_FOUND);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleFaxError.js.map