"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBase64 = exports.toBase64 = void 0;
const buffer_1 = require("buffer");
exports.toBase64 = (input) => {
    if (typeof btoa !== 'undefined') {
        return btoa(input);
    }
    else {
        return buffer_1.Buffer.from(input, 'binary').toString('base64');
    }
};
exports.fromBase64 = (input) => {
    if (typeof atob !== 'undefined') {
        return atob(input);
    }
    else {
        return buffer_1.Buffer.from(input, 'base64').toString('binary');
    }
};
//# sourceMappingURL=utils.js.map