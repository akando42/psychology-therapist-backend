
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUserProfile } from '../../../../models/User-profile'
import { IUserProfileMySql } from "../../dao/my-sql/models/my-sql/User-my-sql.model";

export class UserProfileConverter implements IDualConverter<IUserProfile, IUserProfileMySql> {
    converDomainToDBModel(raw: IUserProfile): IUserProfileMySql {
        return {
            UserFirstName: raw.firstName,
            UserLastName: raw.lastName,
            UserAddress: raw.address.adressString,
            UserLattitude: raw.address.latitud,
            UserLongitude: raw.address.longitud,
            UserImageLink: raw.profileImage,
            UserPhone: raw.phone
        }
    }
    convertDBModelToDomain(raw: IUserProfileMySql): IUserProfile {
        return {
            address: {
                longitud: raw.UserLongitude,
                latitud: raw.UserLattitude,
                adressString: raw.UserAddress
            },
            firstName: raw.UserFirstName,
            lastName: raw.UserLastName,
            profileImage: raw.UserImageLink,
            gender: undefined,
            phone: raw.UserPhone
        }
    }
    converManyDomainToDBModel(raw: IUserProfile[]): IUserProfileMySql[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IUserProfileMySql[]): IUserProfile[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const UserProfileConverterInstance: UserProfileConverter = new UserProfileConverter();