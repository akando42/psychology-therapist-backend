import { IDocumentsTypeService } from "./i-documents-type.service";
import { IDocumentType } from "../../../../models/document-type";


export class DocumentsClasificationComponent {
    constructor(protected _documentsTypeService: IDocumentsTypeService) { }

    getAllDocumentsType(): Promise<IDocumentType[]> {
        return new Promise<IDocumentType[]>(async (resolve, reject) => {
            return resolve(await this._documentsTypeService.getAllDocumentsType());
        });
    }
}