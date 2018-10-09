import { IAccount } from "../../../../models/account";
import { IAccountMySql } from "../../dao/my-sql/models/account-my-sql";
import { IDualConverter } from "../../../../core/converters/converter.interface";


export class MySqlAccountConverter implements IDualConverter<IAccount, IAccountMySql> {
    converDomainToDBModel(raw: IAccount): IAccountMySql {
        if (!raw) { return null }
        return {
            AccountStatus: raw.accountStatus,
            AccountEmail: raw.email,
            AccountPassword: raw.password,
            AccountID: raw.accountId,
            AccountSignUpDate: raw.signUpDate,
            AccountUserID: raw.userId,
            AccountVerificationHash: raw.verificationHash,
            AccountEmailVerified: raw.emailVerified
        }
    }
    convertDBModelToDomain(raw: IAccountMySql): IAccount {
        if (!raw) { return null }
        return {
            accountStatus: raw.AccountStatus,
            email: raw.AccountEmail,
            password: raw.AccountPassword,
            accountId: raw.AccountID,
            signUpDate: raw.AccountSignUpDate,
            userId: raw.AccountUserID,
            verificationHash: raw.AccountVerificationHash,
            emailVerified: raw.AccountEmailVerified
        }
    }
    converManyDomainToDBModel(raw: IAccount[]): IAccountMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IAccountMySql[]): IAccount[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}
