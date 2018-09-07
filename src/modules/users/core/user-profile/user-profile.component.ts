import { IUser } from "../../../../models/user";
import { IUserProfileService } from "./user-profile.service.interface";


export class UsersProfileComponent {

    constructor(private _userService: IUserProfileService) {

    }

    createUserProfile(user: IUser): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const userCreated: IUser = await this._userService.createUserProfile(user);
                return resolve(user);

            } catch (error) {

                return reject(user);
            }
        })
    }

}