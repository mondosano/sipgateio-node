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
exports.createSettingsModule = void 0;
const handleWebhookSettingError_1 = require("./errors/handleWebhookSettingError");
const validateWebhookUrl_1 = require("./validators/validateWebhookUrl");
const validateWhitelistExtensions_1 = require("./validators/validateWhitelistExtensions");
const SETTINGS_ENDPOINT = 'settings/sipgateio';
exports.createSettingsModule = (client) => ({
    setIncomingUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = validateWebhookUrl_1.validateWebhookUrl(url);
            if (!validationResult.isValid) {
                throw new Error(validationResult.cause);
            }
            yield modifyWebhookSettings(client, (settings) => (settings.incomingUrl = url));
        });
    },
    setOutgoingUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = validateWebhookUrl_1.validateWebhookUrl(url);
            if (!validationResult.isValid) {
                throw new Error(validationResult.cause);
            }
            yield modifyWebhookSettings(client, (settings) => (settings.outgoingUrl = url));
        });
    },
    setWhitelist(extensions) {
        return __awaiter(this, void 0, void 0, function* () {
            validateWhitelistExtensions_1.validateWhitelistExtensions(extensions);
            yield modifyWebhookSettings(client, (settings) => (settings.whitelist = extensions));
        });
    },
    setLog(value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield modifyWebhookSettings(client, (settings) => (settings.log = value));
        });
    },
    clearIncomingUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            yield modifyWebhookSettings(client, (settings) => (settings.incomingUrl = ''));
        });
    },
    clearOutgoingUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            yield modifyWebhookSettings(client, (settings) => (settings.outgoingUrl = ''));
        });
    },
    clearWhitelist() {
        return __awaiter(this, void 0, void 0, function* () {
            yield modifyWebhookSettings(client, (settings) => (settings.whitelist = []));
        });
    },
    disableWhitelist() {
        return __awaiter(this, void 0, void 0, function* () {
            yield modifyWebhookSettings(client, (settings) => (settings.whitelist = null));
        });
    },
    getWebhookSettings() {
        return getWebhookSettingsFromClient(client);
    },
});
const getWebhookSettingsFromClient = (client) => {
    return client
        .get(SETTINGS_ENDPOINT)
        .catch((error) => Promise.reject(handleWebhookSettingError_1.handleWebhookSettingsError(error)));
};
const modifyWebhookSettings = (client, fn) => __awaiter(void 0, void 0, void 0, function* () {
    yield getWebhookSettingsFromClient(client)
        .then((settings) => {
        fn(settings);
        return client.put(SETTINGS_ENDPOINT, settings);
    })
        .catch((error) => Promise.reject(handleWebhookSettingError_1.handleWebhookSettingsError(error)));
});
//# sourceMappingURL=webhookSettings.js.map