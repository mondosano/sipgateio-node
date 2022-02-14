"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhitelistExtensions = void 0;
const validator_1 = require("../../core/validator");
const ValidatorMessages_1 = require("./ValidatorMessages");
const validateWhitelistExtensions = (extensions) => {
    extensions.forEach((extension) => {
        const validationResult = validator_1.validateExtension(extension, [
            validator_1.ExtensionType.PERSON,
            validator_1.ExtensionType.GROUP,
        ]);
        if (!validationResult.isValid) {
            throw new Error(`${ValidatorMessages_1.ValidatorMessages.INVALID_EXTENSION_FOR_WEBHOOKS}\n${validationResult.cause}: ${extension}`);
        }
    });
};
exports.validateWhitelistExtensions = validateWhitelistExtensions;
//# sourceMappingURL=validateWhitelistExtensions.js.map