
import { UsersProfileServiceInstance } from "./Users-profile.service";
import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { IUserProfile } from "../../../../models/user-profile";




export class UsersProfileController extends WriteReadController<IUserProfile>{
    constructor() {
        super(UsersProfileServiceInstance);
    }

    getById(id: string): Promise<IUserProfile> {
        
        return UsersProfileServiceInstance.getById(id);
    }
}

export const UsersProfileControllerInstance: UsersProfileController = new UsersProfileController();