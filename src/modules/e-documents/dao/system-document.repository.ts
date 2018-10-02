import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";

import { ISystemDocument } from "../../../models/system.document";



export interface AbstractSystemDocumentRepository {


    createSystemDocument(systemDoc: ISystemDocument): Promise<number>;

    getSystemDocumentById(systemDoc: any): Promise<ISystemDocument>;

    getSystemDocument(): Promise<ISystemDocument[]>;
}