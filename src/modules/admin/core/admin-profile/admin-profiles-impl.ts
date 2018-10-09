import { IAdminProfileService } from "./i-admin-profile.service";
import { IAdminProfile } from "../../../../models/Admin-profile";
import { IAdminProfilesRepository } from "../../dao/repositories/admin-profile.repository";
import { isNullOrUndefined } from "util";



export class AdminProfilesImplService implements IAdminProfileService {

    constructor(private _AdminProfilesRepo: IAdminProfilesRepository) {

    }

    getAdminProfile(userId: number): Promise<IAdminProfile> {
        return new Promise<IAdminProfile>(async (resolve, reject) => {
            try {
                //validate here
                const profile: any = await this._AdminProfilesRepo.getAdminProfileByUserId(userId);
                if(isNullOrUndefined(profile)){
                    return reject({message:'no admin profile found for user'})
                }
                return resolve(profile);
            } catch (error) {
                return reject(error);
            }
        });
    }

    createAdminProfile(profile: IAdminProfile): Promise<IAdminProfile> {
        return new Promise<IAdminProfile>(async (resolve, reject) => {
            try {
                //validate here
                const profileCreated: any = await this._AdminProfilesRepo.createAdminProfile(profile);
                return resolve(profileCreated);
            } catch (error) {
                return reject(error);
            }
        })
    }

    updateAdminProfile(id: number, changes: IAdminProfile): Promise<IAdminProfile> {
        return new Promise<IAdminProfile>(async (resolve, reject) => {
            try {
                //validate here
                // const profile: any = await this._AdminProfilesRepo.(id, changes);
                // return resolve(profile);
            } catch (error) {
                return reject(error);
            }
        });
    }



}