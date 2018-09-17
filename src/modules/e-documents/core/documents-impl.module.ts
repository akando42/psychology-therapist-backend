import { AbstractDocumentModule } from "./abstract-documents.module";
import { TODResponse } from "../../../dto/tod-response";


export class DocumentModuleImpl extends AbstractDocumentModule {

    constructor(documentsTypeComponent) {
        super(documentsTypeComponent);
    }

    uploadDocument(): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }

    uploadDocumentAsBlob(): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }
}