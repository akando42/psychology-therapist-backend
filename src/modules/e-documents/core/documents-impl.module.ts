import { AbstractDocumentModule } from "./abstract-documents.module";
import { TODResponse } from "../../../dto/tod-response";
import { IDocumentUploadDTO } from "../../../dto/document-upload.dto";
import { UsersRolEnum } from "../../../enums/users-rol.enum";
import { DocumentReportStatusEnum } from "../../../enums/document-report-status.enum";


export class DocumentModuleImpl extends AbstractDocumentModule {

    constructor(
        documentsComponent,
        documentsTypeComponent,
        systemDocumentsComponent,
        requiredDocumentsReportComponent) {
        super(
            documentsComponent,
            documentsTypeComponent,
            systemDocumentsComponent,
            requiredDocumentsReportComponent);
    }
    uploadDocumentToFS(doc: any): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }

    uploadDocument(): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }

    uploadDocumentAsBlob(document: IDocumentUploadDTO): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const uploadRef = await this._documentsComponent.uploadDocument(document);
                console.log('upload result', uploadRef)
                return resolve({ payload: uploadRef, timestamp: new Date() })
            } catch (error) {
                return reject({ error: error })
            }
        });
    }

    async getDocumentsReportByUserAndRole(userId: number, userRole: UsersRolEnum, status?: DocumentReportStatusEnum): Promise<TODResponse> {
        try {
            const reports = await this._documentsReportsComponent.getDocumentsReportByUserAndRole(
                userId,
                userRole,
                status);
            return this._createTODDTO(reports, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }
    }
}