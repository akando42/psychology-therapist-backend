
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUserProfile } from '../../../../models/user-profile'
import { IUserProfileMySql } from "../../dao/my-sql/models/my-sql/user-my-sql.model";

export class UserProfileConverter implements IDualConverter<IUserProfile, IUserProfileMySql> {
    converDomainToDBModel(raw: IUserProfile): IUserProfileMySql {
        if(!raw){return null}
        return {
            UserID: raw.id,
            UserFirstName: raw.firstName,
            UserLastName: raw.lastName,
            UserProfileImage: raw.profileImage,
            UserPhone: raw.phone,
            UserEmailID: raw.email,
            UserGender: raw.gender
        }
    }
    convertDBModelToDomain(raw: IUserProfileMySql): IUserProfile {
        if(!raw){return null}
        return {
            id: raw.UserID,
            email: raw.UserEmailID,
            firstName: raw.UserFirstName,
            lastName: raw.UserLastName,
            profileImage: raw.UserProfileImage,
            phone: raw.UserPhone,
            gender: raw.UserGender
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