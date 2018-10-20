import { IProvidersProfileService } from "./I-providers-profile.service";
import { IProviderProfile } from "../../../../models/provider-profile";
import { ProviderProfileStatusEnum } from "../../../../enums/provider-profile-status.enum";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { IProvidersProfileRepository } from "../../dao/repositories/provider-profile.repository";
import { isNullOrUndefined } from "util";


export class ProvidersProfileImplService implements IProvidersProfileService {

    constructor(
        private _providerProfileRepository: IProvidersProfileRepository
    ) { }

    @ComposeValidation([{ index: 0, validators: [{ cb: Required, name: 'userId' }] }])
    async createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile> {
        //check if user already have a provider profile.
        const userAlreadyProfile = await this._providerProfileRepository.getProviderProfileByUserId(profile.userId);
        //throw error if alreaedy have a provider profile.
        //probably on future use this to enable a disabled profile
        if (!isNullOrUndefined(userAlreadyProfile)) {
            throw { message: `User ${profile.userId} already have created a Provider Profile` };
        }

        //create the profile setting its status to 
        //under review by default.
        profile.status = ProviderProfileStatusEnum.UNDER_REVIEW;
        const profileCreated = await this._providerProfileRepository.createProviderProfile(profile);

        return profileCreated;
    }


    changeProviderStatus(profileId: number, status: ProviderProfileStatusEnum): Promise<IProviderProfile> {
        return null;
    }


}