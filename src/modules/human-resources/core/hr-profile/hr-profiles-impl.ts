import { IHRProfileService } from "./i-hr-profile.service";
import { IHRProfile } from "../../../../models/hr-profile";
import { AbstractHRProfilesRepository } from "../../dao/hr-profile.repository";
import { HRProfileStatusEnum } from "../../../../enums/hr-profile-status";



export class HRProfilesImplService implements IHRProfileService {

    constructor(private _hrProfilesRepo: AbstractHRProfilesRepository) {

    }

    getHRProfile(userId: number): Promise<IHRProfile> {
        return new Promise<IHRProfile>(async (resolve, reject) => {
            try {
                //validate here
                const profile: any = await this._hrProfilesRepo.getHRProfile(userId);
                return resolve(profile);
            } catch (error) {
                return reject(error);
            }
        });
    }

    createHRProfile(profile: IHRProfile): Promise<IHRProfile> {
        return new Promise<IHRProfile>(async (resolve, reject) => {
            try {
                //validate here
                profile.status = HRProfileStatusEnum.DOCUMENT_PENDING;
                
                const profileCreated: any = await this._hrProfilesRepo.createHRProfile(profile);
                
                return resolve(profileCreated);
            } catch (error) {
                return reject(error);
            }
        })
    }

    updateHRProfile(id: number, changes: IHRProfile): Promise<IHRProfile> {
        return new Promise<IHRProfile>(async (resolve, reject) => {
            try {
                // //validate here
                // const profile: any = await this._hrProfilesRepo.update(id, changes);
                // return resolve(profile);
            } catch (error) {
                return reject(error);
            }
        });
    }



}