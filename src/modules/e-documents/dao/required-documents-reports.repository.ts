import { UsersRolEnum } from "../../../enums/users-rol.enum";
import { IRequiredDocumentReport } from "../../../models/required-document-report";
import { DocumentReportStatusEnum } from "../../../enums/document-report-status.enum";


export interface IRequiredDocumentsReportsRepository {

    createRequiredDocumentReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport>;
    
    createManyRequiredDocumentsReports(report: IRequiredDocumentReport[]): Promise<IRequiredDocumentReport[]>;

    getUserReportsByRole(userId: number, role: UsersRolEnum): Promise<IRequiredDocumentReport[]>;

    getUserReportsByRoleAndStatus(userId: number, role: UsersRolEnum, status: DocumentReportStatusEnum): Promise<IRequiredDocumentReport[]>;
}