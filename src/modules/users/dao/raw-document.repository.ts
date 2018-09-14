import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IRawDocument } from "../../../models/raw-document";



export abstract class AbstractRawDocumentRepository extends AbstractRepository<IRawDocument>{
    constructor(dao: any, converter: any) {
        super(dao, converter);
    }

    abstract getRawDocument(rawDocumentId: number): Promise<IRawDocument>;

    abstract saveRawDocument(rawDocumentId: IRawDocument): Promise<number>;

}