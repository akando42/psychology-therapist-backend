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
    resourceName: 'Accounts'
})
export class MySqlAccountsRepository implements IAccountsRepository {


    createAccount(account: IAccount): Promise<IAccount> {
        return null;
    }

    getByEmail(email: string): Promise<IAccount> {
        return null;
    }
    getById(id: string): Promise<IAccount> {
        return null;
    }
    updateAccount(id: number, data: IAccount): Promise<IAccount> {
        return null;
    }
    getByValidationHash(token: string): Promise<IAccount> {
        return null;
    }



}

