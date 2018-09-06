import { AbstractAccountsRepository } from "../../repositories/accounts.repository";
import { IAccount } from "../../../../../models/account";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";


export class MySqlAccountsRepository extends AbstractAccountsRepository {
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    getByEmail(email: string): Promise<IAccount> {
        return super.getBy(new GetByQuery({ AccountEmail: email }).toDBQuery('ACCOUNTS'));
    }
    getById(id: string): Promise<IAccount> {
        return super.getBy(new GetByQuery({ AccountID: id }).toDBQuery('ACCOUNTS'));
    }
    updateAccount(id: string, data: IAccount): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}