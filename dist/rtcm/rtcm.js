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
exports.createRTCMModule = void 0;
const handleRtcmError_1 = require("./errors/handleRtcmError");
const validateDTMFSequence_1 = require("./validator/validateDTMFSequence");
exports.createRTCMModule = (client) => ({
    getEstablishedCalls: () => {
        return client
            .get('/calls')
            .then((response) => response.data)
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    },
    mute: (call, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .put(`/calls/${call.callId}/muted`, {
            value: status,
        })
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
    record: (call, options) => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .put(`/calls/${call.callId}/recording`, options)
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
    announce: (call, announcement) => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .post(`/calls/${call.callId}/announcements`, {
            url: announcement,
        })
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
    transfer: (call, options) => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .post(`/calls/${call.callId}/transfer`, options)
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
    sendDTMF: (call, sequence) => __awaiter(void 0, void 0, void 0, function* () {
        const upperCasedSequence = sequence.toUpperCase();
        const validationResult = validateDTMFSequence_1.validateDTMFSequence(upperCasedSequence);
        if (!validationResult.isValid) {
            throw new Error(validationResult.cause);
        }
        yield client
            .post(`/calls/${call.callId}/dtmf`, {
            sequence: upperCasedSequence,
        })
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
    hold: (call, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .put(`/calls/${call.callId}/hold`, {
            value: status,
        })
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
    hangUp: (call) => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .delete(`/calls/${call.callId}`)
            .catch((error) => Promise.reject(handleRtcmError_1.handleRtcmError(error)));
    }),
});
//# sourceMappingURL=rtcm.js.map