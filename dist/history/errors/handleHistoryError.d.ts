import { HttpError } from '../../core';
export declare enum HistoryErrorMessage {
    BAD_REQUEST = "Invalid filter or pagination input",
    EVENT_NOT_FOUND = "The requested history event could not be found"
}
export declare const handleHistoryError: (error: HttpError<unknown>) => Error;
