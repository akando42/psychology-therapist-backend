import { IDocumentsReportsService } from "./i-documents-report.service";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";
import { IRequiredDocumentReport } from "../../../../models/required-document-report";
import { IRequiredDocumentsReportsRepository } from "../../dao/required-documents-reports.repository";
import { isNullOrUndefined } from "util";
import { Validate } from "../../../../behavior/validations/validate.notation";



export class DocumentsReportServiceImpl implements IDocumentsReportsService {


    constructor(private _documentsRequiredReportRepo: IRequiredDocumentsReportsRepository) { }

    async getDocumentsReportByUserRole(userId: number, userRole: UsersRolEnum, status: DocumentReportStatusEnum): Promise<IRequiredDocumentReport[]> {
        //dovalidations here

        //get Reports
        const reports: IRequiredDocumentReport[] = await this._documentsRequiredReportRepo.getUserReportsByRoleAndStatus(userId, userRole, status);
        return reports;

    }

    @Validate([{ parameterName: 'report', validatorCb: console.log }])
    async createDocumentReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport> {
        // create the role
        let reportCreated: IRequiredDocumentReport = await this._documentsRequiredReportRepo.createRequiredDocumentReport(report);

        return reportCreated;
    }

    async createManyDocumentsReports(reports: IRequiredDocumentReport[]): Promise<IRequiredDocumentReport[]> {
        // create the role
        let reportCreated: IRequiredDocumentReport[] =
            await this._documentsRequiredReportRepo.createManyRequiredDocumentsReports(reports);

        return reportCreated;
    }

}