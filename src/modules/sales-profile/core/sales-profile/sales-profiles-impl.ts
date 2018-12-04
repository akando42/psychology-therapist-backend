import { ISalesProfileService } from "./i-sales-profile.service";
import { ISalesProfile } from "../../../../models/sales-profile";
import { ISalesProfileRepository } from "../../dao/sales-profile.repository";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";



export class SalesProfilesImplService implements ISalesProfileService {

    constructor(private _salesProfileRepo: ISalesProfileRepository) {

    }

    @ComposeValidation([
        {
            index: 0, validators: [
                { name: 'userId', cb: Required }
            ]
        }
    ])
    async createSalesProfile(profile: ISalesProfile): Promise<ISalesProfile> {
        const profileCreated: any = await this._salesProfileRepo.createSalesProfile(profile);
        return profileCreated;

    }

    async updateSalesProfile(id: number, changes: ISalesProfile): Promise<ISalesProfile> {
        return null;
    }



}