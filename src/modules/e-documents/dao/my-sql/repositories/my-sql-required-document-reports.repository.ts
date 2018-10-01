import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { IRequiredDocumentsReportsRepository } from "../../required-documents-reports.repository";
import { IRequiredDocumentReport } from "../../../../../models/required-document-report";
import { DocumentReportStatusEnum } from "../../../../../enums/document-report-status.enum";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";

/**
 * mapping between domain model and database model.
 */
const propMap = {
    status: 'RequiredDocumentReportStatus', role: 'RequiredDocumentReportRole',
    id: 'RequiredDocumentReportID', userId: 'UserID', documentId: 'DocumentID'
}

@Repository('')
export class MySqlRequiredDocumentsReportsRepository implements IRequiredDocumentsReportsRepository {

    @CreateQuery({ return: true, primary: 'DocumentRequiredReportID' }, propMap)
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

    getUserReportsByRoleAndStatus(userId: number, role: UsersRolEnum, status: DocumentReportStatusEnum): Promise<IRequiredDocumentReport[]> {
        return null;
    }


}

