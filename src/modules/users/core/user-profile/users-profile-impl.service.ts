import { IUserProfileService } from "./user-profile.service.interface";
import { AbstractUsersRepository } from "../../dao/users.repository";
import { IUser } from "../../../../models/user";
import { propertiesMatcherUtil } from "../../../../utils/properties-matcher.util";
import { IUserIDVerification } from "../../../../models/user-id-verification";
import { AbstractUsersIDVerificationsRepository } from "../../dao/users-id-verifications.repository";

export class UsersProfileServiceImpl implements IUserProfileService {


    constructor(
        private _usersRepository: AbstractUsersRepository,
        private _idVerificationRepo: AbstractUsersIDVerificationsRepository) { }

    createUserProfile(newUser: IUser): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                // validations go here
                const userCreated: IUser = await this._usersRepository.createUserProfile(newUser);
                return resolve(userCreated);
            } catch (error) {
                return reject(error);
            }
        })
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
        });

    }

    verifiedUserIdentity(id: number): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                // get user
                const user: IUser = await this._usersRepository.getById(id);

                user.idVerified = true;
                const updated: IUser = await this.updateUserProfile(id, user);
                return resolve(updated);

            } catch (error) {
                return reject(error);
            }
        });
    }

    createVerificationReport(verifi: IUserIDVerification): Promise<IUserIDVerification> {
        return new Promise<IUserIDVerification>(async (resolve, reject) => {
            try {
                const created = await this._idVerificationRepo.createIDVerification(verifi);
                return resolve(created);
            } catch (error) {
                return reject(error);
            }
        })
    }

    getUserByEmail(email: string): Promise<IUser> {
        //validate email
        return this._usersRepository.getByEmail(email);
    }

    getUserById(id: any): Promise<IUser> {
        //validate id email
        return this._usersRepository.getById(id);
    }
}


