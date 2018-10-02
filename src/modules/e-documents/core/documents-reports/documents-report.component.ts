import { IDocumentsReportsService } from "./i-documents-report.service";
import { IRequiredDocumentReport } from "../../../../models/required-document-report";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";


export class DocumentsReportComponent {
    constructor(
        private _documentsRequiredReportsService: IDocumentsReportsService
    ) { }


    async createDocumentRequiredReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport> {
        //crate the report;
        const reportCreated = await this._documentsRequiredReportsService.createDocumentReport(report);
        return reportCreated;
    }
    async getDocumentsReportByUserAndRole(userId: number, role: UsersRolEnum, status: DocumentReportStatusEnum): Promise<IRequiredDocumentReport[]> {
        //crate the report;
        const reports = await this._documentsRequiredReportsService.getDocumentsReportByUserAndRole(userId, role, status);
        return reports;
    }
}