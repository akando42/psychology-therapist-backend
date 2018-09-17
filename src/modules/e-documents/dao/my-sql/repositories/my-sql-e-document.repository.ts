import { AbstractEDocumentRepository } from "../../e-document.repository";
import { IEDocument } from "../../../../../models/e-document";


export class MySqlEDocumentRepository extends AbstractEDocumentRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }

    createDocumentRef(document: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }
    getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument> {
        throw new Error("Method not implemented.");
    }
}

