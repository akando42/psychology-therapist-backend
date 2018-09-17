import { IUser } from "../../../../models/user";
import { IUserProfileService } from "./user-profile.service.interface";
import { RolesService } from "../roles/roles-impl.service";
import { IRolesService } from "../roles/roles.service.interface";
import { IUsersDocumentService } from "../documents/i-users-document.service";
import { IEDocument } from "../../../../models/e-document";
import { IDocumentUploadDTO } from "../../../../dto/document-upload.dto";
import { IRawDocument } from "../../../../models/raw-document";
import { IUserIDVerification } from "../../../../models/user-id-verification";


export class UsersProfileComponent {

    constructor(
        private _userService: IUserProfileService,
        private _rolesService?: IRolesService
    ) {

    }

    createUserProfile(user: IUser): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const userCreated: IUser = await this._userService.createUserProfile(user);

                const userStored: IUser = await this._userService.getUserById(<any>userCreated);
                console.log('user stored ', userStored);
                return resolve(userStored);

            } catch (error) {
                return reject(error);
            }
        });
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
        return this._userService.createVerificationReport(verifi);
    }

}