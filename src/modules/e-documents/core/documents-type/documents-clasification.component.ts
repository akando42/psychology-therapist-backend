import { IDocumentsTypeService } from "./i-documents-type.service";
import { IDocumentType } from "../../../../models/document-type";
import { IDocumentCategory } from "../../../../models/document-category";
import { IDocumentsCategoriesService } from "../documents-categories/i-documents-categories.service";


export class DocumentsClasificationComponent {
    constructor(
        private _documentsTypeService: IDocumentsTypeService,
        private _documentsCategoriesService: IDocumentsCategoriesService
    ) { }

    getAllDocumentsType(): Promise<IDocumentType[]> {
        return new Promise<IDocumentType[]>(async (resolve, reject) => {
            return resolve(await this._documentsTypeService.getAllDocumentsType());
        });
    }

    createCategory(category: IDocumentCategory): Promise<any> {
        return this._documentsCategoriesService.createCategory(category);
    }

    createDocType(type: IDocumentType): Promise<any> {
        return this._documentsTypeService.createDocType(type);
    }
}