"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePdfFileContent = exports.FaxValidationMessage = void 0;
var FaxValidationMessage;
(function (FaxValidationMessage) {
    FaxValidationMessage["INVALID_PDF_MIME_TYPE"] = "Invalid PDF file";
})(FaxValidationMessage = exports.FaxValidationMessage || (exports.FaxValidationMessage = {}));
// taken from https://github.com/MaraniMatias/isPDF
const isValidPDF = (buffer) => {
    return buffer.lastIndexOf('%PDF-') === 0 && buffer.lastIndexOf('%%EOF') > -1;
};
const validatePdfFileContent = (content) => {
    const isPdf = isValidPDF(content);
    if (!isPdf) {
        return {
            cause: FaxValidationMessage.INVALID_PDF_MIME_TYPE,
            isValid: false,
        };
    }
    return { isValid: true };
};
exports.validatePdfFileContent = validatePdfFileContent;
//# sourceMappingURL=validatePdfFileContent.js.map