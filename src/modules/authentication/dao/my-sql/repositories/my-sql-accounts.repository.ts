import { IAccountsRepository } from "../../repositories/accounts.repository";
import { IAccount } from "../../../../../models/account";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {
    accountId: 'AccountID',
    email: 'AccountEmail',
    password: 'AccountPassword',
    accountStatus: 'AccountStatus',
    signUpDate: 'AccountSignUpDate',
    verificationHash: 'AccountVerificationHash',
    userId: 'AccountUserID',
    emailVerified: 'AccountEmailVerified'
};

@ByNameRepository('ACCOUNTS', {
    converterProps: propsMatch,
    primaryKey: 'AccountID',
    resourceName: 'Accounts',
    create: { return: true }
})
export class MySqlAccountsRepository implements IAccountsRepository {


    createAccount(account: IAccount): Promise<IAccount> {
        return null;
    }

    getAccountByEmail(email: string): Promise<IAccount> {
        return null;
    }
    getAccountById(id: string): Promise<IAccount> {
        return null;
    }
    updateAccount(id: number, data: IAccount): Promise<IAccount> {
        return null;
    }
    getAccountByVerificationHash(token: string): Promise<IAccount> {
        return null;
    }



}

