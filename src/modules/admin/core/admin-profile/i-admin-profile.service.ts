import { IAdminProfile } from "../../../../models/admin-profile";


export interface IAdminProfileService {


    createAdminProfile(profile: IAdminProfile): Promise<IAdminProfile>;

    updateAdminProfile(id: number, changes: IAdminProfile): Promise<IAdminProfile>;

    getAdminProfile(userId: number): Promise<IAdminProfile>;

}