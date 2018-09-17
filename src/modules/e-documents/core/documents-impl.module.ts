import { AbstractDocumentModule } from "./abstract-documents.module";
import { TODResponse } from "../../../dto/tod-response";
import { IDocumentUploadDTO } from "../../../dto/document-upload.dto";


export class DocumentModuleImpl extends AbstractDocumentModule {

    constructor(documentsComponent, documentsTypeComponent) {
        super(
            documentsComponent,
            documentsTypeComponent);
    }

    uploadDocument(): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }

    uploadDocumentAsBlob(document: IDocumentUploadDTO): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const uploadRef = this._documentsComponent.uploadDocument(document);
            } catch (error) {

            }
        });
    }
}