import { ISalesProfileService } from "./i-sales-profile.service";
import { ISalesProfile } from "../../../../models/sales-profile";
import { AbstractSalesProfilesRepository } from "../../dao/sales-profile.repository";



export class SalesProfilesImplService implements ISalesProfileService {

    constructor(private _salesProfileRepo: AbstractSalesProfilesRepository) {

    }

    createSalesProfile(profile: ISalesProfile): Promise<ISalesProfile> {
        return new Promise<ISalesProfile>(async (resolve, reject) => {
            try {
                //validate here
                const profileCreated: any = await this._salesProfileRepo.createSalesProfile(profile);
                return resolve(profileCreated);
            } catch (error) {
                return reject(error);
            }
        })
    }
    
    updateSalesProfile(id: number, changes: ISalesProfile): Promise<ISalesProfile> {
        return new Promise<ISalesProfile>(async (resolve, reject) => {
            try {
                //validate here
                const profile: any = await this._salesProfileRepo.update(id, changes);
                return resolve(profile);
            } catch (error) {
                return reject(error);
            }
        });
    }



}