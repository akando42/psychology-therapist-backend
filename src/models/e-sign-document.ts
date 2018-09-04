import { DocumentSignableStatusEnum } from "../enums/document-signable-status.enum";


export interface IDocumentSign {
    date?: number;
    documentID?: number;
    documentType?: string;
    documentStatus?: DocumentSignableStatusEnum
}