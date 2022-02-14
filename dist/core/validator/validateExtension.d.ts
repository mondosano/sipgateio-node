import { ValidationResult } from './validator.types';
declare enum ExtensionType {
    APPLICATION = "a",
    CONFERENCE_ROOM = "c",
    REGISTER = "e",
    FAX = "f",
    GROUP = "g",
    IVR = "h",
    SIM = "i",
    SMS = "s",
    PERSON = "p",
    QUEUE = "q",
    CALLTHROUGH = "r",
    TRUNKING = "t",
    VOICEMAIL = "v",
    WEBUSER = "w",
    EXTERNAL = "x",
    MOBILE = "y"
}
declare const validateExtension: (extension: string, validTypes?: ExtensionType[]) => ValidationResult;
export { validateExtension, ExtensionType };
