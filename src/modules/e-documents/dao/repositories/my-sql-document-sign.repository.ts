import { AbstractEDocumentRepository } from "../e-document.repository";


export class MySqlEDocumentRepository extends AbstractEDocumentRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
}

