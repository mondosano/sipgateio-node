import { Pagination } from '../core';
export interface NumbersModule {
    getAllNumbers: (pagination?: Pagination) => Promise<NumberResponse>;
}
export interface NumberResponseItem {
    id: string;
    number: string;
    localized: string;
    type: NumberResponseItemType;
    endpointId: string;
    endpointAlias: string;
    endpointUrl: string;
    mnpState?: NumberMnpState;
    portId?: number;
}
export declare enum NumberResponseItemType {
    MOBILE = "MOBILE",
    LANDLINE = "LANDLINE",
    QUICKDIAL = "QUICKDIAL",
    INTERNATIONAL = "INTERNATIONAL"
}
export interface NumberResponse {
    items: NumberResponseItem[];
}
export interface NumberMnpState {
    isReleased: boolean;
    releasedUntil: Date;
}
