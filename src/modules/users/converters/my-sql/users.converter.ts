
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUser } from "../../../../models/user";
import { IUserMySql } from "../../dao/my-sql/models/my-sql/user-my-sql.model";

export class UsersConverter implements IDualConverter<IUser, IUserMySql> {
    converDomainToDBModel(raw: IUser): IUserMySql {
        if (!raw) { return null }
        return {
            USERID: raw.id,
            FIRST_NAME: raw.basicInfo.firstName,
            LAST_NAMEE: raw.basicInfo.lastName,
            USER_ROL: raw.userRol,
            EMAIL: raw.contactInfo.email,
            GENDER: raw.basicInfo.gender,
            PHONE_NUMBER: raw.contactInfo.phoneNumber
        }
    }
    convertDBModelToDomain(raw: IUserMySql): IUser {
        if (!raw) { return null }
        return {
            basicInfo: {
                firstName: raw.FIRST_NAME,
                lastName: raw.LAST_NAMEE,
                gender: raw.GENDER
            },
            contactInfo: {
                phoneNumber: raw.PHONE_NUMBER,
                email: raw.EMAIL
            },
            id: raw.USERID,
            userRol: raw.USER_ROL
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