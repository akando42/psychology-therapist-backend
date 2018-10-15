import { IProvidersProfileService } from "./I-providers-profile.service";
import { IProviderProfile } from "../../../../models/provider-profile";
import { ProviderProfileStatusEnum } from "../../../../enums/provider-profile-status.enum";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";


export class ProvierProfileImplService implements IProvidersProfileService {

    

    @ComposeValidation([{ index: 0, validators: [{ cb: Required, name: 'userId' }] }])
    createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile> {
        return null;
    }
    changeProviderStatus(profileId: number, status: ProviderProfileStatusEnum): Promise<IProviderProfile> {
        return null;
    }


}