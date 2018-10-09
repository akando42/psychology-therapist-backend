import { DocumentReportStatusEnum } from "../enums/document-report-status.enum";
import { UsersRolEnum } from "../enums/users-rol.enum";


export interface IRequiredDocumentReport {
    userId: any;
    status: DocumentReportStatusEnum;
    id?: number;
    role: UsersRolEnum;
    documentId: number;
    documentRequiredId: number;
}
