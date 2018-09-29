import { AbstractAdminProfilesRepository } from "../../repositories/admin-profile.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { IAdminProfile } from "../../../../../models/admin-profile";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { MySqlAdminProfilesConverter } from "../../../converters/my-sql/my-sql-admin-profile.converter";
import { IAdminProfileMySql } from "../models/admin-profile-my-sql";

export class MySqlAdminProfilesRepository extends AbstractAdminProfilesRepository {
    constructor() {
        super(new GenericDao('ADMIN_PROFILES'), new MySqlAdminProfilesConverter());
    }
    createAdminProfile(AdminProfile: IAdminProfile): Promise<IAdminProfile> {
        return super.create(AdminProfile)
    }
    deleteAdminProfile(id: number): Promise<any> {
        return super.delete(id);
    }

    getAdminProfile(userId: number): Promise<IAdminProfile> {
        return super.getBy(new GetByQuery(<IAdminProfileMySql>{ UserID: userId })
            .toDBQuery('ADMIN_PROFILES'))
    }

}