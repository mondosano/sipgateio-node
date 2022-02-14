import { CallModule } from './call.types';
import { SipgateIOClient } from '../core/sipgateIOClient';
export declare const createCallModule: (httpClient: SipgateIOClient) => CallModule;
