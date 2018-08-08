
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUser } from "../../../../models/user";
import { IUserMySql } from "../../dao/my-sql/models/my-sql/user-my-sql.model";

export class UsersConverter implements IDualConverter<IUser, IUserMySql> {
    converDomainToDBModel(raw: IUser): IUserMySql {
        if (!raw) { return null }
        return {
            UserID: raw.id,
            UserFirstName: raw.basicInfo.firstName,
            UserLastName: raw.basicInfo.lastName,
            UserRol: raw.userRol,
            UserEmail: raw.contactInfo.email,
            UserGender: raw.basicInfo.gender,
            UserPhoneNumber: raw.contactInfo.phoneNumber
        }
    }
    convertDBModelToDomain(raw: IUserMySql): IUser {
        if (!raw) { return null }
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
            userRol: raw.UserRol
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