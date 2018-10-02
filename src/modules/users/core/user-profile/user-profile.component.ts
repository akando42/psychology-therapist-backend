import { IUser } from "../../../../models/user";
import { IUserProfileService } from "./user-profile.service.interface";
import { IUserIDVerification } from "../../../../models/user-id-verification";


export class UsersProfileComponent {

    constructor(
        private _userService: IUserProfileService,
    ) {

    }

    async   createUserProfile(user: IUser): Promise<IUser> {
        user.idVerified = false;
        const userCreated: IUser = await this._userService.createUserProfile(user);

        return userCreated;

    }

    updateUserProfile(id: any, model: IUser): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const edited: IUser = await this._userService.updateUserProfile(id, model);

                return resolve(edited);
            } catch (error) {
                return resolve(error);
            }
        });

    }

    getUserProfileByEmail(email: string): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const user: IUser = await this._userService.getUserByEmail(email);
                return resolve(user);
            } catch (error) {
                return reject(error);
            }
        })
    }

    verifiedUserIdentity(id: number): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {

                const userVerified: IUser = await this._userService.verifiedUserIdentity(id);
                return resolve(userVerified);

            } catch (error) {
                return reject(error)
            }
        });
    }

    getUserProfileById(id: number): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const user = await this._userService.getUserById(id);

                return resolve(user);
            } catch (error) {
                return reject(error);
            }
        })
    }

    createVerificationReport(verifi: IUserIDVerification): Promise<IUserIDVerification> {
        //here probably validate that document exist or not couse already go it from the module.
        return this._userService.createVerificationReport(verifi);
    }

    pushSecondPictureToVerificationReport(picId: number, reporId: number): Promise<IUserIDVerification> {
        return this._userService.pushSecondPicVerificationReport(picId, reporId)
    }

}