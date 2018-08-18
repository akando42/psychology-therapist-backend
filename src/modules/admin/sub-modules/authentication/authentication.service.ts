import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { INewAccountDTO } from '../../../../dto/new-account.dto';
import { IAccount } from '../../../../models/account';
import { AccountsService } from '../../feight-clients/accounts.service';
import { IUser } from '../../../../models/user';
import { UsersRolEnum } from '../../../../enums/users-rol.enum';
import { UsersService } from '../../feight-clients/users.service';
import { AccountStatusEnum } from '../../../../enums/account-stats.enum';
import { EmailService } from '../../feight-clients/email.service';
import { generateAccountVerificationEmail } from '../../utils/generate-account-verification-email.func';
import { InvalidCredentialsError } from '../../../../errors/invalid-credentials.error';
import { UnverifiedAccountError } from '../../../../errors/unverfied-account.error';
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

                const exist: IAccount = await AccountsService.getByEmail(newAccount.email);
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

                let userId: string = await UsersService.create(newUser);

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

                const saved: any = await AccountsService.create(account);

                EmailService.sentToOne(account.email, generateAccountVerificationEmail(newUser, account))
                    .then(console.log)
                    .catch(console.log)


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
                const account: IAccount = await AccountsService.getByEmail(credentials.email);
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

    changePassword(email: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const account = await AccountsService.getByEmail(email);

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
                const result = await AccountsService.update(account);
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
            const account: IAccount = await AccountsService.getByEmail(email);
            //verify hashed code;
            if (account.verificationHash === verificationToken) {
                account.emailVerified = true;
            }

            // console.log('account from service', account.accountId)
            const updated = await AccountsService.update(account);
            console.log('result from account updated', updated)
            return resolve({ message: 'verification success' });


        });
    }

}


export const AuthenticationServiceInstance: AuthenticationService = new AuthenticationService();