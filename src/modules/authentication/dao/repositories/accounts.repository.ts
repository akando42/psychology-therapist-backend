import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { IAccount } from "../../../../models/account";




export interface IAccountsRepository {

    
    getByEmail(email: string): Promise<IAccount>

    getById(id: string): Promise<IAccount>;

    updateAccount(id: number, data: IAccount): Promise<IAccount>;

    getByValidationHash(token: string): Promise<IAccount>;

    createAccount(account:IAccount):Promise<IAccount>;


}

