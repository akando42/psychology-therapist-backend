
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { IUser } from "../../../../models/user";
import { ICabinet } from "../../../../models/cabinet";


export abstract class AbstractCabinetsRepository extends AbstractRepository<any>{
    constructor(dao, converter?) {
        super(dao, converter);
    }

    abstract createCabinet(cabinet: ICabinet): Promise<any>;

    abstract addToCabinet(adminID: number, invitedID: number): Promise<any>;

    abstract getAdminCabinetUsers(adminID: any): Promise<IUser[]>;

}
