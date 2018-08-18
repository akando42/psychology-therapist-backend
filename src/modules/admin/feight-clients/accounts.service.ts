import { AccountsControllerInstance } from "../../authentication/sub-modules/accounts/accounts.controller";
import { IAccount } from "../../../models/account";


export class AccountsService {

    static getByEmail(userId: string): Promise<IAccount> {
        return AccountsControllerInstance.getByEmail(userId);
    }

    static create(account: IAccount): Promise<string> {
        return AccountsControllerInstance.create(account);
    }

    static update(account: IAccount): Promise<any> {
        return AccountsControllerInstance.update(account.accountId, account);
    }
}