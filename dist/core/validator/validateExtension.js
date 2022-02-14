"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionType = exports.validateExtension = void 0;
const errors_1 = require("../errors");
var ExtensionType;
(function (ExtensionType) {
    ExtensionType["APPLICATION"] = "a";
    ExtensionType["CONFERENCE_ROOM"] = "c";
    ExtensionType["REGISTER"] = "e";
    ExtensionType["FAX"] = "f";
    ExtensionType["GROUP"] = "g";
    ExtensionType["IVR"] = "h";
    ExtensionType["SIM"] = "i";
    ExtensionType["SMS"] = "s";
    ExtensionType["PERSON"] = "p";
    ExtensionType["QUEUE"] = "q";
    ExtensionType["CALLTHROUGH"] = "r";
    ExtensionType["TRUNKING"] = "t";
    ExtensionType["VOICEMAIL"] = "v";
    ExtensionType["WEBUSER"] = "w";
    ExtensionType["EXTERNAL"] = "x";
    ExtensionType["MOBILE"] = "y";
})(ExtensionType || (ExtensionType = {}));
exports.ExtensionType = ExtensionType;
const validateExtension = (extension, validTypes = Object.values(ExtensionType)) => {
    for (const type of validTypes) {
        const extensionRegEx = new RegExp(`^${type}(0|[1-9][0-9]*)$`);
        if (extensionRegEx.test(extension)) {
            return { isValid: true };
        }
    }
    return {
        cause: `${errors_1.ErrorMessage.VALIDATOR_INVALID_EXTENSION}: ${extension}`,
        isValid: false,
    };
};
exports.validateExtension = validateExtension;
//# sourceMappingURL=validateExtension.js.map