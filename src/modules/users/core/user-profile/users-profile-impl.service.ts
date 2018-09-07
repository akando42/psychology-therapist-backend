import { IUserProfileService } from "./user-profile.service.interface";
import { AbstractUsersRepository } from "../../dao/users.repository";
import { IUser } from "../../../../models/user";
import { propertiesMatcherUtil } from "../../../../utils/properties-matcher.util";

export class UsersProfileServiceImpl implements IUserProfileService {

    constructor(private _usersRepository: AbstractUsersRepository) { }

    createUserProfile(newUser: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    updateUserProfile(id: any, model: IUser): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {

            let modelStored: IUser = await this.getUserById(id);
            //keep always id
            model.id = modelStored.id;
            //make comparatin and modify original.
            modelStored = <IUser>propertiesMatcherUtil(modelStored, model);

            this._usersRepository.updateUser(modelStored.id, modelStored)

            return resolve(modelStored);
        })

    }

    getUserByEmail(email: string): Promise<IUser> {
        return this._usersRepository.getByEmail(email);
    }

    getUserById(id: any): Promise<IUser> {
        return this._usersRepository.getById(id);
    }
}


