
import { IUser } from "../../../../../models/user";
import { GetCabinetUsersQuery } from "../queries/get-cabinet-users.query";
import { AbstractCabinetsRepository } from "../../repositories/cabinet.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ICabinet } from "../../../../../models/cabinet";
import { ICabinetMySql } from "../models/cabinet-my-sql";
import { MySqlCabinetConverter } from "../../../converters/my-sql/my-sql-cabinet.converter";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";

@Repository('CABINET')
export class MySqlCabinetsRepository implements AbstractCabinetsRepository {
    constructor() {

    }
    @Convert({ id: 'CabinetID', adminId: 'CabinetAdminProfileID', name: 'CabinetName' })
    @GetByQuery({ 'CabinetAdminProfileID': 0 })
    getCabinetByAdminID(adminID: number): Promise<any> {
        // return super.getBy(new GetByQuery(<ICabinetMySql>{ CabinetAdminProfileID: adminID })
        //     .toDBQuery('CABINET'));
        return null;
    }

    @CreateQuery({ return: false, primary: 'CabinetID' },
    { id: 'CabinetID', adminId: 'CabinetAdminProfileID', name: 'CabinetName' })
    createCabinet(cabinet: ICabinet): Promise<any> { return <any>cabinet; }

    addToCabinet(adminID: number, invitedID: number): Promise<any> {
        return null;
        // return this.create({ AdminID: adminID, invitedID: invitedID });
    }
    getAdminCabinetUsers(adminID: string): Promise<IUser[]> {
        // return this.getAllBy(new GetCabinetUsersQuery(adminID).toDBQuery());
        return null;
    }

}

