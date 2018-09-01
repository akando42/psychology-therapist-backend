import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IHealthService } from "../../../models/health-service";
import { GenericDao as MySqlGenericDao } from "../../../behavior/mysql/generic.dao";
import { IDualConverter } from "../../../behavior/converters/converter.interface";


export abstract class AbstractHealthServiceRepository extends AbstractRepository<IHealthService>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }
}