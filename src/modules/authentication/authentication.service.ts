import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAccount } from '../../models/account';
import { AccountsServiceInstance } from './sub-modules/accounts/accounts.service';
import { INewAccountDTO } from '../../dto/new-account.dto';
import { IUser } from '../../models/user';
import { UsersServiceInstance } from '../users/users.service';
import { UsersRolEnum } from '../../enums/users-rol.enum';
import { resolve } from 'path';
import { MailGunEmailServiceInstance } from '../communication/email/mailgun-email.service';
import { NewAccountVerificationTemplate } from '../communication/email/templates/new-account-verification.template';
import { json } from 'body-parser';
import { SendGridEmailServiceInstace } from '../communication/email/sendgrid-email.service';
import { UnverifiedAccountError } from '../../errors/unverfied-account.error';
import { InvalidCredentialsError } from '../../errors/invalid-credentials.error';

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
                    return reject({ success: false, message: 'Email its already been used', used: true });
                }
                //create user
                const newUser: IUser = {
                    basicInfo: {
                        firstName: newAccount.firstName,
                        lastName: newAccount.lastName,
                        gender: newAccount.gender
                    },
                    contactInfo: {
                        email: newAccount.email,
                        phoneNumber: newAccount.phoneNumber
                    },
                    role: UsersRolEnum.admin
                }
                let userId: string = await UsersServiceInstance.create(newUser);

                const hashPassword = await bc.hash(newAccount.password, 10);
                let account: IAccount = {
                    email: newAccount.email,
                    userId: userId,
                    accountStatus: newAccount.accountStatus,
                    //change password of user for encrypted one (we dont save the password plain value ).
                    password: hashPassword,
                    signUpDate: Math.floor(Date.now() / 1000),
                    verificationHash:
                        bc.hashSync(JSON.stringify({ email: newAccount.email, userId: userId }), 10),
                    emailVerified: false
                }

                const saved: any = await AccountsServiceInstance.create(account);
                console.log('creating account', saved)

                const fullName: string = `${newAccount.firstName}  ${newAccount.lastName}`;
                const verificatinLink: string =
                    `http://localhost:3000/api/v1/authentication/verify-email?email=${account.email}&hash=${account.verificationHash}'`;

                const email = {

                    subject: 'Verification Mail | Massage On Demand',
                    body: new NewAccountVerificationTemplate(fullName, verificatinLink).getHtml()
                }

                // MailGunEmailServiceInstance.sentToOne(account.email, email)
                //     .then(console.log)
                //     .catch((err) => {
                //development only should make a variable for this lol.
                SendGridEmailServiceInstace.sentToOne(account.email, email)
                    .then(console.log)
                    .catch(console.log)
                // })


                //success resolve.
                resolve({ success: true, message: 'Account registed', used: false });
            } catch (e) {
                console.log(e)
                return reject(e)

            }
        })
    }

    async authenticate(credentials: { password: string, email: string }):
        Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const account: IAccount = await AccountsServiceInstance.getByEmail(credentials.email);
                //not match account
                console.log(account)
                if (!account) { return reject(new InvalidCredentialsError()); }
                //unverified account
                if (!account.emailVerified) { return reject(new UnverifiedAccountError()) }

                
                // const itsMatch: boolean = await bc.compare(credentials.password, account.password);

                // if (!itsMatch) {
                //     return reject({ auth: false, message: 'invalid credentials', token: null, userAccount: null });
                // }
                //sanatize
                account.password = undefined;
                account.verificationHash = undefined;

                const token = jwt.sign(
                    { userId: account.userId },
                    process.env.SECRET_KEY, { expiresIn: 60000 });

                return resolve({
                    auth: true, token: token,
                    data: account, message: 'succesfully authenticated'
                });


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
        });
    }

    verifyEmail(email: string, verificationToken: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            if (!email || !verificationToken) {
                return reject({ message: 'no email or hascode provided!' })
            }

            // const itMatch = bc.
            const account: IAccount = await AccountsServiceInstance.getByEmail(email);
            //verify hashed code;
            if (account.verificationHash === verificationToken) {
                account.emailVerified = true;
            }

            // console.log('account from service', account.accountId)
            const updated = await AccountsServiceInstance.update(account.accountId, account);
            console.log('result from account updated', updated)
            return resolve({ message: 'verification success' });


        });
    }

}


export const AuthenticationServiceInstance: AuthenticationService = new AuthenticationService();