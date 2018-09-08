
import { IUser } from "../../../../../models/user";
import { GetCabinetUsersQuery } from "../queries/get-cabinet-users.query";
import { AbstractCabinetsRepository } from "../../repositories/cabinet.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";


export class MySqlCabinetsRepository extends AbstractCabinetsRepository {
    constructor() {
        super(new GenericDao());
    }

    addToCabinet(adminID: number, invitedID: number): Promise<any> {
        return this.create({ AdminID: adminID, invitedID: invitedID });
    }
    getAdminCabinetUsers(adminID: string): Promise<IUser[]> {
        return this.getAllBy(new GetCabinetUsersQuery(adminID).toDBQuery());
    }

}

