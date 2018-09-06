import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentSign } from "../../../models/e-sign-document";
import { DocumentSignableStatusEnum } from "../../../enums/document-signable-status.enum";
import { IProviderProfile } from "../../../models/provider-profile";

export abstract class AbstractProvidersProfileRepository extends AbstractRepository<IProviderProfile>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

}