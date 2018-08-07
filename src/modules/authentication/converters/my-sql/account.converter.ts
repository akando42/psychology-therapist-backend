import { IAccount } from "../../../../models/account";
import { IAccountMySql } from "../../dao/my-sql/models/my-sql/account-my-sql";
import { IDualConverter } from "../../../../behavior/converters/converter.interface";


export class AccountConverter implements IDualConverter<IAccount, IAccountMySql> {
    converDomainToDBModel(raw: IAccount): IAccountMySql {
        if (!raw) { return null }
        return {
            accountStatus: raw.accountStatus,
            email: raw.email,
            password: raw.password,
            accountId: raw.accountId,
            signUpDate: raw.signUpDate,
            userId: raw.userId
        }
    }
    convertDBModelToDomain(raw: IAccountMySql): IAccount {
        if (!raw) { return null }
        return {
            accountStatus: raw.accountStatus,
            email: raw.email,
            password: raw.password,
            accountId: raw.accountId,
            signUpDate: raw.signUpDate,
            userId: raw.userId
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