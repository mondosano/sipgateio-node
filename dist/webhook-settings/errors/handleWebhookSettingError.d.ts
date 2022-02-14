import { HttpError } from '../../core';
export declare enum WebhookSettingsErrorMessage {
    WEBHOOK_SETTINGS_FEATURE_NOT_BOOKED = "sipgateIO is not booked for your account (or insufficient scopes)"
}
export declare const handleWebhookSettingsError: (error: HttpError<unknown>) => Error;
