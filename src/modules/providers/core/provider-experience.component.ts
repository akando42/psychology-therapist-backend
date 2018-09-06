import { TODResponse } from "../../../dto/tod-response";
import { ProviderProfileStatusEnum } from "../../../enums/provider-profile-status.enum";
import { IProviderExperienceService } from "./provider-experience.service";
import { IProviderExperience } from "../../../models/provider-experience";

export abstract class AbstractProviderExperienceComponent {
    constructor(
        private _providerExperienceService: IProviderExperienceService,
    ) {
    }

    addProviderExperience(exp: IProviderExperience): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const experienceCreated: IProviderExperience = await this._providerExperienceService.addProviderExperience(exp);

                const result: TODResponse = {
                    message: "document signed",
                    payload: experienceCreated,
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

    removeProviderExperience(expId: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const profileCreated: IProviderExperience =
                    await this._providerExperienceService.removeProviderExperience(expId);

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