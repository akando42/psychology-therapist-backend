import { IAccount } from "../../../../models/account";
import { IAccountMySql } from "../../dao/my-sql/models/my-sql/account-my-sql";
import { IDualConverter } from "../../../../behavior/converters/converter.interface";


export class AccountConverter implements IDualConverter<IAccount, IAccountMySql> {
    converDomainToDBModel(raw: IAccount): IAccountMySql {
        if (!raw) { return null }
        return {
            accountStatus: raw.accountStatus,
            email: raw.email,
            firstName: raw.basicInfo.firstName,
            lastName: raw.basicInfo.lastName,
            gender: raw.basicInfo.gender,
            userRol: raw.userRol,
            password: raw.password,
            accountId: raw.accountId,
            signUpDate: raw.signUpDate
        }
    }
    convertDBModelToDomain(raw: IAccountMySql): IAccount {
        if (!raw) { return null }
        return {
            accountStatus: raw.accountStatus,
            basicInfo: {
                firstName: raw.firstName,
                gender: raw.gender,
                lastName: raw.lastName
            },
            email: raw.email,
            password: raw.password,
            userRol: raw.userRol,
            accountId: raw.accountId,
            signUpDate: raw.signUpDate
        }
    }
    converManyDomainToDBModel(raw: IAccount[]): IAccountMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IAccountMySql[]): IAccount[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const AccountsConverterInstance: AccountConverter = new AccountConverter();