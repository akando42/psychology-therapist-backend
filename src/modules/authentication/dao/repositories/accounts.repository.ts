import { AccountMySqlDAO, AccountMySqlDAOInstance } from "../my-sql/account-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAccount } from "../../../../models/account";
import { AccountsConverterInstance } from "../../converters/my-sql/account.converter";
import { GetBy } from "../queries/mysql/get-by";
import { UpdateQuery } from "../../../users/dao/queries/mysql/update";




export class AccountsRepository extends AbstractRepository<IAccount>{
    constructor() {
        super(AccountMySqlDAOInstance, AccountsConverterInstance);
    }

    getByEmail(email: string): Promise<IAccount> {
        return super.getBy(new GetBy({ AccountEmail: email }).toDQuery());
    }


    getById(id: string): Promise<IAccount> {
        return super.getBy(new GetBy({ AccountID: id }).toDQuery());
    }

    update(id, model: IAccount): Promise<boolean> {
        return super.update(new UpdateQuery({ AccountID: id }), model);
    }

}

export const AccountsRepoInstance: AccountsRepository = new AccountsRepository();
