import { IProvidersProfileService } from "./I-providers-profile.service";
import { IProviderProfile } from "../../../../models/provider-profile";
import { ProviderProfileStatusEnum } from "../../../../enums/provider-profile-status.enum";


export class ProvierProfileImplService implements IProvidersProfileService {
    createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile> {
        return null;
    }
    changeProviderStatus(profileId: number, status: ProviderProfileStatusEnum): Promise<IProviderProfile> {
        return null;
    }


}