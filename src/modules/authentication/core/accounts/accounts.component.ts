import * as bc from 'bcrypt';

import { IAccount } from "../../../../models/account";
import { IAccountsService } from "./accounts.service.interface";
import { IResetPasswordRequest } from '../../../../models/reset-password-request';
import { IAccountInvite } from '../../../../models/account-invite';
import { IInvitationService } from '../invitations/invitations.service.interface';
import { UsersProfileComponent } from '../../../users/core/user-profile/user-profile.component';
import { IUser } from '../../../../models/user';


export class AccountsComponent {

    constructor(
        private _acountService: IAccountsService,
        private _invitationsService: IInvitationService,
        private _userComponent: UsersProfileComponent,
        private _emailService?: any
    ) { }

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
                const result = await this._acountService.updateAccount(account.accountId, account);
                if (result) {
                    //tood sent email with notification of the password change

                    return resolve({ success: true, message: 'account password changed succefully' })
                }
            } catch (error) {

            }
        })
    }
    authenticateAccount(credentials: { password: string, email: string }): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {
                //autenticate account
                const account: IAccount = await this._acountService.authenticate(credentials);
                //add result to login history
                /**aqui va eese codigo */
                return resolve(account);
            } catch (error) {
                console.log(error);
                return reject(error);
            }
        })
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
            const updatedAccount: any = await this._acountService.updateAccount(account.accountId, account);

            if (updatedAccount) {
                return resolve({ message: 'password updated!', success: true });
            }
        })
    }

    createAccountAndProfile(account: any, verified: boolean = false): Promise<IAccount> {
        return new Promise<IAccount>(async (resolve, reject) => {
            try {

                //create the user.
                const userCreated: IUser = await this._userComponent.createUserProfile(account.profile);
                //assign a account to that user.
                console.log(userCreated)
                const accountCreated: IAccount = await this.createAccount(userCreated.id, account, verified);
                //sanatize
                delete accountCreated.password;
                delete accountCreated.verificationHash;

                return resolve(accountCreated)

            } catch (error) {
                console.log(error)
                return reject(error);
            }
        })
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
                const invitation: IAccountInvite = await this._invitationsService.getInvitationByEmail(email);
                //still on recerved;
                if (!invitation) {
                    return resolve(true);
                }
                if (invitation.expired) {
                    return resolve(true);
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



