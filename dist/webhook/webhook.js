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
exports.WebhookResponse = exports.createWebhookModule = void 0;
const webhook_types_1 = require("./webhook.types");
const http_1 = require("http");
const webhook_errors_1 = require("./webhook.errors");
const signatureVerifier_1 = require("./signatureVerifier");
const xml_js_1 = require("xml-js");
const qs_1 = require("qs");
const audioUtils_1 = require("./audioUtils");
exports.createWebhookModule = () => ({
    createServer: createWebhookServer,
});
const SIPGATE_IP_ADRESS = '217.116.118.254';
const createWebhookServer = (serverOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const handlers = {
        [webhook_types_1.EventType.NEW_CALL]: () => {
            return;
        },
    };
    return new Promise((resolve, reject) => {
        const requestHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const requestBody = yield collectRequestData(req);
            if (!serverOptions.skipSignatureVerification) {
                if (!((_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.includes(SIPGATE_IP_ADRESS))) {
                    console.error(webhook_errors_1.WebhookErrorMessage.INVALID_ORIGIN);
                    res.end(`<?xml version="1.0" encoding="UTF-8"?><Error message="${webhook_errors_1.WebhookErrorMessage.INVALID_ORIGIN}" />`);
                    return;
                }
                if (!signatureVerifier_1.isSipgateSignature(req.headers['x-sipgate-signature'], requestBody)) {
                    console.error(webhook_errors_1.WebhookErrorMessage.SIPGATE_SIGNATURE_VERIFICATION_FAILED);
                    res.end(`<?xml version="1.0" encoding="UTF-8"?><Error message="${webhook_errors_1.WebhookErrorMessage.SIPGATE_SIGNATURE_VERIFICATION_FAILED}" />`);
                    return;
                }
            }
            res.setHeader('Content-Type', 'application/xml');
            const requestBodyJSON = parseRequestBodyJSON(requestBody);
            const requestCallback = handlers[requestBodyJSON.event];
            if (requestCallback === undefined) {
                res.end(`<?xml version="1.0" encoding="UTF-8"?><Error message="No handler for ${requestBodyJSON.event} event" />`);
                return;
            }
            const callbackResult = requestCallback(requestBodyJSON) || undefined;
            const responseObject = createResponseObject(callbackResult instanceof Promise
                ? yield callbackResult
                : callbackResult, serverOptions.serverAddress);
            if (handlers[webhook_types_1.EventType.ANSWER]) {
                responseObject.Response['_attributes'].onAnswer =
                    serverOptions.serverAddress;
            }
            if (handlers[webhook_types_1.EventType.HANGUP]) {
                responseObject.Response['_attributes'].onHangup =
                    serverOptions.serverAddress;
            }
            const xmlResponse = createXmlResponse(responseObject);
            res.end(xmlResponse);
        });
        const server = http_1.createServer(requestHandler).on('error', reject);
        server.listen({
            port: serverOptions.port,
            hostname: serverOptions.hostname || 'localhost',
        }, () => {
            resolve({
                onNewCall: (handler) => {
                    handlers[webhook_types_1.EventType.NEW_CALL] = handler;
                },
                onAnswer: (handler) => {
                    if (!serverOptions.serverAddress)
                        throw new Error(webhook_errors_1.WebhookErrorMessage.SERVERADDRESS_MISSING_FOR_FOLLOWUPS);
                    handlers[webhook_types_1.EventType.ANSWER] = handler;
                },
                onHangUp: (handler) => {
                    if (!serverOptions.serverAddress)
                        throw new Error(webhook_errors_1.WebhookErrorMessage.SERVERADDRESS_MISSING_FOR_FOLLOWUPS);
                    handlers[webhook_types_1.EventType.HANGUP] = handler;
                },
                onData: (handler) => {
                    if (!serverOptions.serverAddress)
                        throw new Error(webhook_errors_1.WebhookErrorMessage.SERVERADDRESS_MISSING_FOR_FOLLOWUPS);
                    handlers[webhook_types_1.EventType.DATA] = handler;
                },
                stop: () => {
                    if (server) {
                        server.close();
                    }
                },
                getHttpServer: () => server,
            });
        });
    });
});
const parseRequestBodyJSON = (body) => {
    body = body
        .replace(/user%5B%5D/g, 'users%5B%5D')
        .replace(/userId%5B%5D/g, 'userIds%5B%5D')
        .replace(/fullUserId%5B%5D/g, 'fullUserIds%5B%5D')
        .replace(/origCallId/g, 'originalCallId');
    const parsedBody = qs_1.parse(body);
    if ('from' in parsedBody && parsedBody.from !== 'anonymous') {
        parsedBody.from = `+${parsedBody.from}`;
    }
    if ('to' in parsedBody && parsedBody.to !== 'anonymous') {
        parsedBody.to = `+${parsedBody.to}`;
    }
    if ('diversion' in parsedBody && parsedBody.diversion !== 'anonymous') {
        parsedBody.diversion = `+${parsedBody.diversion}`;
    }
    if ('answeringNumber' in parsedBody &&
        parsedBody.answeringNumber !== 'anonymous') {
        parsedBody.answeringNumber = `+${parsedBody.answeringNumber}`;
    }
    return parsedBody;
};
const collectRequestData = (request) => {
    return new Promise((resolve, reject) => {
        if (request.headers['content-type'] &&
            !request.headers['content-type'].includes('application/x-www-form-urlencoded')) {
            reject();
        }
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            resolve(body);
        });
    });
};
const createResponseObject = (responseObject, serverAddress) => {
    if (responseObject && isGatherObject(responseObject)) {
        responseObject.Gather._attributes['onData'] = serverAddress;
    }
    return {
        _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
        Response: Object.assign({ _attributes: {} }, responseObject),
    };
};
const createXmlResponse = (responseObject) => {
    const options = {
        compact: true,
        ignoreComment: true,
        spaces: 4,
    };
    return xml_js_1.js2xml(responseObject, options);
};
const isGatherObject = (gatherCandidate) => {
    var _a;
    return ((_a = gatherCandidate) === null || _a === void 0 ? void 0 : _a.Gather) !== undefined;
};
exports.WebhookResponse = {
    gatherDTMF: (gatherOptions) => __awaiter(void 0, void 0, void 0, function* () {
        const gatherObject = {
            Gather: {
                _attributes: {
                    maxDigits: String(gatherOptions.maxDigits),
                    timeout: String(gatherOptions.timeout),
                },
            },
        };
        if (gatherOptions.announcement) {
            const validationResult = yield audioUtils_1.validateAnnouncementAudio(gatherOptions.announcement);
            if (!validationResult.isValid) {
                throw new Error(`\n\n${webhook_errors_1.WebhookErrorMessage.AUDIO_FORMAT_ERROR}\nYour format was: ${JSON.stringify(validationResult.metadata)}\n`);
            }
            gatherObject.Gather['Play'] = {
                Url: gatherOptions.announcement,
            };
        }
        return gatherObject;
    }),
    hangUpCall: () => {
        return { Hangup: {} };
    },
    playAudio: (playOptions) => __awaiter(void 0, void 0, void 0, function* () {
        const validationResult = yield audioUtils_1.validateAnnouncementAudio(playOptions.announcement);
        if (!validationResult.isValid) {
            throw new Error(`\n\n${webhook_errors_1.WebhookErrorMessage.AUDIO_FORMAT_ERROR}\nYour format was: ${JSON.stringify(validationResult.metadata)}\n`);
        }
        return { Play: { Url: playOptions.announcement } };
    }),
    redirectCall: (redirectOptions) => {
        return {
            Dial: {
                _attributes: {
                    callerId: redirectOptions.callerId,
                    anonymous: String(redirectOptions.anonymous),
                },
                Number: redirectOptions.numbers,
            },
        };
    },
    rejectCall: (rejectOptions) => {
        return { Reject: { _attributes: { reason: rejectOptions.reason } } };
    },
    sendToVoicemail: () => {
        return { Dial: { Voicemail: {} } };
    },
};
//# sourceMappingURL=webhook.js.map