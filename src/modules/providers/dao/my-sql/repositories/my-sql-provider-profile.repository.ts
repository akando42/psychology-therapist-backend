import { IProvidersProfileRepository } from "../provider-profile.repository";
import { IProviderProfile } from "../../../../models/provider-profile";
import { ByNameRepository } from "../../../../core/repositories/by-name-repository.notation";

const propsMatch = {
    profileID: 'ProviderProfileID',
    status: 'ProviderProfileStatus'
}

@ByNameRepository('PROVIDER_PROFILE', {
    converterProps: propsMatch,
    primaryKey: 'ProvierProfileID',
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

