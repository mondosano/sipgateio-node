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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAnnouncementAudio = exports.getAudioMetadata = void 0;
const music_metadata_1 = require("music-metadata");
const axios_1 = __importDefault(require("axios"));
exports.getAudioMetadata = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default({
        method: 'get',
        url: url,
        responseType: 'stream',
    });
    const metadata = yield music_metadata_1.parseStream(response.data);
    return metadata.format;
});
const validateAudio = (metadata, validateOptions) => {
    for (const key in validateOptions) {
        if (validateOptions[key] !==
            metadata[key]) {
            return false;
        }
    }
    return true;
};
exports.validateAnnouncementAudio = (urlToAnnouncement) => __awaiter(void 0, void 0, void 0, function* () {
    const validateOptions = {
        container: 'WAVE',
        codec: 'PCM',
        bitsPerSample: 16,
        sampleRate: 8000,
        numberOfChannels: 1,
    };
    const metadata = yield exports.getAudioMetadata(urlToAnnouncement);
    return {
        isValid: validateAudio(metadata, validateOptions),
        metadata,
    };
});
//# sourceMappingURL=audioUtils.js.map