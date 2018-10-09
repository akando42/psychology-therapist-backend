
import { IUser } from "../../../../../models/user";
import { ICabinetsRepository } from "../../repositories/cabinet.repository";
import { ICabinet } from "../../../../../models/cabinet";
import { Repository } from "../../../../../core/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../core/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../core/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../core/converters/converter.notation";
import { JoinQuery, Join } from "../../../../../core/queries/my-sql/join-query.notation";

@Repository('CABINET')
export class MySqlCabinetsRepository implements ICabinetsRepository {



    @Convert({ id: 'CabinetID', adminId: 'AdminProfileID', name: 'CabinetName' })
    @GetByQuery({ 'AdminProfileID': 0 })
    getCabinetByAdminID(adminID: number): Promise<any> {
        return null;
    }

    @CreateQuery({ return: true, primary: 'CabinetID' },
        { id: 'CabinetID', adminId: 'AdminProfileID', name: 'CabinetName' })
    createCabinet(cabinet: ICabinet): Promise<any> { return null; }

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

    @Convert({ id: 'CabinetID', adminId: 'CabinetAdminProfileID', name: 'CabinetName' }, true)
    @JoinQuery({ 'CabinetID': 0 }, [
        new Join('Sales_Profiles', 'CabinetID', ['Sales_Profiles']),
        new Join('Users', 'UserID', ['UserLastName', 'UserFirstName'], 'Sales_Profiles'),
    ])
    getAdminCabinetSalesMembers(cabinetId: any): Promise<IUser[]> { return null; }

}

