import { AbstractDocumentsCategoriesRepository } from "../../documents-Categories.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlDocumentsCategoriesConverter } from "../../../converters/my-sql/my-sql-documents-Categories.converter";
import { IDocumentCategory } from "../../../../../models/document-category";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { IDocumentsCategoryMySql } from "../models/my-sql-document-category";
import { DeleteQuery } from "../../../../../query-spec/my-sql/delete-query";


export class MySqlDocumentsCategoriesRepository extends AbstractDocumentsCategoriesRepository {
    constructor() {
        super(new GenericDao('DOCUMENTS_CATEGORIES'), new MySqlDocumentsCategoriesConverter());
    }

    getCategoryById(id: any): Promise<IDocumentCategory> {
        return super.getBy(new GetByQuery(<IDocumentsCategoryMySql>{ DocumentCategoryID: id })
            .toDBQuery('DOCUMENTS_CATEGORIES'));
    }
    getAllDocumentsCategories(): Promise<IDocumentCategory[]> {
        return super.getAllBy('SELECT * FROM DOCUMENTS_CATEGORIES');
    }

    deleteDocumentCategory(id: any): Promise<any> {
        return super.delete(new DeleteQuery(<IDocumentsCategoryMySql>{ DocumentCategoryID: id })
            .toDBQuery('DOCUMENTS_CATEGORIES'));
    }
}

