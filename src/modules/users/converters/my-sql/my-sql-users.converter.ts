
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUser } from "../../../../models/user";
import { IUserMySql } from "../../dao/my-sql/models/user-my-sql.model";

export class MySqlUsersConverter implements IDualConverter<IUser, IUserMySql> {
    converDomainToDBModel(raw: IUser): IUserMySql {
        if (!raw) { return null }
        return {
            UserID: raw.id,
            UserFirstName: raw.firstName,
            UserLastName: raw.lastName,
            // UserRole: raw.role,
            UserEmail: raw.email,
            UserGender: raw.gender,
            UserPhoneNumber: raw.contactInfo.phoneNumber,
            UserIDVerified: raw.idVerified || false

        }
    }
    convertDBModelToDomain(raw: IUserMySql): IUser {
        if (!raw) { return null }
        console.log(raw);
        return {
            firstName: raw.UserFirstName,
            lastName: raw.UserLastName,
            gender: raw.UserGender,
            email: raw.UserEmail,

            contactInfo: {
                phoneNumber: raw.UserPhoneNumber,
            },
            id: raw.UserID,
            // role: raw.UserRole,
            idVerified: raw.UserIDVerified,

        }
    }
    converManyDomainToDBModel(raw: IUser[]): IUserMySql[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IUserMySql[]): IUser[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const MySqlUsersConverterInstance: MySqlUsersConverter =
    new MySqlUsersConverter();