import { IAccount } from "../../models/account";
import { AccountsServiceInstance } from "./sub-modules/accounts/accounts.service";
import * as bc from 'bcrypt';
import { AuthenticationService, AuthenticationServiceInstance } from "./authentication.service";
import { INewAccountDTO } from "../../dto/new-account.dto";
import { IUser } from "../../models/user";
import { UsersServiceInstance } from "../users/users.service";
import { AccountStatusEnum } from "../../enums/account-stats.enum";
import { TODResponse } from "../../dto/tod-response";
import { IResetPasswordRequest } from "../../models/reset-password-request";
import { EmailService } from "../../behavior/services/email.service";
import { SendGridEmailService, SendGridEmailServiceInstace } from "../communication/email/sendgrid-email.service";
import { NoAccountHolderResetTemplate } from "../../email-templates/no-account-holder-reset.template";
import { ResetPasswordTemplate } from "../../email-templates/reset-password.template";
import { UsersRolEnum } from "../../enums/users-rol.enum";
import { InvitationEmailTemplate } from "../../email-templates/invitation-email.template";


export class AuthenticationController {

    constructor(
        protected _authService: AuthenticationService,
        private _emailService: EmailService) {
    }

    authenticate(credentials: { password: string, email: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const result: { token: string, auth: boolean, message: string, data: IAccount | null } =
                    await this._authService.authenticate(credentials);

                //sugar
                const { auth, data, token } = result;

                if (!auth) {
                    //throw error
                    return reject(result);
                }
                /**
                 * Get the user attached to that account.
                 */
                const user: IUser = await UsersServiceInstance.getById(data.userId);
                //send token and user back
                return resolve({ user: user, token: token });

            } catch (error) {
                reject({ error: error, status: 403 });
            }
        })
    }

    signup(account: INewAccountDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                //simple register set rol to user. before procced.
                account.accountStatus = AccountStatusEnum.accepted;
                const result: { success: boolean, message: string, used: boolean } = await
                    this._authService.registerUser(account);


                return resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    }

    verifyEmail(email: string, verificationToken: string): Promise<any> {
        return this._authService.verifyEmail(email, verificationToken)
    }

    changePassword(creds: any): Promise<any> {
        return this._authService.changePassword(creds.email, creds)
    }

    resetPassword(email: string): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const resetRequest: IResetPasswordRequest = await this._authService.resetPassword(email);
                if (!resetRequest) {
                    //send bad email
                    this._emailService.sentToOne(email, new NoAccountHolderResetTemplate(email));
                }

                const response: TODResponse = {
                    message: 'password reset success',
                    payload: true,
                    timestamp: new Date()
                }
                //create link
                const link: string = `http://localhost:4200/reset_password?token=${resetRequest.requestToken}`;
                //send email to user.
                this._emailService.sentToOne(email, new ResetPasswordTemplate(link))

                return resolve(response)

            } catch (error) {

                const badResponse: TODResponse = {
                    message: 'Error,on password reset',
                    error: error,
                    timestamp: new Date()
                };

                return reject(error);
            }
        })
    }

    signUpWithInvitation(invitationToken: string, newAccount: INewAccountDTO): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const validationResult: any = await this._authService.signUpWithInvite(invitationToken, newAccount);

                const result: TODResponse = {
                    message: 'registration succfully',
                    payload: validationResult,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: 'registration failed',
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult);
            }
        });
    }

    inviteUser(invitationRequest: { email: string, role: UsersRolEnum, inviterId: number }): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const token: string = await this._authService.createInvitationToken(invitationRequest);

                const link: string = `${token}`;
                //sent email.
                this._emailService.sentToOne(
                    invitationRequest.email, new InvitationEmailTemplate(link));

                const result: TODResponse = {
                    message: 'Invitation created succefully',
                    payload: true,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

            }
        });
    }
    //implementar este metodo
    validateResetToken(token: string): Promise<TODResponse> {
        return null
    }

}

export const AuthenticationControllerInstance: AuthenticationController =
    new AuthenticationController(
        AuthenticationServiceInstance,
        SendGridEmailServiceInstace);
