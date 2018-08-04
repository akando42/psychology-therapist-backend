
import { AdminProfileServiceInstance } from "./admin-profile.service";
import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { IUserProfile } from "../../../../models/user-profile";




export class AdminProfileController extends WriteReadController<IUserProfile>{
    constructor() {
        super(AdminProfileServiceInstance);
    }

    getById(id: string): Promise<IUserProfile> {
        
        return AdminProfileServiceInstance.getById(id);
    }
}

export const AdminProfileControllerInstance: AdminProfileController = new AdminProfileController();