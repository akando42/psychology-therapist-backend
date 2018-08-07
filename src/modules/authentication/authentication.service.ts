import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAccount } from '../../models/account';
import { AccountsServiceInstance } from './sub-modules/accounts/accounts.service';

/**
 * Main module for authenticatiom, other modules for diferent user rol
 * can extends this one and implement self logic per requiremnts.
 */
export class AuthenticationService {

    constructor() {
    }

    registerUser(account: IAccount): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const exist: IAccount = await AccountsServiceInstance.getByEmail(account.email);
                //handle better
                if (account) {
                    resolve({ success: false, message: 'Email its already been used' });
                }

                const hashPassword = await bc.hash(account.password, 10)
                //change password of user for encrypted one (we dont save the password plain value ).
                account.password = hashPassword;
                account.signUpDate = Math.floor(Date.now() / 1000);;

                return resolve(await AccountsServiceInstance.create(account));
                //success resolve.
                resolve({ succes: true, message: 'Account registed' });
            } catch (e) {
                //should handle errors
                let err = {
                    nativeMessage: e['message'],
                    error: true
                };
                reject(err)

            }
        })
    }

    async authenticate(credentials: { password: string, email: string }): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

                const account: IAccount = await AccountsServiceInstance.getByEmail(credentials.email);
                if (!account) {

                    reject({ auth: false, message: 'invalid credentials' });
                }

                const itsMatch: boolean = await bc.compare(credentials.password, account.password);

                if (!itsMatch) {
                    reject({ auth: false, message: 'invalid credentials' });
                }

                const token = jwt.sign({ userId: account.accountId }, process.env.SECRET_KEY, { expiresIn: 60000 });

                resolve({ auth: true, token: token });


            } catch (error) {
                console.log(error['message'])
                reject(error);
            }
        });
    }

}


export const AuthenticationServiceInstance: AuthenticationService = new AuthenticationService();