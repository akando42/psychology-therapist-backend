import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { ILoginAttemp } from "../../../../models/login-attemp";

export abstract class AbstractLoginAttempssRepository extends AbstractRepository<ILoginAttemp>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }
}