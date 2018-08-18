import { IUser } from "../../../models/user";
import { UsersControllerInstance } from "../../users/users.controller";


export class UsersService {

    static getById(userId: string): Promise<IUser> {
        return UsersControllerInstance.getById(userId);
    }

    static create(user: IUser): Promise<any> {
        return UsersControllerInstance.create(user);
    }
}