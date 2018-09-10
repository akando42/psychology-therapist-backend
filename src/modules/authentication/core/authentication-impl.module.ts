import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAccount } from '../../../models/account';
import { INewAccountDTO } from '../../../dto/new-account.dto';
import { IUser } from '../../../models/user';
import { UsersRolEnum } from '../../../enums/users-rol.enum';
import { NewAccountVerificationTemplate } from '../../../email-templates/new-account-verification.template';
import { SendGridEmailServiceInstace } from '../../communication/email/sendgrid-email.service';
import { UnverifiedAccountError } from '../../../errors/unverfied-account.error';
import { InvalidCredentialsError } from '../../../errors/invalid-credentials.error';
import { IAccountInvite } from '../../../models/account-invite';
import { AccountsComponent } from './accounts/accounts.component';
import { AbstractAuthenticationModule } from './abstract-authentication.module';
import { InvitationsComponent } from './invitations/invitations.components';
import { TODResponse } from '../../../dto/tod-response';
import { AbstractUsersModule } from '../../users/core/users.module';
import { MySqlHealthServiceServicesConverter } from '../../health-services/converters/my-sql/my-sql-health-services.converter';

export class AuthenticationImplModule extends AbstractAuthenticationModule {

    constructor(
        _usersModule: AbstractUsersModule,
        _accountsComponent?: AccountsComponent,
        _invitationsComponent?: InvitationsComponent,
    ) {
        super(
            _usersModule,
            _accountsComponent,
            _invitationsComponent,
        );
    }


    inviteUser(invitationRequest: { email: string; role: UsersRolEnum; inviterId: number; }): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const invitation = await this._invitationsComponent.createInvitation(invitationRequest);
                const result: TODResponse = {
                    message: 'invitation sent',
                    payload: { success: true },
                    timestamp: new Date()
                }

                return resolve(result);

            } catch (error) {

            }
        })
    }

    signup(newAccount: INewAccountDTO): Promise<{ success: boolean, message: string, used: boolean }> {
        return new Promise(async (resolve, reject) => {
            try {

                const accountCreated = await this._accountsComponent.createAccountAndProfile(newAccount);

                const fullName: string = `${newAccount.profile.firstName}  ${newAccount.profile.lastName}`;
                const verificatinLink: string =
                    `http://localhost:3000/api/v1/authentication/verify-email?hash=${accountCreated.verificationHash}'`;

                const email = {

                    subject: 'Verification Mail | Massage On Demand',
                    body: new NewAccountVerificationTemplate(fullName, verificatinLink).getHtml()
                }

                //make comunication service
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
                if (!credentials.email || !credentials.password) {
                    return reject({ message: 'no credentials provided' });
                }

                const account: IAccount = await this._accountsComponent.getByEmail(credentials.email);
                //not match account
                if (!account) { return reject(new InvalidCredentialsError()); }
                //unverified account
                if (!account.emailVerified) { return reject(new UnverifiedAccountError()) }


                // const itsMatch: boolean = await bc.compare(credentials.password, account.password);

                // if (!itsMatch) {
                //     return reject({ auth: false, message: 'invalid credentials', token: null, userAccount: null });
                // }
                // sanatize
                account.password = undefined;
                account.verificationHash = undefined;

                const user: IUser = await this._usersModule.getUserById(account.userId)

                const token = jwt.sign(
                    { userId: account.userId },
                    process.env.SECRET_KEY, { expiresIn: 60000 });

                return resolve({
                    auth: true, token: token,
                    data: user, message: 'succesfully authenticated'
                });


            } catch (error) {
                reject(error);
            }
        });
    }

    changePassword(email: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const changeResult: any = await this._accountsComponent.changeAccountPassword(email, changeRequest);

                if (changeResult.success) {
                    // notify user by email or phone that password was changed
                }
                const result: TODResponse = {
                    message: 'password changed!',
                    payload: { success: true },
                    timestamp: new Date()
                }
                return resolve(result);

            } catch (error) {
                return reject({
                    message: 'password changed',
                    error: true,
                    timestamp: new Date().getTime()
                });
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

                const request = await this._accountsComponent.resetAccountPassword(email);

                return resolve({
                    message: 'Password reset',
                    payload: { success: true },
                    timestamp: new Date()
                })

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

                const request: any =
                    await this._accountsComponent.validateTokenAndChangePassword(token, newPassword);

                return resolve({ valid: true, message: 'password changed succefully' });
            } catch (error) {
                reject(error)
            }
        });
    }


}



