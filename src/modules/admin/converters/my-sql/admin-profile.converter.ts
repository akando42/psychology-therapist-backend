import { IAdminProfile } from "../../../../models/admin-profile";
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IAdminProfileMySql } from "../../dao/my-sql/models/my-sql/admin-my-sql.model";


export class AdminProfileConverter implements IDualConverter<IAdminProfile, IAdminProfileMySql> {
    converDomainToDBModel(raw: IAdminProfile): IAdminProfileMySql {
        if(!raw){return null}
        return {
            AdminFirstName: raw.firstName,
            AdminLastName: raw.lastName,
            AdminImageLink: raw.profileImage
        }
    }
    convertDBModelToDomain(raw: IAdminProfileMySql): IAdminProfile {
        if(!raw){return null}
        return {
            firstName: raw.AdminFirstName,
            lastName: raw.AdminLastName,
            profileImage: raw.AdminImageLink,
            gender: undefined
        }
    }
    converManyDomainToDBModel(raw: IAdminProfile[]): IAdminProfileMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IAdminProfileMySql[]): IAdminProfile[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const AdminProfileConverterInstance: AdminProfileConverter = new AdminProfileConverter();