import { IDocumentsReportsService } from "./i-documents-report.service";
import { IRequiredDocumentReport } from "../../../../models/required-document-report";


export class DocumentsReportComponent {
    constructor(
        private _documentsRequiredReportsService: IDocumentsReportsService
    ) { }


    async createDocumentRequiredReport(report: IRequiredDocumentReport): Promise<IRequiredDocumentReport> {

        //crate the report;
        const reportCreated = await this._documentsRequiredReportsService.createDocumentsReport(report);
        return reportCreated;
    }
}