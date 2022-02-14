import { HttpError } from '../../core';
export declare enum CallErrorMessage {
    CALL_INVALID_EXTENSION = "Cannot access extension - not found or forbidden",
    CALL_INSUFFICIENT_FUNDS = "Insufficient funds",
    CALL_BAD_REQUEST = "Invalid Call object"
}
export declare const handleCallError: (error: HttpError<unknown>) => Error;
