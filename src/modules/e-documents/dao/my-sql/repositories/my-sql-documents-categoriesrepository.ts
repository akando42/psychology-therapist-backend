import { AbstractDocumentsCategoriesRepository } from "../../documents-Categories.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlDocumentsCategoriesConverter } from "../../../converters/my-sql/my-sql-documents-Categories.converter";
import { IDocumentCategory } from "../../../../../models/document-category";
import { IDocumentsCategoryMySql } from "../models/my-sql-document-category";
import { DeleteQuery } from "../../../../../query-spec/my-sql/delete-query";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";

const propsMap = {
    description: 'DocumentCategoryDescription',
    id: 'DocumentCategoryID',
    name: 'DocumentCategoryName'
}

@Repository('DOCUMENTS_CATEGORIES')
export class MySqlDocumentsCategoriesRepository implements AbstractDocumentsCategoriesRepository {
    
    @Convert(propsMap)
    @GetByQuery({ DocumentCategoryID: 0 })
    getCategoryById(id: any): Promise<IDocumentCategory> { return null; }
    
    @Convert(propsMap)
    @GetByQuery({})
    getAllDocumentsCategories(data?): Promise<IDocumentCategory[]> { return data; }

    deleteDocumentCategory(id: any): Promise<any> { return null; }
}

