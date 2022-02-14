import { HttpError } from '../../core';
export declare enum NumbersErrorMessage {
    BAD_REQUEST = "Invalid pagination input"
}
export declare const handleNumbersError: (error: HttpError<unknown>) => Error;
