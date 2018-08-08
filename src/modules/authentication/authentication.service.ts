import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAccount } from '../../models/account';
import { AccountsServiceInstance } from './sub-modules/accounts/accounts.service';
import { INewAccountDTO } from '../../dto/new-account.dto';
import { IUser } from '../../models/user';
import { UsersServiceInstance } from '../users/users.service';

/**
 * Main module for authenticatiom, other modules for diferent user rol
 * can extends this one and implement self logic per requiremnts.
 */
export class AuthenticationService {

    constructor() {
    }

    registerUser(newAccount: INewAccountDTO): Promise<{ success: boolean, message: string, used: boolean }> {
        return new Promise(async (resolve, reject) => {
            try {
                const exist: IAccount = await AccountsServiceInstance.getByEmail(newAccount.email);
                //handle better
                if (exist) {
                    resolve({ success: false, message: 'Email its already been used', used: true });
                }
                //create user
                let user: IUser = await UsersServiceInstance.create(newAccount.userInfo);

                const hashPassword = await bc.hash(newAccount.password, 10);
                let account: IAccount = {
                    email: newAccount.email,
                    userId: user.id,
                    accountStatus: newAccount.accountStatus,
                    //change password of user for encrypted one (we dont save the password plain value ).
                    password: hashPassword,
                    signUpDate: Math.floor(Date.now() / 1000)
                }

                const saved: any = await AccountsServiceInstance.create(account);

                //success resolve.
                resolve({ success: true, message: 'Account registed', used: false });
            } catch (e) {

                reject(e)

            }
        })
    }

    async authenticate(credentials: { password: string, email: string }):
        Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

                const account: IAccount = await AccountsServiceInstance.getByEmail(credentials.email);
                if (!account) {

                    return reject({ auth: false, message: 'invalid credentials', token: null, userAccount: null });
                }

                const itsMatch: boolean = await bc.compare(credentials.password, account.password);

                if (!itsMatch) {
                    return reject({ auth: false, message: 'invalid credentials', token: null, userAccount: null });
                }
                //sanatize
                account.password = undefined;

                const token = jwt.sign(
                    { accountId: account.accountId },
                    process.env.SECRET_KEY, { expiresIn: 60000 });

                resolve({ auth: true, token: token, userAccount: account, message: 'succesfully authenticated' });


            } catch (error) {
                reject(error);
            }
        });
    }

    changePassword(accountId: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const account = await AccountsServiceInstance.getById(accountId);

                if (!account) {
                    return reject({ success: false, message: 'invalid account id' })
                }

                //check old password
                const itsMatch: boolean = await bc.compare(account.password, changeRequest.oldPassword);

                if (!itsMatch) {
                    return reject({ success: false, message: 'invalid old password' });
                }
                //success
                const hashPassword: string = await bc.hash(changeRequest.newPassword, 10);

                account.password = hashPassword;
                const result = await AccountsServiceInstance.update(accountId, account);
                if (result) {
                    //tood sent email with notification of the password change

                    return resolve({ success: true, message: 'account password changed succefully' })
                }

            } catch (error) {

            }
        })
    }

}


export const AuthenticationServiceInstance: AuthenticationService = new AuthenticationService();