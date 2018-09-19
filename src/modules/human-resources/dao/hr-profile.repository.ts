import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IHRProfile } from "../../../models/hr-profile";

export abstract class AbstractHRProfilesRepository extends AbstractRepository<IHRProfile>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createHRProfile(HRProfile: IHRProfile): Promise<IHRProfile>;

    abstract deleteHRProfile(id: number): Promise<void>;

    abstract getHRProfile(userID: number): Promise<IHRProfile>;

}