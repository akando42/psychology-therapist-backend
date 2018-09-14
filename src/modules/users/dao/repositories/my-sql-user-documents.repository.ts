
import { AbstractLocationsRepository } from "../locations.repository";
import { ILocation } from "../../../../models/location";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { MySqlLocationsConverter } from "../../converters/my-sql/my-sql-locations.converter";
import { AbstractUserDocumentRepository } from "../user-document.repository";
import { IEDocument } from "../../../../models/e-document";
import { MySqlEDocumentConverter } from "../../converters/my-sql/my-sql-e-document.converter";


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