import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentSign } from "../../../models/e-sign-document";
import { DocumentSignableStatusEnum } from "../../../enums/document-signable-status.enum";
import { IDocumentType } from "../../../models/document-type";

export abstract class AbstractDocumentsTypeRepository extends AbstractRepository<IDocumentType>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

    abstract getById(typeId: number): Promise<IDocumentType[]>;

    abstract getAllDocumentTypes(): Promise<IDocumentType[]>;

    abstract getAllDocumentTypesByCategory(category: any): Promise<IDocumentType[]>;

}