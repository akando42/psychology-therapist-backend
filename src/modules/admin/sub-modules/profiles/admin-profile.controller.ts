import { WriteReadController } from "@core/behaviors/controllers/write-read.controller";
import { IAdminProfile } from "@core/models/admin-profile";
import { AdminProfileServiceInstance } from "@core/modules/admin/sub-modules/profiles/admin-profile.service";




export class AdminProfileController extends WriteReadController<IAdminProfile>{
    constructor() {
        super(AdminProfileServiceInstance);
    }
}

export const AdminProfileControllerInstance: AdminProfileController = new AdminProfileController();