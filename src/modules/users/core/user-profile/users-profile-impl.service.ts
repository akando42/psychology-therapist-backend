import { IUserProfileService } from "./user-profile.service.interface";
import { IUsersRepository } from "../../dao/users.repository";
import { IUser } from "../../../../models/user";
import { propertiesMatcherUtil } from "../../../../utils/properties-matcher.util";
import { IUserIDVerification } from "../../../../models/user-id-verification";
import { IUsersIDVerificationsRepository } from "../../dao/users-id-verifications.repository";
import { isNullOrUndefined } from "util";
import { Validate, ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";

export class UsersProfileServiceImpl implements IUserProfileService {


    constructor(
        private _usersRepository: IUsersRepository,
        private _idVerificationRepo: IUsersIDVerificationsRepository) { }

    @ComposeValidation([{
        index: 0, validators: [
            { name: 'firstName', cb: Required },
            { name: 'lastName', cb: Required },
            { name: 'email', cb: Required },
            { name: 'gender', cb: Required }
        ]
    }])
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

    @Validate([{ parameterIndex: 0, cb: Required, name: 'userId' }])
    async verifiedUserIdentity(id: number): Promise<IUser> {
        // get user
        const user: IUser = await this._usersRepository.getUserById(id);

        if (isNullOrUndefined(user)) {
            throw { message: 'User dosent exist' };
        }

        user.idVerified = true;
        const updated: IUser = await this.updateUserProfile(id, user);
        return updated;
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
        return this._usersRepository.getUserByEmail(email);
    }

    getUserById(id: any): Promise<IUser> {
        return this._usersRepository.getUserById(id);
    }
}


