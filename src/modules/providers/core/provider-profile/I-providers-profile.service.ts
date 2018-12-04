import { IProviderProfile } from "../../../../models/provider-profile";
import { ProviderProfileStatusEnum } from "../../../../enums/provider-profile-status.enum";
import { IUserProfile } from "../../../../models/user-profile";

export interface IProvidersProfileService {

    getProviderProfileByUserId(userId:any):Promise<IProviderProfile>;

    createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile>;

    changeProviderStatus(profileId: number, status: ProviderProfileStatusEnum): Promise<IProviderProfile>;

}