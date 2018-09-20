import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentCategory } from "../../../models/document-category";

export abstract class AbstractDocumentsCategoriesRepository extends AbstractRepository<IDocumentCategory>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

    abstract getAllDocumentsCategories(): Promise<IDocumentCategory[]>;
    
    abstract getCategoryById(id): Promise<IDocumentCategory>;

}