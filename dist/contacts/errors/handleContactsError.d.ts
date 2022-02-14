import { HttpError } from '../../core';
export declare enum ContactsErrorMessage {
    CONTACTS_INVALID_CSV = "Invalid CSV string",
    CONTACTS_MISSING_HEADER_FIELD = "Missing header field in CSV",
    CONTACTS_MISSING_VALUES = "Missing values in CSV",
    CONTACTS_VCARD_MISSING_BEGIN = "vCard does not contain a valid BEGIN tag",
    CONTACTS_VCARD_MISSING_END = "vCard does not contain a valid END tag",
    CONTACTS_INVALID_VCARD_VERSION = "Invalid VCard Version given",
    CONTACTS_MISSING_NAME_ATTRIBUTE = "Names not given",
    CONTACTS_MISSING_TEL_ATTRIBUTE = "No phone number given",
    CONTACTS_INVALID_AMOUNT_OF_NAMES = "Missing Name Fields",
    CONTACTS_INVALID_AMOUNT_OF_PHONE_NUMBERS = "Only one phone number is allowed",
    CONTACTS_INVALID_AMOUNT_OF_ADDRESSES = "Only one address is allowed",
    CONTACTS_INVALID_AMOUNT_OF_ADDRESS_VALUES = "Address Fields are invalid",
    CONTACTS_INVALID_AMOUNT_OF_EMAILS = "Only one email is allowed"
}
export declare const handleContactsError: (error: HttpError<unknown>) => Error;
