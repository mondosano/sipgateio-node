import { HttpError } from '../../core';
export declare enum RtcmErrorMessage {
    CALL_NOT_FOUND = "The requested Call could not be found",
    DTMF_INVALID_SEQUENCE = "The provided DTMF sequence is invalid"
}
export declare const handleRtcmError: (error: HttpError<unknown>) => Error;
