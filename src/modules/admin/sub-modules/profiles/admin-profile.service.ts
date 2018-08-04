import { AdminProfileRepoInstance } from "../../dao/repositories/admin-profile.repository";
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { IUserProfile } from "../../../../models/user-profile";


export class AdminProfileService extends WriterReaderService<IUserProfile> {
    constructor() {
        super(AdminProfileRepoInstance);
    }


    getById(id: string): Promise<IUserProfile> {
        return AdminProfileRepoInstance.getById(id);
    }
}

export const AdminProfileServiceInstance: AdminProfileService = new AdminProfileService();