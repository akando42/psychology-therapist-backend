import { IAdminProfilesRepository } from "../../repositories/admin-profile.repository";
import { IAdminProfile } from "../../../../../models/admin-profile";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";
import { JoinQuery, Join } from "../../../../../core/queries/my-sql/join-query.notation";
import { Convert } from "../../../../../core/converters/converter.notation";

const propsMatch = {
    id: 'AdminProfileID',
    userId: 'UserID',
    status: 'AdminProfileStatus'

}

const propsMatch2 = {
    id: 'AdminProfileID',
    userId: 'UserID',
    status: 'AdminProfileStatus',
    lastName: 'UserLastName',
    firstName: 'UserFirstName',

}
@ByNameRepository('ADMIN_PROFILES', {
    resourceName: 'AdminProfile',
    primaryKey: 'AdminProfileID',
    converterProps: propsMatch
})
export class MySqlAdminProfilesRepository implements IAdminProfilesRepository {
    @Convert(propsMatch2, true)
    @JoinQuery({}, [
        new Join('Users', 'UserID', ['UserLastName', 'UserFirstName']),
    ],'ADMIN_PROFILES')
    c_getAllAdminProfile(): Promise<any[]> { return null; }

    getAdminProfileByUserId(userID: number): Promise<IAdminProfile> {
        return null;
    }
    createAdminProfile(AdminProfile: IAdminProfile): Promise<IAdminProfile> {
        return null;
    }
    deleteAdminProfile(id: number): Promise<void> {
        return null;
    }
    updateAdminProfile(adminId: number, changes: IAdminProfile): Promise<IAdminProfile> {
        return null;
    }


}