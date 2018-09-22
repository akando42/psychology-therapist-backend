
import { IUser } from "../../../../../models/user";
import { GetCabinetUsersQuery } from "../queries/get-cabinet-users.query";
import { AbstractCabinetsRepository } from "../../repositories/cabinet.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ICabinet } from "../../../../../models/cabinet";


export class MySqlCabinetsRepository extends AbstractCabinetsRepository {
    constructor() {
        super(new GenericDao());
    }

    createCabinet(cabinet: ICabinet): Promise<any> {
        return super.create(cabinet);
    }

    addToCabinet(adminID: number, invitedID: number): Promise<any> {
        return this.create({ AdminID: adminID, invitedID: invitedID });
    }
    getAdminCabinetUsers(adminID: string): Promise<IUser[]> {
        return this.getAllBy(new GetCabinetUsersQuery(adminID).toDBQuery());
    }

}

