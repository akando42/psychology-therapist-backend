import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAccount } from '../../models/account';
import { INewAccountDTO } from '../../dto/new-account.dto';
import { IUser } from '../../models/user';
import { UsersRolEnum } from '../../enums/users-rol.enum';
import { NewAccountVerificationTemplate } from '../../email-templates/new-account-verification.template';
import { SendGridEmailServiceInstace } from '../communication/email/sendgrid-email.service';
import { UnverifiedAccountError } from '../../errors/unverfied-account.error';
import { InvalidCredentialsError } from '../../errors/invalid-credentials.error';
import { generateResetToken } from './utils/generate-reset-token.func';
import { IResetPasswordRequest } from '../../models/reset-password-request';
import { AbstractResetPasswordRequestRepository } from './dao/repositories/reset-passwod-request.repositoty.interface';
import { AbstractAccountInviteRepository } from './dao/repositories/account-invite.repositoty';
import { IAccountInvite } from '../../models/account-invite';
import { AbstractUsersRepository } from '../users/dao/users.repository';
import { IAuthenticationService } from './core/authentication.service';
import { AccountsComponent } from './core/accounts/accounts.component';
import { AbstractAuthenticationModule } from './core/authentication.component';
import { InvitationsComponent } from './core/invitations/invitations.components';
import { TODResponse } from '../../dto/tod-response';

export class AuthenticationModule extends AbstractAuthenticationModule {



    constructor(
        _accountsComponent?: AccountsComponent,
        _invitationsComponent?: InvitationsComponent,
    ) {
        super(_accountsComponent, _invitationsComponent)
    }


    inviteUser(invitationRequest: { email: string; role: UsersRolEnum; inviterId: number; }): Promise<import("c:/vagrant/tod_backend/src/dto/tod-response").TODResponse> {
        throw new Error("Method not implemented.");
    }

    signup(newAccount: INewAccountDTO): Promise<{ success: boolean, message: string, used: boolean }> {
        return new Promise(async (resolve, reject) => {
            try {

                const disponibility: boolean = await this.checkEmailDisponibility(newAccount.email);

                if (!disponibility) {
                    return resolve({ message: 'already on use', used: true, success: false });
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
                    role: newAccount.role
                }
                let userId: any = await this._usersComponent.createUser(newUser);

                const accountCreated: any = await this._accountsComponent.createAccount(userId, newAccount);

                const fullName: string = `${newAccount.firstName}  ${newAccount.lastName}`;
                const verificatinLink: string =
                    `http://localhost:3000/api/v1/authentication/verify-email?email=${accountCreated.email}&hash=${accountCreated.verificationHash}'`;

                const email = {

                    subject: 'Verification Mail | Massage On Demand',
                    body: new NewAccountVerificationTemplate(fullName, verificatinLink).getHtml()
                }

                // MailGunEmailServiceInstance.sentToOne(account.email, email)
                //     .then(console.log)
                //     .catch((err) => {
                //development only should make a variable for this lol.
                SendGridEmailServiceInstace.sentToOne(accountCreated.email, email)
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

    authenticate(credentials: { password: string, email: string }): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const account: IAccount = await this._accountsComponent.getByEmail(credentials.email);
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
                const account = await this._accountsComponent.getByEmail(email);

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
                const result = await this._accountsComponent.updateAccount(account.accountId, account);
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
            const account: IAccount = await this._accountsComponent.getByEmail(email);
            //verify hashed code;
            if (account.verificationHash === verificationToken) {
                account.emailVerified = true;
            }

            // console.log('account from service', account.accountId)
            const updated = await this._accountsComponent.updateAccount(account.accountId, account);
            console.log('result from account updated', updated)
            return resolve({ message: 'verification success' });


        });
    }

    resetPassword(email: string): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const account: IAccount = await this._accountsComponent.getByEmail(email);
                //account not registered
                if (!account.accountId) {
                    return resolve(null);
                }

                //create a token probably add token 
                const resetToken: string = generateResetToken(account);

                //save the token
                const request: any = this._accountsComponent.resetAccountPasswordRequest()


                return resolve(request)

            } catch (error) {
                return reject(error)
            }
        });
    }

    signUpWithInvitation(inviteToken: string, newAccount: INewAccountDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {


                const invitation = await this._invitationsComponent.validateInvitation(inviteToken)

                newAccount.role = invitation.role;
                const result = await this.signup(newAccount);

                return resolve(result);

            } catch (error) {
                return reject(error);
            }
        })
    }

    validateTokenAndReset(token: string, newPassword: string): Promise<{ message: string, valid: boolean }> {
        return new Promise<{ message: string, valid: boolean }>(async (resolve, reject) => {
            try {
                const request: IResetPasswordRequest = await this._accountsComponent.getRequestByToken(token)
                //token already expired;
                if (request.expired) {
                    return resolve({ message: 'expired', valid: false });
                }

                //here token its valid "exist", and still haavent expired;
                const account: IAccount = await this._accountsComponent.getByEmail(request.requestEmail);
                //hashin password to save
                const hashPassword: string = await bc.hash(newPassword, 10);
                //replace new password
                account.password = hashPassword;
                // TODO CAMBIAR EL ESTADO DEL REQUEST PARA HACERLO INVALIDO
                // this._resetPasswordRequestRepository

                const updatedAccount: any = await this._accountsComponent.updateAccount(account.accountId, account);

                return resolve({ valid: true, message: 'password changed succefully' });
            } catch (error) {
                reject(error)
            }
        });
    }



    createInvitationToken(invitationRequest: { email: string, role: UsersRolEnum, inviterId: number }): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {

                const exist: IAccount = await this._accountsComponent.getByEmail(invitationRequest.email);
                //check that its not a email on use.
                if (exist['accountId']) {
                    return reject({ message: 'email already on use', success: false });
                }

                const invitation: IAccountInvite = await this._invitationsComponent.createInvitation
                    ({
                        date: new Date().getTime(),
                        email: invitationRequest.email,
                        expired: false,
                        inviterID: invitationRequest.inviterId,
                        role: invitationRequest.role,
                        token: ''
                    });

                return resolve(invitation.token);
            } catch (error) {

                return reject(error);
            }
        })
    }

    checkEmailDisponibility(email: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {

                const exist: IAccount = await this._accountsComponent.getByEmail(email);
                //handle better
                if (exist) {
                    return resolve(false);
                }

                const invitation: IAccountInvite = await this._accountsComponent.getByEmail(email);

                //still on recerved;
                if (!invitation) {
                    return reject({ error: 'invalid invitation token', success: false });
                }

                if (invitation.expired) {
                    return reject({ error: 'invitation token expired', success: false });
                }

                return resolve(true);

            } catch (error) {
                return reject(error);
            }
        })
    }

    validateResetToken(token: string): Promise<import("c:/vagrant/tod_backend/src/dto/tod-response").TODResponse> {
        throw new Error("Method not implemented.");
    }

}
