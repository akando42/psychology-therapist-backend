import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";

import { ISystemDocument } from "../../../models/system.document";



export abstract class AbstractSystemDocumentRepository extends AbstractRepository<ISystemDocument> {
    constructor(dao: any, converter: any) {
        super(dao, converter);
    }

    abstract createSystemDocument(systemDoc: ISystemDocument): Promise<number>;

    abstract getSystemDocumentById(systemDoc: any): Promise<ISystemDocument>;

    abstract getSystemDocument(): Promise<ISystemDocument[]>;
}