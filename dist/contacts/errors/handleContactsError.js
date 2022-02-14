"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactsError = exports.ContactsErrorMessage = void 0;
const core_1 = require("../../core");
var ContactsErrorMessage;
(function (ContactsErrorMessage) {
    ContactsErrorMessage["CONTACTS_INVALID_CSV"] = "Invalid CSV string";
    ContactsErrorMessage["CONTACTS_MISSING_HEADER_FIELD"] = "Missing header field in CSV";
    ContactsErrorMessage["CONTACTS_MISSING_VALUES"] = "Missing values in CSV";
    ContactsErrorMessage["CONTACTS_VCARD_MISSING_BEGIN"] = "vCard does not contain a valid BEGIN tag";
    ContactsErrorMessage["CONTACTS_VCARD_MISSING_END"] = "vCard does not contain a valid END tag";
    ContactsErrorMessage["CONTACTS_INVALID_VCARD_VERSION"] = "Invalid VCard Version given";
    ContactsErrorMessage["CONTACTS_MISSING_NAME_ATTRIBUTE"] = "Names not given";
    ContactsErrorMessage["CONTACTS_MISSING_TEL_ATTRIBUTE"] = "No phone number given";
    ContactsErrorMessage["CONTACTS_INVALID_AMOUNT_OF_NAMES"] = "Missing Name Fields";
    ContactsErrorMessage["CONTACTS_INVALID_AMOUNT_OF_PHONE_NUMBERS"] = "Only one phone number is allowed";
    ContactsErrorMessage["CONTACTS_INVALID_AMOUNT_OF_ADDRESSES"] = "Only one address is allowed";
    ContactsErrorMessage["CONTACTS_INVALID_AMOUNT_OF_ADDRESS_VALUES"] = "Address Fields are invalid";
    ContactsErrorMessage["CONTACTS_INVALID_AMOUNT_OF_EMAILS"] = "Only one email is allowed";
})(ContactsErrorMessage = exports.ContactsErrorMessage || (exports.ContactsErrorMessage = {}));
exports.handleContactsError = (error) => {
    if (error.response && error.response.status === 500) {
        return Error(`${ContactsErrorMessage.CONTACTS_INVALID_CSV}`);
    }
    return core_1.handleCoreError(error);
};
//# sourceMappingURL=handleContactsError.js.map