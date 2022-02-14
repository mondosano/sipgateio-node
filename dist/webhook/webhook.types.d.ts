/// <reference types="node" />
import { Server } from 'http';
export declare enum EventType {
    NEW_CALL = "newCall",
    ANSWER = "answer",
    HANGUP = "hangup",
    DATA = "dtmf"
}
export declare type HandlerCallback<T extends GenericEvent, U> = (event: T) => U;
export declare type NewCallCallback = HandlerCallback<NewCallEvent, ResponseObject | Promise<ResponseObject> | void>;
export declare type AnswerCallback = HandlerCallback<AnswerEvent, void>;
export declare type HangUpCallback = HandlerCallback<HangUpEvent, void>;
export declare type DataCallback = HandlerCallback<DataEvent, ResponseObject | void>;
export interface WebhookHandlers {
    [EventType.NEW_CALL]?: NewCallCallback;
    [EventType.ANSWER]?: AnswerCallback;
    [EventType.HANGUP]?: HangUpCallback;
    [EventType.DATA]?: DataCallback;
}
export interface WebhookServer {
    onNewCall: (fn: NewCallCallback) => void;
    onAnswer: (fn: AnswerCallback) => void;
    onHangUp: (fn: HangUpCallback) => void;
    onData: (fn: DataCallback) => void;
    stop: () => void;
    getHttpServer: () => Server;
}
export interface ServerOptions {
    port: number | string;
    serverAddress: string;
    hostname?: string;
    skipSignatureVerification?: boolean;
}
export interface WebhookModule {
    createServer: (serverOptions: ServerOptions) => Promise<WebhookServer>;
}
export interface WebhookResponseInterface {
    redirectCall: (redirectOptions: RedirectOptions) => RedirectObject;
    gatherDTMF: (gatherOptions: GatherOptions) => Promise<GatherObject>;
    playAudio: (playOptions: PlayOptions) => Promise<PlayObject>;
    rejectCall: (rejectOptions: RejectOptions) => RejectObject;
    hangUpCall: () => HangUpObject;
    sendToVoicemail: () => VoicemailObject;
}
export declare enum RejectReason {
    BUSY = "busy",
    REJECTED = "rejected"
}
export declare enum WebhookDirection {
    IN = "in",
    OUT = "out"
}
export declare enum HangUpCause {
    NORMAL_CLEARING = "normalClearing",
    BUSY = "busy",
    CANCEL = "cancel",
    NO_ANSWER = "noAnswer",
    CONGESTION = "congestion",
    NOT_FOUND = "notFound",
    FORWARDED = "forwarded"
}
export interface GenericEvent {
    event: EventType;
    callId: string;
    originalCallId: string;
}
interface GenericCallEvent extends GenericEvent {
    direction: WebhookDirection;
    from: string;
    to: string;
    xcid: string;
}
export interface NewCallEvent extends GenericCallEvent {
    event: EventType.NEW_CALL;
    originalCallId: string;
    users: string[];
    userIds: string[];
    fullUserIds: string[];
}
export interface AnswerEvent extends GenericCallEvent {
    event: EventType.ANSWER;
    answeringNumber: string;
    user?: string;
    userId?: string;
    fullUserId?: string;
    diversion?: string;
}
export interface DataEvent extends GenericEvent {
    event: EventType.DATA;
    dtmf: string;
}
export interface HangUpEvent extends GenericCallEvent {
    event: EventType.HANGUP;
    cause: HangUpCause;
    answeringNumber: string;
}
export declare type CallEvent = NewCallEvent | AnswerEvent | HangUpEvent | DataEvent;
export declare type RedirectOptions = {
    numbers: string[];
    anonymous?: boolean;
    callerId?: string;
};
export declare type GatherOptions = {
    announcement?: string;
    maxDigits: number;
    timeout: number;
};
export declare type PlayOptions = {
    announcement: string;
};
export declare type RejectOptions = {
    reason: RejectReason;
};
export declare type RedirectObject = {
    Dial: {
        _attributes: {
            callerId?: string;
            anonymous?: string;
        };
        Number: string[];
    };
};
export declare type GatherObject = {
    Gather: {
        _attributes: {
            onData?: string;
            maxDigits?: string;
            timeout?: string;
        };
        Play?: {
            Url: string;
        };
    };
};
export declare type PlayObject = {
    Play: {
        Url: string;
    };
};
export declare type RejectObject = {
    Reject: {
        _attributes: {
            reason?: string;
        };
    };
};
export declare type HangUpObject = {
    Hangup: {};
};
export declare type VoicemailObject = {
    Dial: {
        Voicemail: {};
    };
};
export declare type ResponseObject = RedirectObject | VoicemailObject | PlayObject | GatherObject | HangUpObject | RejectObject;
export {};
