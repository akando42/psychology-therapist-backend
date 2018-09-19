import { GenericDao } from "../../../../../behavior/mysql/generic.dao";

import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { AbstractSalesProfilesRepository } from "../../sales-profile.repository";
import { ISalesProfile } from "../../../../../models/sales-profile";
import { MySqlSalesProfilesConverter } from "../../../converters/my-sql/my-sql-sales-profiles.converter";
import { ISalesProfileMySql } from "../models/my-sql-sales-profile";

export class MySqlSalesProfilesRepository extends AbstractSalesProfilesRepository {
    constructor() {
        super(new GenericDao('SalesProfiles'), new MySqlSalesProfilesConverter());
    }
    createSalesProfile(HRProfile: ISalesProfile): Promise<ISalesProfile> {
        return super.create(HRProfile)
    }
    deleteSalesProfile(id: number): Promise<any> {
        return super.delete(id);
    }

    getSalesProfile(HRProfileId: number): Promise<ISalesProfile> {
        return super.getBy(new GetByQuery(<ISalesProfileMySql>{ HRProfileID: HRProfileId })
            .toDBQuery('SalesProfiles'));
    }

}