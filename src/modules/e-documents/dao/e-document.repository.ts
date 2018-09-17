import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IEDocument } from "../../../models/e-document";

export abstract class AbstractEDocumentRepository extends AbstractRepository<IEDocument>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

    abstract createDocumentRef(document: IEDocument): Promise<IEDocument>;

    abstract getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument>;


}