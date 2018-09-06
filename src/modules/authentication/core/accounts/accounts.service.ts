import { IAccount } from "../../../../models/account";


export interface IAccountsService {

    updateAccount(accountId: number, account: IAccount): Promise<IAccount>;

    createAccount(account: IAccount): Promise<IAccount>;

    getByEmail(email: string): Promise<IAccount>;

    getById(id: string): Promise<IAccount>;
}

