import { AbstractDocumentsTypeRepository } from "../../documents-type.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlDocumentsTypeConverter } from "../../../converters/my-sql/my-sql-documents-type.converter";
import { IDocumentType } from "../../../../../models/document-type";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { IDocumentsTypeMySql } from "../models/my-sql-documents-type";


export class MySqlDocumentsTypeRepository extends AbstractDocumentsTypeRepository {
    constructor() {
        super(new GenericDao('DOCUMENTS_TYPES'), new MySqlDocumentsTypeConverter());
    }
    getById(typeId: number): Promise<IDocumentType[]> {
        return this.getAllBy(
            new GetByQuery(<IDocumentsTypeMySql>{ DocumentTypeID: typeId }).toDBQuery('DOCUMENTS_TYPES'));
    }

    getAllDocumentTypes(): Promise<IDocumentType[]> {
        return this.getAllBy('SELECT * FROM DOCUMENTS_TYPES');
    }
    getAllDocumentTypesByCategory(categoryId: any): Promise<IDocumentType[]> {
        return this.getAllBy(new GetByQuery(<IDocumentsTypeMySql>{ CategoryID: categoryId }).toDBQuery('DOCUMENTS_TYPES'));
    }
}

