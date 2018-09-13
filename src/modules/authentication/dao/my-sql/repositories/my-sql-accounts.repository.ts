import { AbstractAccountsRepository } from "../../repositories/accounts.repository";
import { IAccount } from "../../../../../models/account";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlAccountConverter } from "../../../converters/my-sql/my-sql-account.converter";


export class MySqlAccountsRepository extends AbstractAccountsRepository {
    constructor() {
        super(new GenericDao('ACCOUNTS'), new MySqlAccountConverter());
    }


    getByValidationHash(token: string): Promise<IAccount> {
        return super.getBy(new GetByQuery({ AccountVerificationHash: token }).toDBQuery('ACCOUNTS'));
    }

    getByEmail(email: string): Promise<IAccount> {
        return super.getBy(new GetByQuery({ AccountEmail: email }).toDBQuery('ACCOUNTS'));
    }

    getById(id: string): Promise<IAccount> {
        return super.getBy(new GetByQuery({ AccountID: id }).toDBQuery('ACCOUNTS'));
    }

    updateAccount(id: number, data: IAccount): Promise<IAccount> {
        return super.update(id,data)
    }
}


export const MySqlAccountsRepositoryInstance: MySqlAccountsRepository = new MySqlAccountsRepository();