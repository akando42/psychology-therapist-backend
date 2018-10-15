import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { IAdminProfile } from "../../../../models/admin-profile";

export interface IAdminProfilesRepository {

    createAdminProfile(AdminProfile: IAdminProfile): Promise<IAdminProfile>;

    deleteAdminProfile(id: number): Promise<void>;

    getAdminProfileByUserId(userID: number): Promise<IAdminProfile>;

    updateAdminProfile(adminId: number, changes: IAdminProfile): Promise<IAdminProfile>;

    c_getAllAdminProfile(): Promise<any[]>
}