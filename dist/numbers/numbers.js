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
exports.createNumbersModule = void 0;
const handleNumbersError_1 = require("./errors/handleNumbersError");
exports.createNumbersModule = (client) => ({
    getAllNumbers(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return client
                .get('/numbers', {
                params: Object.assign({}, pagination),
            })
                .catch((error) => Promise.reject(handleNumbersError_1.handleNumbersError(error)));
        });
    },
});
//# sourceMappingURL=numbers.js.map