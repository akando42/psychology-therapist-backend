
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { AbstractRawDocumentRepository } from "../../raw-document.repository";
import { MySqlRawDocumentConverter } from "../../../converters/my-sql/my-sql-raw-document.converter";
import { IRawDocument } from "../../../../../models/raw-document";


export class MySqlRawDocumentRepository extends AbstractRawDocumentRepository {

    constructor() {
        super(new GenericDao('USERS_DOCUMENTS_RAW'), new MySqlRawDocumentConverter());
    }

    getRawDocument(rawDocumentId: number): Promise<IRawDocument> {
        throw new Error("Method not implemented.");
    }
    saveRawDocument(rawDocumentId: IRawDocument): Promise<number> {
        throw new Error("Method not implemented.");
    }
}