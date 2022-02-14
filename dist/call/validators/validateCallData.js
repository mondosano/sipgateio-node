"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCallData = exports.ValidationErrors = void 0;
const core_1 = require("../../core");
const validator_1 = require("../../core/validator");
var ValidationErrors;
(function (ValidationErrors) {
    ValidationErrors["INVALID_CALLER"] = "Caller is not a valid extension or phone number";
    ValidationErrors["INVALID_CALLER_ID"] = "CallerId is not a valid phone number";
    ValidationErrors["INVALID_DEVICE_ID"] = "DeviceId is required if caller is not an extension";
})(ValidationErrors = exports.ValidationErrors || (exports.ValidationErrors = {}));
const validateCallData = (callData) => {
    const calleeValidationResult = validator_1.validatePhoneNumber(callData.to);
    if (!calleeValidationResult.isValid) {
        return { isValid: false, cause: calleeValidationResult.cause };
    }
    const callerPhoneNumberValidationResult = validator_1.validatePhoneNumber(callData.from);
    const callerExtensionValidationResult = validator_1.validateExtension(callData.from, [
        validator_1.ExtensionType.MOBILE,
        validator_1.ExtensionType.PERSON,
        validator_1.ExtensionType.EXTERNAL,
        validator_1.ExtensionType.REGISTER,
    ]);
    if (!callerPhoneNumberValidationResult.isValid &&
        !callerExtensionValidationResult.isValid) {
        return {
            isValid: false,
            cause: ValidationErrors.INVALID_CALLER,
        };
    }
    if (callData.deviceId) {
        const deviceIdValidationResult = validator_1.validateExtension(callData.deviceId, [
            validator_1.ExtensionType.MOBILE,
            validator_1.ExtensionType.PERSON,
            validator_1.ExtensionType.EXTERNAL,
            validator_1.ExtensionType.REGISTER,
        ]);
        if (!deviceIdValidationResult.isValid) {
            return {
                isValid: false,
                cause: core_1.ErrorMessage.VALIDATOR_INVALID_EXTENSION,
            };
        }
    }
    else {
        if (!callerExtensionValidationResult.isValid) {
            return {
                isValid: false,
                cause: ValidationErrors.INVALID_DEVICE_ID,
            };
        }
    }
    if (callData.callerId) {
        const callerIdValidationResult = validator_1.validatePhoneNumber(callData.callerId);
        if (!callerIdValidationResult.isValid) {
            return {
                isValid: false,
                cause: ValidationErrors.INVALID_CALLER_ID,
            };
        }
    }
    return { isValid: true };
};
exports.validateCallData = validateCallData;
//# sourceMappingURL=validateCallData.js.map