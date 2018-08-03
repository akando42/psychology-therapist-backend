import { IDualConverter } from "@core/behaviors/converters/converter.interface";
import { IAdminProfile } from "@core/models/admin-profile";
import { IAdminProfileMySql } from "@core/modules/admin/dao/my-sql/models/my-sql/admin-my-sql.model";



export class AdminProfileConverter implements IDualConverter<IAdminProfile, IAdminProfileMySql> {
    converDomainToDBModel(raw: IAdminProfile): IAdminProfileMySql {
        return {
            AdminFirstName: raw.firstName,
            AdminLastName: raw.lastName,
            AdminAddress: raw.address.adressString,
            AdminLattitude: raw.address.latitud,
            AdminLongitude: raw.address.longitud,
            AdminImageLink: raw.profileImage
        }
    }
    convertDBModelToDomain(raw: IAdminProfileMySql): IAdminProfile {
        return {
            address: {
                longitud: raw.AdminLongitude,
                latitud: raw.AdminLattitude,
                adressString: raw.AdminAddress
            },
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