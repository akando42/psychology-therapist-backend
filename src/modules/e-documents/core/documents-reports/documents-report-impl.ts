import { IDocumentsReportsService } from "./i-documents-report.service";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";
import { IRequiredDocumentReport } from "../../../../models/required-document-report";
import { IRequiredDocumentsReportsRepository } from "../../dao/required-documents-reports.repository";
import { isNullOrUndefined } from "util";
import { Validate } from "../../../../behavior/validations/validate.notation";
import { Required } from "../../../../behavior/validations/validation.function";



export class DocumentsReportServiceImpl implements IDocumentsReportsService {


    constructor(private _documentsRequiredReportRepo: IRequiredDocumentsReportsRepository) { }

    @Validate([
        { parameterIndex: 0,name:'userId', cb: Required },
        { parameterIndex: 1, cb: Required },
        { parameterIndex: 2, cb: Required }
    ])
    async getDocumentsReportByUserAndRole(userId: number, userRole: UsersRolEnum, status: DocumentReportStatusEnum = DocumentReportStatusEnum.MISSING): Promise<IRequiredDocumentReport[]> {
        //dovalidations here

        //get Reports
        const reports: IRequiredDocumentReport[] = await this._documentsRequiredReportRepo.getUserReportsByRoleAndStatus(userId, userRole, status);
        console.log(reports)
        return reports;

    }

    // @Validate([{ parameterName: 'report', validatorCb: console.log }])
    async createDocumentReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport> {
        // create the role
        let reportCreated: IRequiredDocumentReport = await this._documentsRequiredReportRepo.createRequiredDocumentReport(report);

        return reportCreated;
    }

    async createManyDocumentsReports(reports: IRequiredDocumentReport[]): Promise<IRequiredDocumentReport[]> {
        console.log('readu for create', reports)

        // create the role
        let reportCreated: IRequiredDocumentReport[] =
            await this._documentsRequiredReportRepo.createManyRequiredDocumentsReports(reports);

        return reportCreated;
    }

}