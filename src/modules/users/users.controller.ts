import { UsersServiceInstance } from "./users.service";
import { IUser } from "../../models/user";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";




export class UsersController extends WriteReadController<IUser>{
    constructor() {
        super(UsersServiceInstance);
    }

    getByEmail(email: string): Promise<IUser> {

        return UsersServiceInstance.getByEmail(email);
    }

}

export const UsersControllerInstance: UsersController = new UsersController();