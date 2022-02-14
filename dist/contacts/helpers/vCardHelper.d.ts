import { ContactImport, ContactVCard } from './Address';
export declare const parseVCard: (vCardContent: string) => ContactVCard;
export declare const createVCards: (contacts: ContactImport[]) => string[];
