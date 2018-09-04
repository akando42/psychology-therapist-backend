import { AbstractDocumentSignRepository } from "../document-sign.repository";



export class MySqlDocumentSignRepository extends AbstractDocumentSignRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
}

