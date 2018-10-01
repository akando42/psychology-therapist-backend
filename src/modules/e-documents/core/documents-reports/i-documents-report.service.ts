import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { IRequiredDocumentReport } from "../../../../models/required-document-report";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";



export interface IDocumentsReportsService {

    /**
     * Retrieve all users required documents report, by user role and status of the report
     * @param userId user id
     * @param userRole role
     * @param status status of the report.
     */
    getDocumentsReportByUserRole(userId: number, userRole: UsersRolEnum, status: DocumentReportStatusEnum): Promise<IRequiredDocumentReport[]>

    /**
     * Create a document required report, ej: when a user its required to sign a document
     * @param report report
     */
    createDocumentReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport>;

    /**
     * Create a document required report, ej: when a user its required to sign a document
     * @param report report
     */
    createManyDocumentsReports(report: IRequiredDocumentReport[]): Promise<IRequiredDocumentReport[]>;

}