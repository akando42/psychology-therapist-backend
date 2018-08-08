import { AccountMySqlDAO } from "../my-sql/account-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAccount } from "../../../../models/account";
import { AccountsConverterInstance } from "../../converters/my-sql/account.converter";
import { GetBy } from "../queries/mysql/get-by";




export class AccountsRepository extends AbstractRepository<IAccount>{
    constructor() {
        super(AccountMySqlDAO, AccountsConverterInstance);
    }

    getByEmail(email: string): Promise<IAccount> {
        return super.getBy(new GetBy({ email: email }));
    }


    getById(id: string): Promise<IAccount> {
        return super.getBy(new GetBy({ AccountID: id }));
    }
}

export const AccountsRepoInstance: AccountsRepository = new AccountsRepository();
