import { HttpError } from '../../core';
export declare enum FaxErrorMessage {
    FAX_NOT_FOUND = "Fax was not found",
    NOT_A_FAX = "History item is not a fax"
}
export declare const handleFaxError: (error: HttpError<unknown>) => Error;
