import { IAccount } from "../../../../models/account";
import { IResetPasswordRequest } from "../../../../models/reset-password-request";


export interface IAccountsService {

    updateAccount(accountId: number, account: IAccount): Promise<IAccount>;

    createAccount(userId: any, newAccount: IAccount, verified: boolean): Promise<IAccount>;

    getByEmail(email: string): Promise<IAccount>;

    verifyAccountEmail(verificationToken: string): Promise<any>;

    getById(id: string): Promise<IAccount>;

    authenticate(credentials: { password: string, email: string }): Promise<IAccount>;

    generatePasswordReset(email: string): Promise<IResetPasswordRequest>;

    getResetRequestByToken(token: string): Promise<IResetPasswordRequest>;

}

