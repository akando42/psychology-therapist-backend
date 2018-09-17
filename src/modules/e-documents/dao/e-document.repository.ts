import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentSign } from "../../../models/e-sign-document";
import { DocumentSignableStatusEnum } from "../../../enums/document-signable-status.enum";
import { IEDocument } from "../../../models/e-document";

export abstract class AbstractEDocumentRepository extends AbstractRepository<IDocumentSign>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

    abstract createDocumentRef(document: IEDocument): Promise<IEDocument>;

    abstract getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument>;


}