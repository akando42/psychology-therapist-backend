import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { IRequiredDocumentsReportsRepository } from "../../required-documents-reports.repository";
import { IRequiredDocumentReport } from "../../../../../models/required-document-report";
import { DocumentReportStatusEnum } from "../../../../../enums/document-report-status.enum";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";

/**
 * mapping between domain model and database model.
 */
const propMap = {
    status: 'DocumentRequiredReportStatus', role: 'DocumentRequiredReportRole',
    id: 'DocumentRequiredReportID', userId: 'UserID', documentId: 'DocumentID'
}

@Repository('Document_Required_Report')
export class MySqlRequiredDocumentsReportsRepository implements IRequiredDocumentsReportsRepository {

    @CreateQuery({ return: false, primary: 'DocumentRequiredReportID' }, propMap)
    createManyRequiredDocumentsReports(report: IRequiredDocumentReport[]): Promise<IRequiredDocumentReport[]> {
        return null
    }

    @CreateQuery({ return: true, primary: 'DocumentRequiredReportID' }, propMap)
    createRequiredDocumentReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport> {
        return null;
    }


    getUserReportsByRole(userId: number, role: UsersRolEnum): Promise<IRequiredDocumentReport[]> {
        return null;
    }

    @Convert(propMap)
    @GetByQuery({ UserID: 0, DocumentRequiredReportRole: 1, DocumentRequiredReportStatus: 2 })
    getUserReportsByRoleAndStatus(userId: number, role: UsersRolEnum, status: DocumentReportStatusEnum): Promise<IRequiredDocumentReport[]> {
        return null;
    }


}

