
import { IUser } from "../../../../../models/user";
import { GetCabinetUsersQuery } from "../queries/get-cabinet-users.query";
import { ICabinetsRepository } from "../../repositories/cabinet.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ICabinet } from "../../../../../models/cabinet";
import { ICabinetMySql } from "../models/cabinet-my-sql";
import { MySqlCabinetConverter } from "../../../converters/my-sql/my-sql-cabinet.converter";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { JoinQuery, Join } from "../../../../../behavior/queries/my-sql/join-query.notation";

@Repository('CABINET')
export class MySqlCabinetsRepository implements ICabinetsRepository {


    @Convert({ id: 'CabinetID', adminId: 'CabinetAdminProfileID', name: 'CabinetName' })
    @GetByQuery({ 'CabinetAdminProfileID': 0 })
    getCabinetByAdminID(adminID: number): Promise<any> {
        return null;
    }

    @CreateQuery({ return: false, primary: 'CabinetID' },
        { id: 'CabinetID', adminId: 'CabinetAdminProfileID', name: 'CabinetName' })
    createCabinet(cabinet: ICabinet): Promise<any> { return <any>cabinet; }

    addToCabinet(adminID: number, invitedID: number): Promise<any> {
        return null;
    }

    getAdminCabinetUsers(adminID: string): Promise<IUser[]> {
        return null;
    }


    @Convert({ id: 'CabinetID', adminId: 'CabinetAdminProfileID', name: 'CabinetName' }, true)
    @JoinQuery({ 'CabinetID': 0 }, [
        new Join('HR_Profiles', 'CabinetID', ['HRProfileStatus']),
        new Join('Users', 'UserID', ['UserLastName', 'UserFirstName'], 'HR_Profiles'),
    ])
    getAdminCabinetHRMembers(cabinetId: any): Promise<IUser[]> { return null; }

}

