import { IDocumentsCategoriesService } from "./i-documents-categories.service";
import { AbstractDocumentsCategoriesRepository } from "../../dao/documents-categories.repository";
import { IDocumentCategory } from "../../../../models/document-category";


export class DocumentsCategoriesImplService implements IDocumentsCategoriesService {

    constructor(private _documentCategoriesRepository: AbstractDocumentsCategoriesRepository) { }

    createCategory(category: IDocumentCategory): Promise<number> {
        throw new Error("Method not implemented.");
    }
    updateCategory(categoryId: number, category: IDocumentCategory): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

}