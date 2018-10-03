import { IUserProfileService } from "./user-profile.service.interface";
import { IUsersRepository } from "../../dao/users.repository";
import { IUser } from "../../../../models/user";
import { propertiesMatcherUtil } from "../../../../utils/properties-matcher.util";
import { IUserIDVerification } from "../../../../models/user-id-verification";
import { IUsersIDVerificationsRepository } from "../../dao/users-id-verifications.repository";
import { isNullOrUndefined } from "util";

export class UsersProfileServiceImpl implements IUserProfileService {


    constructor(
        private _usersRepository: IUsersRepository,
        private _idVerificationRepo: IUsersIDVerificationsRepository) { }

    async createUserProfile(newUser: IUser): Promise<IUser> {
        newUser.idVerified = false;
        const userCreated: IUser = await this._usersRepository.createUserProfile(newUser);
        return userCreated;

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
                console.log('attempting to create verify', verifi)
                //verification here but need to roollback to the file upload.
                const created = await this._idVerificationRepo.createIDVerification(verifi);
                return resolve(created);
            } catch (error) {
                return reject(error);
            }
        })
    }

    pushSecondPicVerificationReport(picId: number, userid: number): Promise<IUserIDVerification> {
        return new Promise<IUserIDVerification>(async (resolve, reject) => {
            try {

                if (isNullOrUndefined(picId)) { return reject({ message: 'no picture reference provided!' }); }
                const stored: IUserIDVerification = await this._idVerificationRepo.getReportByUserId(userid);


                if (isNullOrUndefined(stored)) { return reject({ message: 'no report found for that user' }); }
                stored.secondPicRef = picId;
                const updated: IUserIDVerification = await this._idVerificationRepo.updateIDVerification(stored.id, stored);

                return resolve(stored);
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


