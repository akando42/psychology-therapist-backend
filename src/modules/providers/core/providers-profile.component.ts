import { IProviderProfile } from "../../../models/provider-profile";
import { TODResponse } from "../../../dto/tod-response";
import { IProvidersProfileService } from "./providers-profile.service";
import { ProviderProfileStatusEnum } from "../../../enums/provider-profile-status.enum";

export abstract class AbstractProvidersProfileComponent {
    constructor(
        private _providerProfilesService: IProvidersProfileService,
    ) {
    }

    createProviderProfile(profile: IProviderProfile): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const profileCreated: IProviderProfile = await this._providerProfilesService.createProviderProfile(profile)

                const result: TODResponse = {
                    message: "document signed",
                    payload: profileCreated,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        });
    }

    changeProfileStatus(profileId: number, status: ProviderProfileStatusEnum): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const profileCreated: IProviderProfile =
                    await this._providerProfilesService.changeProviderStatus(profileId, status);

                const result: TODResponse = {
                    message: "document signed",
                    payload: profileCreated,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        });
    }


}