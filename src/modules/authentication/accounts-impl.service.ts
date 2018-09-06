import { IAccount } from "../../models/account";
import { IAccountsService } from "./core/accounts/accounts.service";
import { AbstractAccountInviteRepository } from "./dao/repositories/account-invite.repositoty";
import { AbstractAccountsRepository } from "./dao/repositories/accounts.repository";
import { MySqlAccountsRepository } from "./dao/my-sql/repositories/my-sql-accounts.repository";
import { GenericDao } from "../../behavior/mysql/generic.dao";
import { MySqlAccountConverter } from "./converters/my-sql/my-sql-account.converter";
import { IResetPasswordRequest } from "../../models/reset-password-request";


export class AccountsServiceImpl implements IAccountsService {


    constructor(private _accountsRepository: AbstractAccountsRepository) { }

    generatePasswordReset(): Promise<IResetPasswordRequest> {
        throw new Error("Method not implemented.");
    }


    updateAccount(accountId: number, account: IAccount): Promise<IAccount> {
        throw new Error("Method not implemented.");
    }
    createAccount(account: IAccount): Promise<IAccount> {
        return this._accountsRepository.create(account);
    }

    getByEmail(email: string): Promise<IAccount> {
        return this._accountsRepository.getByEmail(email);
    }
    getById(id: string): Promise<IAccount> {
        return this._accountsRepository.getById(id);
    }
}

export const AccountsServiceInstance: AccountsServiceImpl =
    new AccountsServiceImpl(
        new MySqlAccountsRepository(
            new GenericDao(),
            new MySqlAccountConverter()
        )
    );

