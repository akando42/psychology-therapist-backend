import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { IAccount } from "../../../../models/account";




export interface IAccountsRepository {

    
    getAccountByEmail(email: string): Promise<IAccount>

    getAccountById(id: string): Promise<IAccount>;

    updateAccount(id: number, data: IAccount): Promise<IAccount>;

    getAccountByValidationHash(token: string): Promise<IAccount>;

    createAccount(account:IAccount):Promise<IAccount>;


}

