import { GenericDao } from "../../../../../core/mysql/generic.dao";

import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { ISalesProfileRepository } from "../../sales-profile.repository";
import { ISalesProfile } from "../../../../../models/sales-profile";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {
    userId: 'UserID',
    id: 'SalesProfileID'
}

@ByNameRepository('Sales_Profile', {
    converterProps: propsMatch,
    resourceName: 'Sales Profiles',
    primaryKey: 'SalesProfileID'
})
export class MySqlSalesProfilesRepository implements ISalesProfileRepository {

    createSalesProfile(HRProfile: ISalesProfile): Promise<ISalesProfile> { return null; }

    deleteSalesProfile(id: number): Promise<any> { return null; }

    getSalesProfileByUserId(HRProfileId: number): Promise<ISalesProfile> { return null; }

}