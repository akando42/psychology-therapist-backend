
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { AbstractUserDocumentRepository } from "../../user-document.repository";
import { IEDocument } from "../../../../../models/e-document";
import { MySqlEDocumentConverter } from "../../../converters/my-sql/my-sql-e-document.converter";


export class MySqlUserDocumentsRepository extends AbstractUserDocumentRepository {
    constructor() {
        super(new GenericDao('USERS_DOCUMENTS_RAW'), new MySqlEDocumentConverter());
    }
    createDocumentRef(document: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }
    getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }

}