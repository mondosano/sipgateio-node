"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactsModule = void 0;
const handleContactsError_1 = require("./errors/handleContactsError");
const json2csv_1 = require("json2csv");
const vCardHelper_1 = require("./helpers/vCardHelper");
const utils_1 = require("../utils");
exports.createContactsModule = (client) => ({
    importFromCsvString(csvContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectedCsv = projectCsvString(csvContent);
            const base64EncodedCsv = utils_1.toBase64(projectedCsv);
            const contactsDTO = {
                base64Content: base64EncodedCsv,
            };
            yield client
                .post('/contacts/import/csv', contactsDTO)
                .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
        });
    },
    create(contact, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, organization, address, email, phone, picture, } = contact;
            if (firstname === '' && lastname === '') {
                throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_MISSING_NAME_ATTRIBUTE);
            }
            const contactsDTO = {
                name: `${firstname} ${lastname}`,
                family: lastname,
                given: firstname,
                organization: organization ? organization : [],
                picture: picture ? picture : null,
                scope,
                addresses: address ? [address] : [],
                emails: email ? [email] : [],
                numbers: phone ? [phone] : [],
            };
            yield client
                .post('/contacts', contactsDTO)
                .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
        });
    },
    update(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client
                .put(`/contacts/${contact.id}`, contact)
                .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client
                .delete(`/contacts/${id}`)
                .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
        });
    },
    deleteAllPrivate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield client
                .delete('/contacts')
                .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
        });
    },
    deleteAllShared() {
        return __awaiter(this, void 0, void 0, function* () {
            const contactsResponse = yield client.get(`contacts`);
            contactsResponse.items = contactsResponse.items.filter((contact) => contact.scope === 'SHARED');
            Promise.all(contactsResponse.items.map((contact) => __awaiter(this, void 0, void 0, function* () {
                yield client
                    .delete(`/contacts/${contact.id}`)
                    .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
            })));
        });
    },
    importVCardString(vCardContent, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedVCard = vCardHelper_1.parseVCard(vCardContent);
            const addresses = [];
            if (parsedVCard.address) {
                addresses.push(parsedVCard.address);
            }
            const emails = [];
            if (parsedVCard.email) {
                emails.push({
                    email: parsedVCard.email,
                    type: [],
                });
            }
            const contactsDTO = {
                name: `${parsedVCard.firstname} ${parsedVCard.lastname}`,
                family: parsedVCard.lastname,
                given: parsedVCard.firstname,
                organization: parsedVCard.organization,
                picture: null,
                scope,
                addresses,
                emails,
                numbers: [
                    {
                        number: parsedVCard.phoneNumber,
                        type: [],
                    },
                ],
            };
            yield client
                .post('/contacts', contactsDTO)
                .catch((error) => Promise.reject(handleContactsError_1.handleContactsError(error)));
        });
    },
    exportAsCsv(scope, delimiter = ',', pagination, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactsResponse = yield client.get(`contacts`, {
                params: Object.assign(Object.assign({}, pagination), filter),
            });
            contactsResponse.items = contactsResponse.items.filter((contact) => contact.scope === scope);
            const fields = [
                'id',
                'name',
                'emails',
                'numbers',
                'addresses',
                'organizations',
            ];
            const opts = { fields, delimiter };
            const elements = contactsResponse.items.map((contact) => {
                return {
                    id: contact.id,
                    name: contact.name,
                    emails: contact.emails.map((email) => email.email),
                    numbers: contact.numbers.map((number) => number.number),
                    addresses: contact.addresses,
                    organizations: contact.organization,
                };
            });
            try {
                const parser = new json2csv_1.Parser(opts);
                return parser.parse(elements);
            }
            catch (err) {
                throw Error(err);
            }
        });
    },
    get(scope, pagination, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactsResponse = yield client.get(`contacts`, {
                params: Object.assign(Object.assign({}, pagination), filter),
            });
            contactsResponse.items = contactsResponse.items.filter((contact) => contact.scope === scope || scope === 'ALL');
            return contactsResponse.items;
        });
    },
    exportAsSingleVCard(scope, pagination, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const vCards = yield this.exportAsVCards(scope, pagination, filter);
            return vCards.join('\r\n');
        });
    },
    exportAsVCards(scope, pagination, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactsResponse = yield client.get(`contacts`, {
                params: Object.assign(Object.assign({}, pagination), filter),
            });
            contactsResponse.items = contactsResponse.items.filter((contact) => contact.scope === scope);
            const contacts = contactsResponse.items.map((contact) => {
                return {
                    firstname: contact.name,
                    lastname: '',
                    organizations: contact.organization,
                    phoneNumbers: contact.numbers,
                    emails: contact.emails,
                    addresses: contact.addresses.map((address) => {
                        return Object.assign(Object.assign({}, address), { type: ['home'] });
                    }),
                };
            });
            return vCardHelper_1.createVCards(contacts);
        });
    },
});
const findColumnIndex = (array, needle) => {
    const index = array.indexOf(needle);
    if (index < 0) {
        throw new Error(`${handleContactsError_1.ContactsErrorMessage.CONTACTS_MISSING_HEADER_FIELD}: ${needle}`);
    }
    return index;
};
const projectCsvString = (csvString) => {
    const csvLines = csvString
        .split(/\n|\r\n/)
        .filter((line) => line !== '');
    if (csvLines.length < 1) {
        throw new Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_INVALID_CSV);
    }
    if (csvLines.length < 2) {
        console.log('WARNING: no lines to import');
    }
    const csvHeader = csvLines[0]
        .split(',')
        .map((header) => header.toLowerCase());
    const columnIndices = {
        firstname: findColumnIndex(csvHeader, 'firstname'),
        lastname: findColumnIndex(csvHeader, 'lastname'),
        number: findColumnIndex(csvHeader, 'number'),
    };
    csvLines.shift();
    const lines = csvLines
        .map((lines) => lines.split(','))
        .map((columns, index) => {
        if (columns.length !== csvHeader.length) {
            throw Error(handleContactsError_1.ContactsErrorMessage.CONTACTS_MISSING_VALUES);
        }
        const firstname = columns[columnIndices.firstname];
        const lastname = columns[columnIndices.lastname];
        const number = columns[columnIndices.number];
        if (!(firstname && lastname && number)) {
            console.log(`WARNING: record at position ${index + 1} is empty`);
            return '';
        }
        return [firstname, lastname, number].join(',');
    });
    return ['firstname,lastname,number', ...lines].join('\n');
};
//# sourceMappingURL=contacts.js.map