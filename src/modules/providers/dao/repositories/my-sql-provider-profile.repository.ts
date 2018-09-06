import { AbstractProvidersProfileRepository } from "../provider-profile.repository";

export class MySqlProviderProfileRepository extends AbstractProvidersProfileRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
}

