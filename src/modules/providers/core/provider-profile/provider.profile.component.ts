import { IProvidersProfileService } from "./I-providers-profile.service";
import { IProviderDisponibilityService } from "../provider-disponibility/i-provider-disponibility.service";
import { IProviderProfile } from "../../../../models/provider-profile";
import { IProviderDisponibility } from "../../../../models/provider-disponibility";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";


export class ProviderProfileComponent {
    constructor(
        private _providerProfileService: IProvidersProfileService,
        private _providerDisponibilityService: IProviderDisponibilityService
    ) { }

    async createProviderProfile(providerProfile: IProviderProfile): Promise<IProviderProfile> {
        const profileCreated = await this._providerProfileService.createProviderProfile(providerProfile);
        return profileCreated;
    }

    async setDisponibility(disponibility: IProviderDisponibility): Promise<IProviderDisponibility> {
        const disponibilityCreted = await this._providerDisponibilityService.setProviderDisponibility(disponibility);
        return disponibility;
    }

}