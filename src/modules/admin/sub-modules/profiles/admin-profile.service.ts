import { IAdminProfile } from "@core/models/admin-profile";
import { WriterReaderService } from "@core/behaviors/services/writer-reader-service";
import { AdminProfileRepoInstance } from "@core/modules/admin/dao/repositories/admin-profile.repository";


export class AdminProfileService extends WriterReaderService<IAdminProfile> {
    constructor() {
        super(AdminProfileRepoInstance);
    }
}

export const AdminProfileServiceInstance: AdminProfileService = new AdminProfileService();