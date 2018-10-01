import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IHRProfile } from "../../../models/hr-profile";

export interface AbstractHRProfilesRepository {


    createHRProfile(HRProfile: IHRProfile): Promise<IHRProfile>;

    deleteHRProfile(id: number): Promise<void>;

    getHRProfile(userID: number): Promise<IHRProfile>;

}