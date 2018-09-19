import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { AbstractRawDocumentRepository } from "../../raw-document.repository";
import { IRawDocument } from "../../../../../models/raw-document";
import { MySqlRawDocumentConverter } from "../../../converters/my-sql/my-sql-raw-document.converter";


export class MySqlRawDocumentRepository extends AbstractRawDocumentRepository {

    constructor() {
        super(new GenericDao('RAW_DOCUMENTS'), new MySqlRawDocumentConverter());
    }

    getRawDocument(rawDocumentId: number): Promise<IRawDocument> {
        throw new Error("Method not implemented.");
    }
    saveRawDocument(rawDocument: IRawDocument): Promise<any> {
        return super.create(rawDocument)
    }
}