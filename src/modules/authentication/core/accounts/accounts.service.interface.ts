import { IAccount } from "../../../../models/account";
import { IResetPasswordRequest } from "../../../../models/reset-password-request";


export interface IAccountsService {

    updateAccount(accountId: number, account: IAccount): Promise<IAccount>;

    createAccount(account: IAccount): Promise<IAccount>;

    getByEmail(email: string): Promise<IAccount>;

    getById(id: string): Promise<IAccount>;

    generatePasswordReset(email:string): Promise<IResetPasswordRequest>;

    getResetRequestByToken(token: string): Promise<IResetPasswordRequest>;

}

