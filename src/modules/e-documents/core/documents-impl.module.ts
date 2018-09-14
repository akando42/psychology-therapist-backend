import { AbstractDocumentModule } from "./abstract-documents.module";


export class DocumentModuleImpl extends AbstractDocumentModule {
    constructor(documentsTypeComponent) {
        super(documentsTypeComponent);
    }
}