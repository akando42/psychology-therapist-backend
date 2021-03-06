import * as bc from 'bcrypt';

import { IAccount } from "../../../../models/account";
import { IAccountsService } from "./accounts.service.interface";
import { IResetPasswordRequest } from '../../../../models/reset-password-request';
import { ICabinetInvitation } from '../../../../models/cabinet-invitation';
import { UsersProfileComponent } from '../../../users/core/user-profile/user-profile.component';
import { IUser } from '../../../../models/user';
import { IUserProfileService } from '../../../users/core/user-profile/user-profile.service.interface';
import { isNullOrUndefined } from 'util';
import { INewAccountDTO } from '../../../../dto/new-account.dto';
import { ComposeValidation } from '../../../../core/validations/validate.notation';
import { validatePassword } from '../../../../core/validations/validation.function';


export class AccountsComponent {

    constructor(
        private _acountService: IAccountsService,
        private _userProfileService: IUserProfileService,
        private _emailService?: any
    ) { }

    updateAccount(id: number, account: IAccount): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {

                const accountCreated: IAccount =
                    await this._acountService.updateAccount(id, account);
                return resolve(accountCreated);

            } catch (error) {
                return reject(error);
            }
        });
    }

    changeAccountPassword(email: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const account = await this._acountService.getByEmail(email);

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
                const result = await this._acountService.updateAccount(account.id, account);
                if (result) {
                    //tood sent email with notification of the password change

                    return resolve({ success: true, message: 'account password changed succefully' })
                }
            } catch (error) {

            }
        })
    }
    async authenticateAccount(credentials: { password: string, email: string }): Promise<{ account: IAccount, user: IUser }> {
        //autenticate account
        const account: IAccount = await this._acountService.authenticate(credentials);

        const user: IUser = await this._userProfileService.getUserById(account.userId);
        return { account: account, user: user };
    }

    resetAccountPassword(email: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                //create a token probably add token 
                const request = await this._acountService.generatePasswordReset(email);

                return resolve(request.requestToken);
            } catch (error) {
                return reject(error);
            }
        })
    }

    validateTokenAndChangePassword(token: string, newPassword: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const request: IResetPasswordRequest = await this._acountService.getResetRequestByToken(token)
            //token already expired;
            if (request.expired) {
                return reject({ message: 'token expired', success: false });
            }

            //here token its valid "exist", and still haavent expired;
            const account: IAccount = await this._acountService.getByEmail(request.requestEmail);
            //hashin password to save
            const hashPassword: string = await bc.hash(newPassword, 10);
            //replace new password
            account.password = hashPassword;
            // TODO CAMBIAR EL ESTADO DEL REQUEST PARA HACERLO INVALIDO
            const updatedAccount: any = await this._acountService.updateAccount(account.id, account);

            if (updatedAccount) {
                return resolve({ message: 'password updated!', success: true });
            }
        })
    }

    @ComposeValidation([{ index: 0, validators: [{ name: 'password', cb: validatePassword }] }])
    async  createAccountAndProfile(account: INewAccountDTO, verified: boolean = false): Promise<{ user: IUser, account: IAccount }> {
        try {
          
            const exist = await this._userProfileService.getUserByEmail(account.email);
            if (!isNullOrUndefined(exist)) {
                throw { message: 'email already on use' };
            }

            //create the user.
            const userCreated: IUser = await this._userProfileService.createUserProfile(account);
            console.log(userCreated)
            //assign a account to that user.
            const accountCreated: IAccount = await this._acountService.createAccount(userCreated.id, account, verified);
           

            return { account: accountCreated, user: userCreated }
        }
        catch (error) {
            //rollback if error;

            throw error;
        }

    }

    createAccount(userId: any, newAccount: IAccount, verified: boolean = false): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {


                const accountCreated: IAccount = await this._acountService.createAccount(userId, newAccount, verified);
                // console.log
                return resolve(accountCreated);
            } catch (error) {
                console.log(error)
                return reject(error);
            }
        });
    }

    checkEmailDisponibility(email: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {

                const exist: IAccount = await this._acountService.getByEmail(email);
                //handle better
                if (exist) {
                    return reject(false);
                }

                return resolve(true);

            } catch (error) {
                console.log(error)
                return reject(error);
            }
        });
    }

    verifyAccountEmail(verificationToken: string): Promise<any> {
        return this._acountService.verifyAccountEmail(verificationToken);
    }
}



