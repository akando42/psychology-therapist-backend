import { IAdminProfileService } from "./i-admin-profile.service";
import { IAdminProfile } from "../../../../models/admin-profile";


export class AdminProfilesComponent {
    constructor(private _adminProfilesService: IAdminProfileService) { }


    createProfile(profile: IAdminProfile): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const profileCreated = await this._adminProfilesService.createAdminProfile(profile);
                return resolve(profileCreated);
            } catch (error) {
                return reject(error);
            }
        });
    }

    getProfile(userId: number): Promise<IAdminProfile> {
        return new Promise<IAdminProfile>(async (resolve, reject) => {
            try {
                const profile = await this._adminProfilesService.getAdminProfile(userId);
                return resolve(profile);
            } catch (error) {
                return reject(error);

            }
        })
    }
}