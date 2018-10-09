import { AbstractRepository } from "../../../core/repositories/repository.abstract";
import { ISalesProfile } from "../../../models/sales-profile";

export abstract class AbstractSalesProfilesRepository extends AbstractRepository<ISalesProfile>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createSalesProfile(HRProfile: ISalesProfile): Promise<ISalesProfile>;

    abstract deleteSalesProfile(id: number): Promise<void>;

    abstract getSalesProfile(userID: number): Promise<ISalesProfile>;

}