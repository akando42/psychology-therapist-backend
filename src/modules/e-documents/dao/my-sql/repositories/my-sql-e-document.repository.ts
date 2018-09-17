import { AbstractEDocumentRepository } from "../../e-document.repository";
import { IEDocument } from "../../../../../models/e-document";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlEDocumentConverter } from "../../../converters/my-sql/my-sql-e-document.converter";


export class MySqlEDocumentRepository extends AbstractEDocumentRepository {
    constructor() {
        super(new GenericDao('DOCUMENTS'), new MySqlEDocumentConverter());
    }

    createDocumentRef(document: IEDocument): Promise<IEDocument> {
        return super.create(document)
    }
    getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }
}

