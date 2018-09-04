import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentSign } from "../../../models/e-sign-document";
import { DocumentSignableStatusEnum } from "../../../enums/document-signable-status.enum";

export abstract class AbstractDocumentSignRepository extends AbstractRepository<IDocumentSign>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

}