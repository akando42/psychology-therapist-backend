import { IHRProfileService } from "./i-hr-profile.service";
import { IHRProfile } from "../../../../models/hr-profile";


export class HRProfilesComponent {
    constructor(private _hrProfilesService: IHRProfileService) { }


    createProfile(profile: IHRProfile): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const profileCreated = await this._hrProfilesService.createHRProfile(profile);
                return resolve(profileCreated);
            } catch (error) {
                return reject(error);
            }
        });
    }

    getProfile(userId: number): Promise<IHRProfile> {
        return new Promise<IHRProfile>(async (resolve, reject) => {
            try {
                const profile = await this._hrProfilesService.getHRProfile(userId);
                return resolve(profile);
            } catch (error) {
                return reject(error);

            }
        })
    }
}