

import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { IAccount } from "../../../../models/account";
import { AccountsServiceInstance } from "./accounts.service";


export class AccountsController extends WriteReadController<IAccount> {

    constructor() {
        super(AccountsServiceInstance)
    }

    getByEmail(email: string): Promise<IAccount> {
        return AccountsServiceInstance.getByEmail(email);
    }

}

export const AccountsControllerInstance: AccountsController = new AccountsController();


