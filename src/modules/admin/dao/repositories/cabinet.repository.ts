
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { IUser } from "../../../../models/user";


export abstract class AbstractCabinetsRepository extends AbstractRepository<any>{
    constructor(dao, converter?) {
        super(dao, converter);
    }

    abstract getAdminCabinetUsers(adminID: any): Promise<IUser[]>;

}
