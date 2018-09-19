import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IAdminProfile } from "../../../../models/admin-profile";
import { IAdminProfileMySql } from "../../dao/my-sql/models/admin-profile-my-sql";

export class MySqlAdminProfilesConverter implements IDualConverter<IAdminProfile, IAdminProfileMySql> {

    converDomainToDBModel(raw: IAdminProfile): IAdminProfileMySql {
        if (!raw) { return null }
        return {
            AdminProfileID: raw.id,
            AdminProfileUserID: raw.userId,
            AdminProfileStatus: raw.status

        }

    }
    convertDBModelToDomain(raw: IAdminProfileMySql): IAdminProfile {
        if (!raw) { return null }
        return {
            id: raw.AdminProfileID,
            status: raw.AdminProfileStatus,
            userId: raw.AdminProfileUserID
        }
    }
    converManyDomainToDBModel(raw: IAdminProfile[]): IAdminProfileMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IAdminProfileMySql[]): IAdminProfile[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}
