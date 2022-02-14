import { CallData } from '../call.types';
import { ValidationResult } from '../../core/validator';
export declare enum ValidationErrors {
    INVALID_CALLER = "Caller is not a valid extension or phone number",
    INVALID_CALLER_ID = "CallerId is not a valid phone number",
    INVALID_DEVICE_ID = "DeviceId is required if caller is not an extension"
}
declare const validateCallData: (callData: CallData) => ValidationResult;
export { validateCallData };
