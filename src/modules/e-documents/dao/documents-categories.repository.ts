import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentCategory } from "../../../models/document-category";

export interface AbstractDocumentsCategoriesRepository {


    getAllDocumentsCategories(): Promise<IDocumentCategory[]>;

    getCategoryById(id): Promise<IDocumentCategory>;

    createCategory(id): Promise<IDocumentCategory>;

    deleteDocumentCategory(id: any): Promise<any>;

}