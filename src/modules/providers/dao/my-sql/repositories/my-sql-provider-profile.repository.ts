import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";
import { IProviderProfile } from "../../../../../models/provider-profile";
import { IProvidersProfileRepository } from "../../repositories/provider-profile.repository";

const propsMatch = {
    profileID: 'ProviderProfileID',
    status: 'ProviderProfileStatus',
    userId:'UserID'
}

@ByNameRepository('PROVIDER_PROFILE', {
    converterProps: propsMatch,
    primaryKey: 'ProviderProfileID',
    resourceName: 'Provider Profile'
})
export class MySqlProviderProfileRepository implements IProvidersProfileRepository {


    createProviderProfile(profile: IProviderProfile): Promise<IProviderProfile> {
        return null;
    }

    getProviderProfileByUserId(userId: any): Promise<IProviderProfile> {
        return null;
    }
    deleteProviderProfile(id: any): Promise<IProviderProfile> {
        return null;
    }


}

