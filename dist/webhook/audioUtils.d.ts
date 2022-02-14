export interface ValidateOptions {
    container?: string;
    codec?: string;
    bitsPerSample?: number;
    sampleRate?: number;
    numberOfChannels?: number;
}
interface ValidateResult {
    isValid: boolean;
    metadata: ValidateOptions;
}
export declare const getAudioMetadata: (url: string) => Promise<ValidateOptions>;
export declare const validateAnnouncementAudio: (urlToAnnouncement: string) => Promise<ValidateResult>;
export {};
