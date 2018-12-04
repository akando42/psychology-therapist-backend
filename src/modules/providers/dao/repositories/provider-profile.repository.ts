import { IProviderProfile } from "../../../../models/provider-profile";

export interface IProvidersProfileRepository {

    createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile>;

    getProviderProfileByUserId(userId: any): Promise<IProviderProfile>;
    
    deleteProviderProfile(id: any): Promise<IProviderProfile>;

}