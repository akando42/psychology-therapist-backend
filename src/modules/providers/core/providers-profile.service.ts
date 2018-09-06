import { IProviderProfile } from "../../../models/provider-profile";
import { ProviderProfileStatusEnum } from "../../../enums/provider-profile-status.enum";

export interface IProvidersProfileService {

    createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile>;

    changeProviderStatus(profileId: number, status: ProviderProfileStatusEnum): Promise<IProviderProfile>;

}