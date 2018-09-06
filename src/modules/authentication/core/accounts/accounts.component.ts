import * as bc from 'bcrypt';

import { IAccount } from "../../../../models/account";
import { IAccountsService } from "./accounts.service";
import { AccountStatusEnum } from "../../../../enums/account-stats.enum";


export class AccountsComponent {

    constructor(
        private _acountService: IAccountsService) { }


    updateAccount(accountId: number, account: IAccount): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {

                const accountCreated: IAccount =
                    await this._acountService.updateAccount(accountId, account);
                return resolve(accountCreated);

            } catch (error) {
                return reject(error);
            }
        });
    }

    resetAccountPasswordRequest(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const request = await this._acountService.generatePasswordReset();
                return resolve(request);
            } catch (error) {

            }
        })
    }

    agregar el metodo para resetear ael passowrd, y validar invitacion
    son internos de cada modulo

    createAccount(userId, newAccount: IAccount): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {


                const hashPassword = await bc.hash(newAccount.password, 10);
                let account: IAccount = {
                    email: newAccount.email,
                    userId: userId,
                    accountStatus: AccountStatusEnum.waiting,
                    //change password of user for encrypted one (we dont save the password plain value ).
                    password: hashPassword,
                    signUpDate: Math.floor(Date.now() / 1000),
                    verificationHash:
                        bc.hashSync(JSON.stringify({ email: newAccount.email, userId: userId }), 10),
                    emailVerified: false
                }


                const accountCreated: IAccount = await this._acountService.createAccount(account);
                return resolve(accountCreated);
            } catch (error) {
                return reject(error);
            }
        });
    }

    getByEmail(email: string): Promise<IAccount> {
        return this._acountService.getByEmail(email);
    }

}



