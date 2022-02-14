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
exports.containsPhoneNumber = exports.getSmsCallerIds = exports.getUserSmsExtension = exports.createSMSModule = void 0;
const validator_1 = require("../core/validator");
const handleSmsError_1 = require("./errors/handleSmsError");
const validateSendAt_1 = require("./validators/validateSendAt");
exports.createSMSModule = (client) => ({
    send(sms, sendAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const smsDTO = {
                smsId: '',
                message: sms.message,
                recipient: sms.to,
            };
            if (sendAt) {
                const sendAtValidationResult = validateSendAt_1.validateSendAt(sendAt);
                if (!sendAtValidationResult.isValid) {
                    throw new Error(sendAtValidationResult.cause);
                }
                smsDTO.sendAt = sendAt.getTime() / 1000;
            }
            if (('from' in sms ? sms.from : sms.phoneNumber) !== undefined) {
                return sendSmsByPhoneNumber(client, sms, smsDTO);
            }
            return sendSmsBySmsId(sms, smsDTO, client);
        });
    },
});
const sendSms = (client, smsDTO) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.post('/sessions/sms', smsDTO).catch((error) => {
        throw handleSmsError_1.handleSmsError(error);
    });
});
exports.getUserSmsExtension = (client, webuserId) => {
    return client
        .get(`${webuserId}/sms`)
        .then((value) => value.items[0].id)
        .catch((error) => Promise.reject(handleSmsError_1.handleSmsError(error)));
};
exports.getSmsCallerIds = (client, webuserExtension, smsExtension) => {
    return client
        .get(`${webuserExtension}/sms/${smsExtension}/callerids`)
        .then((value) => value.items)
        .catch((error) => Promise.reject(handleSmsError_1.handleSmsError(error)));
};
const setDefaultSenderId = (client, webuserExtension, smsId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    yield client
        .put(`${webuserExtension}/sms/${smsId}/callerids/${senderId.id}`, {
        defaultNumber: 'true',
    })
        .catch((error) => {
        throw handleSmsError_1.handleSmsError(error);
    });
});
exports.containsPhoneNumber = (smsCallerIds, phoneNumber) => {
    const foundCallerId = smsCallerIds.find((smsCallerId) => smsCallerId.phonenumber === phoneNumber);
    return foundCallerId ? foundCallerId.verified : false;
};
function sendSmsByPhoneNumber(client, sms, smsDTO) {
    return __awaiter(this, void 0, void 0, function* () {
        const webuserId = yield client.getAuthenticatedWebuserId();
        const smsExtension = yield exports.getUserSmsExtension(client, webuserId);
        const senderIds = yield exports.getSmsCallerIds(client, webuserId, smsExtension);
        const senderId = senderIds.find((value) => value.phonenumber === ('from' in sms ? sms.from : sms.phoneNumber));
        if (senderId === undefined) {
            throw new Error(handleSmsError_1.SmsErrorMessage.NUMBER_NOT_REGISTERED);
        }
        if (!senderId.verified) {
            throw new Error(handleSmsError_1.SmsErrorMessage.NUMBER_NOT_VERIFIED);
        }
        const defaultSmsId = senderIds.find((value) => value.defaultNumber);
        if (defaultSmsId === undefined) {
            throw new Error(handleSmsError_1.SmsErrorMessage.NO_DEFAULT_SENDER_ID);
        }
        smsDTO.smsId = smsExtension;
        yield setDefaultSenderId(client, webuserId, smsExtension, senderId);
        return yield sendSms(client, smsDTO)
            .then(() => __awaiter(this, void 0, void 0, function* () { return yield setDefaultSenderId(client, webuserId, smsExtension, defaultSmsId); }))
            .catch((error) => {
            return Promise.reject(handleSmsError_1.handleSmsError(error));
        });
    });
}
function sendSmsBySmsId(sms, smsDTO, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (sms.smsId === undefined) {
            throw new Error('smsId is undefined');
        }
        const smsExtensionValidationResult = validator_1.validateExtension(sms.smsId, [
            validator_1.ExtensionType.SMS,
        ]);
        if (!smsExtensionValidationResult.isValid) {
            throw new Error(smsExtensionValidationResult.cause);
        }
        smsDTO.smsId = sms.smsId;
        const phoneNumberValidationResult = validator_1.validatePhoneNumber(sms.to);
        if (!phoneNumberValidationResult.isValid) {
            throw new Error(phoneNumberValidationResult.cause);
        }
        if (sms.message === '') {
            throw new Error(handleSmsError_1.SmsErrorMessage.INVALID_MESSAGE);
        }
        yield sendSms(client, smsDTO).catch((error) => {
            throw handleSmsError_1.handleSmsError(error);
        });
    });
}
//# sourceMappingURL=sms.js.map