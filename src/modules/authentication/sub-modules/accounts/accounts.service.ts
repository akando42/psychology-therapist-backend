import { IAccount } from "../../../../models/account";
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { AccountsRepoInstance } from "../../dao/repositories/accounts.repository";


export class AccountsService extends WriterReaderService<IAccount>  {

    constructor() {
        super(AccountsRepoInstance);
    }

    getByEmail(email: string): Promise<IAccount> {
        return AccountsRepoInstance.getByEmail(email);
    }
    getById(id: string): Promise<IAccount> {
        return AccountsRepoInstance.getById(id);
    }
}

export const AccountsServiceInstance: AccountsService = new AccountsService();

