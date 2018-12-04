import { AbstractRepository } from "../../../core/repositories/repository.abstract";
import { IRawDocument } from "../../../models/raw-document";
import { IEDocument } from "../../../models/e-document";



export abstract class AbstractUserDocumentRepository extends AbstractRepository<IEDocument>{
    constructor(dao: any, converter: any) {
        super(dao, converter);
    }

    abstract createDocumentRef(document: IEDocument): Promise<IEDocument>;

    abstract getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument>;

}