import { AbstractEDocumentRepository } from "../e-document.repository";
import { AbstractDocumentsTypeRepository } from "../documents-type.repository";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { MySqlDocumentsTypeConverter } from "../../converters/my-sql/my-sql-documents-type.converter";
import { IDocumentType } from "../../../../models/document-type";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";


export class MySqlDocumentsTypeRepository extends AbstractDocumentsTypeRepository {
    constructor() {
        super(new GenericDao('DOCUMENTS_TYPES'), new MySqlDocumentsTypeConverter());
    }

    getAllDocumentTypes(): Promise<IDocumentType[]> {
        return this.getAllBy('SELECT * FROM DOCUMENTS_TYPEs');
    }
}

