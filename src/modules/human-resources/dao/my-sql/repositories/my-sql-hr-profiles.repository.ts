import { AbstractHRProfilesRepository } from "../../hr-profile.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { IHRProfile } from "../../../../../models/hr-profile";
import { IHRProfileMySql } from "../models/my-sql-hr-profile";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { MySqlHRProfilesConverter } from "../../../converters/my-sql/my-sql-hr-profiles.converter";

export class MySqlHRProfilesRepository extends AbstractHRProfilesRepository {
    constructor() {
        super(new GenericDao('HRProfiles'), new MySqlHRProfilesConverter());
    }
    createHRProfile(HRProfile: IHRProfile): Promise<IHRProfile> {
        return super.create(HRProfile)
    }
    deleteHRProfile(id: number): Promise<any> {
        return super.delete(id);
    }

    getHRProfile(HRProfileId: number): Promise<IHRProfile> {
        return super.getBy(new GetByQuery(<IHRProfileMySql>{ HRProfileID: HRProfileId })
            .toDBQuery('HRProfileS'))
    }

}