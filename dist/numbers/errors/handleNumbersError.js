"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNumbersError = exports.NumbersErrorMessage = void 0;
const core_1 = require("../../core");
var NumbersErrorMessage;
(function (NumbersErrorMessage) {
    NumbersErrorMessage["BAD_REQUEST"] = "Invalid pagination input";
})(NumbersErrorMessage = exports.NumbersErrorMessage || (exports.NumbersErrorMessage = {}));
exports.handleNumbersError = (error) => {
    if (error.response && error.response.status === 400) {
        return new Error(NumbersErrorMessage.BAD_REQUEST);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleNumbersError.js.map