import { IProviderExperience } from "../../../models/provider-experience";

export interface IProviderExperienceService {

    addProviderExperience(experience: IProviderExperience): Promise<IProviderExperience>;

    removeProviderExperience(experienceId: number): Promise<IProviderExperience>;

}