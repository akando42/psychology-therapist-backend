
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { IUser } from "../../../../models/user";
import { GetCabinetUsersQuery } from "../my-sql/queries/get-cabinet-users.query";


export class CabinetsRepository extends AbstractRepository<any>{
    constructor() {
        super(new GenericDao());
    }

    getAdminCabinetUsers(adminID: string): Promise<IUser[]> {
        return this.getAllBy(new GetCabinetUsersQuery(adminID).toDBQuery());
    }

}

export const CabinetsRepoInstance: CabinetsRepository = new CabinetsRepository();
