import { IAdminProfilesRepository } from "../../repositories/admin-profile.repository";
import { IAdminProfile } from "../../../../../models/admin-profile";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {
    id: 'AdminProfileID',
    userId: 'UserID',
    status: 'AdminProfileStatus'

}
@ByNameRepository('ADMIN_PROFILEs', {
    resourceName: 'AdminProfile',
    primaryKey: 'AdminProfileID',
    converterProps: propsMatch
})
export class MySqlAdminProfilesRepository implements IAdminProfilesRepository {
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