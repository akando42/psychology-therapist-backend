import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IProviderProfile } from "../../../models/provider-profile";

export abstract class AbstractProvidersProfileRepository extends AbstractRepository<IProviderProfile>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }

}