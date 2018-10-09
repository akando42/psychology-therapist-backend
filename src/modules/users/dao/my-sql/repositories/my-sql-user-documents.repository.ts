
import { GenericDao } from "../../../../../core/mysql/generic.dao";
import { AbstractUserDocumentRepository } from "../../../../e-documents/dao/user-document.repository";
import { IEDocument } from "../../../../../models/e-document";


export class MySqlUserDocumentsRepository extends AbstractUserDocumentRepository {
    constructor() {
        super(new GenericDao('USERS_DOCUMENTS_RAW'),null);
    }
    createDocumentRef(document: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }
    getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }

}