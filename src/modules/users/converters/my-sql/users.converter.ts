
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUser } from "../../../../models/user";
import { IUserMySql } from "../../dao/my-sql/models/user-my-sql.model";

export class UsersConverter implements IDualConverter<IUser, IUserMySql> {
    converDomainToDBModel(raw: IUser): IUserMySql {
        if (!raw) { return null }
        return {
            UserID: raw.id,
            UserFirstName: raw.basicInfo.firstName,
            UserLastName: raw.basicInfo.lastName,
            UserRole: raw.role,
            UserEmail: raw.contactInfo.email,
            UserGender: raw.basicInfo.gender,
            UserPhoneNumber: raw.contactInfo.phoneNumber,
            UserIDVerified: raw.idVerified

        }
    }
    convertDBModelToDomain(raw: IUserMySql): IUser {
        if (!raw) { return null }
        console.log(raw);
        return {
            basicInfo: {
                firstName: raw.UserFirstName,
                lastName: raw.UserLastName,
                gender: raw.UserGender
            },
            contactInfo: {
                phoneNumber: raw.UserPhoneNumber,
                email: raw.UserEmail
            },
            id: raw.UserID,
            role: raw.UserRole,
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

export const UsersConverterInstance: UsersConverter = new UsersConverter();