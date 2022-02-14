"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCoreError = void 0;
const ErrorMessage_1 = require("./ErrorMessage");
exports.handleCoreError = (error) => {
    if (error.response && error.response.status === 401) {
        return new Error(ErrorMessage_1.ErrorMessage.HTTP_401);
    }
    if (error.response && error.response.status === 403) {
        return new Error(ErrorMessage_1.ErrorMessage.HTTP_403);
    }
    return new Error(error.message);
};
//# sourceMappingURL=handleError.js.map