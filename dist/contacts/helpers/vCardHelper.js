"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVCards = exports.parseVCard = void 0;
const handleContactsError_1 = require("../errors/handleContactsError");
const vcf_1 = __importDefault(require("vcf"));
exports.parseVCard = (vCardContent) => {
    let parsedVCard;
    try {
        parsedVCard = new vcf_1.default().parse(vCardContent);
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            if (ex.message.includes('Expected "BEGIN:VCARD"')) {
                throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_VCARD_MISSING_BEGIN);
            }
            if (ex.message.includes('Expected "END:VCARD"')) {
                throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_VCARD_MISSING_END);
            }
        }
        throw new Error(ex);
    }
    if (parsedVCard.version !== '4.0') {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_VCARD_VERSION);
    }
    const nameAttribute = parsedVCard.get('n');
    const phoneAttribute = parsedVCard.get('tel');
    const emailAttribute = parsedVCard.get('email');
    const addressAttribute = parsedVCard.get('adr');
    const organizationAttribute = parsedVCard.get('org');
    if (nameAttribute === undefined) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_MISSING_NAME_ATTRIBUTE);
    }
    if (phoneAttribute === undefined) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_MISSING_TEL_ATTRIBUTE);
    }
    const names = nameAttribute
        .toString()
        .replace(/(.*)N(.*):/, '')
        .split(';');
    if (isAmountOfNamesInvalid(names)) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_AMOUNT_OF_NAMES);
    }
    const [lastname, firstname] = names;
    if (isMultipleOf(phoneAttribute)) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_AMOUNT_OF_PHONE_NUMBERS);
    }
    if (isMultipleOf(addressAttribute)) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_AMOUNT_OF_ADDRESSES);
    }
    let addressValues;
    if (addressAttribute) {
        addressValues = addressAttribute
            .toString()
            .replace(/(.*)ADR(.*):/, '')
            .split(';');
    }
    if (addressValues && isAddressAttributeAmountInvalid(addressValues)) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_AMOUNT_OF_ADDRESS_VALUES);
    }
    if (isMultipleOf(emailAttribute)) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_AMOUNT_OF_EMAILS);
    }
    const organization = organizationAttribute instanceof Array
        ? organizationAttribute
        : [organizationAttribute];
    let result = {
        firstname,
        lastname,
        phoneNumber: phoneAttribute.valueOf().toString(),
        email: emailAttribute ? emailAttribute.valueOf().toString() : undefined,
        organization: organization.map((x) => x
            .toString()
            .replace(/(.*)ORG(.*):/, '')
            .split(';')),
    };
    if (addressAttribute) {
        result = Object.assign(Object.assign({}, result), { address: {
                poBox: addressValues ? addressValues[0] : '',
                extendedAddress: addressValues ? addressValues[1] : '',
                streetAddress: addressValues ? addressValues[2] : '',
                locality: addressValues ? addressValues[3] : '',
                region: addressValues ? addressValues[4] : '',
                postalCode: addressValues ? addressValues[5] : '',
                country: addressValues ? addressValues[6] : '',
            } });
    }
    return result;
};
exports.createVCards = (contacts) => {
    const cards = [];
    contacts.map((contact) => {
        const card = new vcf_1.default();
        card.add('n', `${contact.firstname};${contact.lastname}`);
        contact.organizations.forEach((organization) => {
            card.add('org', organization.join(';'));
        });
        contact.phoneNumbers.forEach((phoneNumber) => {
            card.add('tel', phoneNumber.number, {
                type: phoneNumber.type,
            });
        });
        if (contact.emails !== undefined) {
            contact.emails.forEach((mail) => {
                card.add('email', mail.email, {
                    type: mail.type,
                });
            });
        }
        if (contact.addresses !== undefined) {
            const { addresses } = contact;
            addresses.forEach((address) => {
                card.add('addr', `${address.poBox ? address.poBox : ''};${address.extendedAddress ? address.extendedAddress : ''};${address.streetAddress ? address.streetAddress : ''};${address.locality ? address.locality : ''};${address.region ? address.region : ''};${address.postalCode ? address.postalCode : ''};${address.country ? address.country : ''}`, {
                    type: address.type,
                });
            });
        }
        cards.push(card.toString('4.0'));
    });
    return cards;
};
const isAddressAttributeAmountInvalid = (addressValues) => {
    return addressValues.length < 7;
};
const isMultipleOf = (vCardProperty) => {
    return vCardProperty && typeof vCardProperty.valueOf() === 'object';
};
const isAmountOfNamesInvalid = (names) => {
    return names.length < 2;
};
//# sourceMappingURL=vCardHelper.js.map