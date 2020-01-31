export interface Fax {
	to: string;
	fileContent: Buffer;
	filename?: string;
	faxlineId: string;
}

// DTOs

export interface SendFaxSessionResponse {
	sessionId: string;
}

export interface FaxDTO {
	faxlineId: string;
	to: string;
	filename?: string;
	base64Content: string;
}

export interface HistoryFaxResponse {
	type: 'FAX';
	faxStatusType: FaxStatus;
}

export enum FaxStatus {
	SENT = 'SENT',
	PENDING = 'PENDING',
	FAILED = 'FAILED',
	SENDING = 'SENDING',
	SCHEDULED = 'SCHEDULED',
}
