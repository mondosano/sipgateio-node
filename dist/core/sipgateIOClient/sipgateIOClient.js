"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sipgateIO = void 0;
const detect_browser_1 = require("detect-browser");
const errors_1 = require("../errors");
const utils_1 = require("../../utils");
const validator_1 = require("../validator");
const version_json_1 = require("../../version.json");
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const validatePersonalAccessToken_1 = require("../validator/validatePersonalAccessToken");
const parseRawDeserializedValue = (value) => {
    return value === null
        ? null
        : value instanceof Array
            ? value.map(parseRawDeserializedValue)
            : typeof value === 'object'
                ? parseDatesInObject(value)
                : typeof value === 'string'
                    ? parseIfDate(value)
                    : value;
};
const parseDatesInObject = (data) => {
    const newData = {};
    Object.keys(data).forEach((key) => {
        const value = data[key];
        newData[key] = parseRawDeserializedValue(value);
    });
    return newData;
};
const parseIfDate = (maybeDate) => {
    const regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)(?:Z|([+-])([\d|:]*))?$/;
    if (maybeDate.match(regexISO)) {
        return new Date(maybeDate);
    }
    return maybeDate;
};
exports.sipgateIO = (credentials) => {
    const authorizationHeader = getAuthHeader(credentials);
    const platformInfo = detect_browser_1.detect();
    const client = axios_1.default.create({
        baseURL: 'https://api.sipgate.com/v2',
        headers: {
            Authorization: authorizationHeader,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Sipgate-Client': JSON.stringify(platformInfo),
            'X-Sipgate-Version': version_json_1.version,
        },
        paramsSerializer: (params) => qs_1.default.stringify(params, { arrayFormat: 'repeat' }),
    });
    client.interceptors.response.use((response) => {
        response.data = parseRawDeserializedValue(response.data);
        return response;
    });
    return {
        delete(url, config) {
            return client.delete(url, config).then((response) => response.data);
        },
        get(url, config) {
            return client.get(url, config).then((response) => response.data);
        },
        patch(url, data, config) {
            return client
                .patch(url, data, config)
                .then((response) => response.data);
        },
        post(url, data, config) {
            return client
                .post(url, data, config)
                .then((response) => response.data);
        },
        put(url, data, config) {
            return client.put(url, data, config).then((response) => response.data);
        },
        getAuthenticatedWebuserId() {
            return client
                .get('authorization/userinfo')
                .then((response) => response.data.sub)
                .catch((error) => Promise.reject(errors_1.handleCoreError(error)));
        },
    };
};
const getAuthHeader = (credentials) => {
    if ('tokenId' in credentials) {
        const tokenIDValidationResult = validator_1.validateTokenID(credentials.tokenId);
        if (!tokenIDValidationResult.isValid) {
            throw new Error(tokenIDValidationResult.cause);
        }
        const tokenValidationResult = validatePersonalAccessToken_1.validatePersonalAccessToken(credentials.token);
        if (!tokenValidationResult.isValid) {
            throw new Error(tokenValidationResult.cause);
        }
        return `Basic ${utils_1.toBase64(`${credentials.tokenId}:${credentials.token}`)}`;
    }
    if ('token' in credentials) {
        const tokenValidationResult = validator_1.validateOAuthToken(credentials.token);
        if (!tokenValidationResult.isValid) {
            throw new Error(tokenValidationResult.cause);
        }
        return `Bearer ${credentials.token}`;
    }
    const emailValidationResult = validator_1.validateEmail(credentials.username);
    if (!emailValidationResult.isValid) {
        throw new Error(emailValidationResult.cause);
    }
    const passwordValidationResult = validator_1.validatePassword(credentials.password);
    if (!passwordValidationResult.isValid) {
        throw new Error(passwordValidationResult.cause);
    }
    return `Basic ${utils_1.toBase64(`${credentials.username}:${credentials.password}`)}`;
};
//# sourceMappingURL=sipgateIOClient.js.map