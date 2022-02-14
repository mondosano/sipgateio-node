import { SMSModule, SmsSenderId } from './sms.types';
import { SipgateIOClient } from '../core/sipgateIOClient';
export declare const createSMSModule: (client: SipgateIOClient) => SMSModule;
export declare const getUserSmsExtension: (client: SipgateIOClient, webuserId: string) => Promise<string>;
export declare const getSmsCallerIds: (client: SipgateIOClient, webuserExtension: string, smsExtension: string) => Promise<SmsSenderId[]>;
export declare const containsPhoneNumber: (smsCallerIds: SmsSenderId[], phoneNumber: string) => boolean;
