import { IAccount } from "../../../models/account";


export class AccountsService {

    static getByEmail(userId: string): Promise<IAccount> {
        return null;
    }

    static create(account: IAccount): Promise<string> {
        return null;
    }

    static update(account: IAccount): Promise<any> {
        return null;
    }
}