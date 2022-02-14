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
exports.createFaxModule = void 0;
const handleFaxError_1 = require("./errors/handleFaxError");
const validatePdfFileContent_1 = require("./validators/validatePdfFileContent");
exports.createFaxModule = (client) => ({
    send(faxObject) {
        const fax = faxObject;
        const fileContentValidationResult = validatePdfFileContent_1.validatePdfFileContent(fax.fileContent);
        if (!fileContentValidationResult.isValid) {
            throw new Error(fileContentValidationResult.cause);
        }
        if (!fax.filename) {
            fax.filename = generateFilename();
        }
        const faxDTO = {
            base64Content: fax.fileContent.toString('base64'),
            faxlineId: fax.faxlineId,
            filename: fax.filename,
            recipient: fax.to,
        };
        return client
            .post('/sessions/fax', faxDTO)
            .catch((error) => Promise.reject(handleFaxError_1.handleFaxError(error)));
    },
    getFaxStatus(sessionId) {
        return client
            .get(`/history/${sessionId}`)
            .then((data) => {
            if (!data.type || data.type !== 'FAX') {
                throw new Error(handleFaxError_1.FaxErrorMessage.NOT_A_FAX);
            }
            return data.faxStatusType;
        })
            .catch((error) => Promise.reject(handleFaxError_1.handleFaxError(error)));
    },
    getFaxlines() {
        return __awaiter(this, void 0, void 0, function* () {
            const webuserId = yield client.getAuthenticatedWebuserId();
            return yield client
                .get(`${webuserId}/faxlines`)
                .then((response) => response.items);
        });
    },
});
const generateFilename = () => {
    const timestamp = new Date()
        .toJSON()
        .replace(/T/g, '_')
        .replace(/[.:-]/g, '')
        .slice(0, -6);
    return `Fax_${timestamp}`;
};
//# sourceMappingURL=fax.js.map