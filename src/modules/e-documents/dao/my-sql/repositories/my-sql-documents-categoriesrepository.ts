import { AbstractDocumentsCategoriesRepository } from "../../documents-Categories.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlDocumentsCategoriesConverter } from "../../../converters/my-sql/my-sql-documents-Categories.converter";
import { IDocumentCategory } from "../../../../../models/document-category";


export class MySqlDocumentsCategoriesRepository extends AbstractDocumentsCategoriesRepository {
    constructor() {
        super(new GenericDao('DOCUMENTS_CATEGORIES'), new MySqlDocumentsCategoriesConverter());
    }

    getAllDocumentCategories(): Promise<IDocumentCategory[]> {
        return this.getAllBy('SELECT * FROM DOCUMENTS_CATEGORIES');
    }
}

