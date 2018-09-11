import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAccount } from "../../../../models/account";




export abstract class AbstractAccountsRepository extends AbstractRepository<IAccount>{
    constructor(dao, converter) {
        super(dao, converter);
    }

    abstract getByEmail(email: string): Promise<IAccount>

    abstract getById(id: string): Promise<IAccount>;

    abstract updateAccount(id: number, data: IAccount): Promise<boolean>;

    abstract getByValidationHash(token: string): Promise<IAccount>;



}

