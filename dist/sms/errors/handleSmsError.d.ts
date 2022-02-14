import { HttpError } from '../../core';
export declare enum SmsErrorMessage {
    INVALID_MESSAGE = "Invalid SMS message",
    INVALID_EXTENSION = "Invalid SMS extension",
    TIME_MUST_BE_IN_FUTURE = "Scheduled time must be in future",
    TIME_TOO_FAR_IN_FUTURE = "Scheduled time should not be further than 30 days in the future",
    TIME_INVALID = "Invalid date format",
    NO_ASSIGNED_ID = "smsId must be assigned",
    NO_DEFAULT_SENDER_ID = "No default SmsId set",
    NUMBER_NOT_VERIFIED = "Number is not verified yet",
    NUMBER_NOT_REGISTERED = "Number is not registered as a sender ID in your account"
}
export declare const handleSmsError: (error: HttpError<unknown>) => Error;
