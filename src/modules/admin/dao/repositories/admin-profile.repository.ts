import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAdminProfile } from "../../../../models/admin-profile";

export abstract class AbstractAdminProfilesRepository extends AbstractRepository<IAdminProfile>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createAdminProfile(AdminProfile: IAdminProfile): Promise<IAdminProfile>;

    abstract deleteAdminProfile(id: number): Promise<void>;

    abstract getAdminProfile(userID: number): Promise<IAdminProfile>;

}