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
exports.createCallModule = void 0;
const handleCallError_1 = require("./errors/handleCallError");
const validateCallData_1 = require("./validators/validateCallData");
exports.createCallModule = (httpClient) => ({
    initiate(callData) {
        return __awaiter(this, void 0, void 0, function* () {
            const callDataValidation = validateCallData_1.validateCallData(callData);
            if (!callDataValidation.isValid) {
                throw new Error(callDataValidation.cause);
            }
            const callDTO = {
                callee: callData.to,
                caller: callData.from,
                callerId: callData.callerId,
                deviceId: callData.deviceId,
            };
            return httpClient
                .post('/sessions/calls', callDTO)
                .catch((error) => Promise.reject(handleCallError_1.handleCallError(error)));
        });
    },
});
//# sourceMappingURL=call.js.map