import { IDocumentsTypeService } from "./i-documents-type.service";
import { IDocumentType } from "../../../../models/document-type";
import { IDocumentCategory } from "../../../../models/document-category";
import { IDocumentsCategoriesService } from "../documents-categories/i-documents-categories.service";


export class DocumentsClasificationComponent {
    constructor(
        private _documentsTypeService: IDocumentsTypeService,
        private _documentsCategoriesService: IDocumentsCategoriesService
    ) { }

    getAllDocumentsType(query?:any): Promise<IDocumentType[]> {
        return new Promise<IDocumentType[]>(async (resolve, reject) => {
            return resolve(await this._documentsTypeService.getAllDocumentsType(query));
        });
    }
    getAllDocumentsCategories(): Promise<IDocumentCategory[]> {
        return new Promise<IDocumentType[]>(async (resolve, reject) => {
            return resolve(await this._documentsCategoriesService.getAllDocumentsCategories());
        });
    }
    createCategory(category: IDocumentCategory): Promise<any> {
        return this._documentsCategoriesService.createCategory(category);
    }
    deleteCategory(categoryId: any): Promise<any> {
        return this._documentsCategoriesService.deleteCategory(categoryId);
    }

    createDocType(type: IDocumentType): Promise<any> {
        return this._documentsTypeService.createDocType(type);
    }
}