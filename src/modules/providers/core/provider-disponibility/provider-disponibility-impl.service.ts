import { IProviderDisponibilityService } from "./i-provider-disponibility.service";
import { IProviderDisponibility } from "../../../../models/provider-disponibility";
import { ComposeValidation, Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { IProviderDisponibilityRepository } from "../../dao/repositories/provider-disponibility.repository";
import { isNullOrUndefined } from "util";


export class ProviderDisponibilityImplService implements IProviderDisponibilityService {

    constructor(private _providerDisponibilityRepo: IProviderDisponibilityRepository) { }

    @ComposeValidation([{
        index: 0, validators: [
            { cb: Required, name: 'providerId' },
            { cb: Required, name: 'day' },
            { cb: Required, name: 'from' },
            { cb: Required, name: 'to' },
        ]
    }])
    async setProviderDisponibility(data: IProviderDisponibility): Promise<any> {

        const exist = await this._providerDisponibilityRepo.getProviderDisponibilityByProviderProfileIdAndDay(data.providerId, data.day);
        //remove disponibility 
        if (!isNullOrUndefined(exist)) {
            exist.enable = false;
            await this._providerDisponibilityRepo.updateProviderDisponibility(exist.id, exist);
        }


        const config = await this._providerDisponibilityRepo.createProviderDisponibility(data);
        return config;
    }

    @Validate([{ name: 'profileId', cb: Required, parameterIndex: 0 }])
    async getProviderDisponibility(profileId: any): Promise<any> {
        const days = await this._providerDisponibilityRepo.getProviderDisponibilityByProviderProfileIdAndEnable(profileId, true);
        return days;
    }

    updateProviderDisponibility(disponibilityConfig: IProviderDisponibility): Promise<any> {
        throw new Error("Method not implemented.");
    }

    disableProviderDisponibility(con: any): Promise<any> {
        throw new Error("Method not implemented.");
    }


}