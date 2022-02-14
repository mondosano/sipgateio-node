/// <reference types="node" />
import { ValidationResult } from '../../core/validator';
export declare enum FaxValidationMessage {
    INVALID_PDF_MIME_TYPE = "Invalid PDF file"
}
declare const validatePdfFileContent: (content: Buffer) => ValidationResult;
export { validatePdfFileContent };
