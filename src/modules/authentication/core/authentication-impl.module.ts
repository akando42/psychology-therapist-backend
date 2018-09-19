import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IAccount } from '../../../models/account';
import { INewAccountDTO } from '../../../dto/new-account.dto';
import { IUser } from '../../../models/user';
import { UsersRolEnum } from '../../../enums/users-rol.enum';
import { NewAccountVerificationTemplate } from '../../../email-templates/new-account-verification.template';
import { UnverifiedAccountError } from '../../../errors/unverfied-account.error';
import { InvalidCredentialsError } from '../../../errors/invalid-credentials.error';
import { AccountsComponent } from './accounts/accounts.component';
import { AbstractAuthenticationModule } from './abstract-authentication.module';
import { InvitationsComponent } from './invitations/invitations.components';
import { TODResponse } from '../../../dto/tod-response';
import { AbstractUsersModule } from '../../users/core/users.module';
import { AbtractCommunicationModule } from '../../communication/core/comunication.module';
import { InvitationEmailTemplate } from '../../../email-templates/invitation-email.template';
import { AbstractHumanResourcesModule } from '../../human-resources/core/abstract-human-resources.module';
import { isNullOrUndefined } from 'util';
import { AbstractAdminModule } from '../../admin/core/abstract-admin.module';

export class AuthenticationImplModule extends AbstractAuthenticationModule {

    constructor(
        _usersModule: AbstractUsersModule,
        _accountsComponent: AccountsComponent,
        _invitationsComponent: InvitationsComponent,
        _communicationModule: AbtractCommunicationModule,
        _humanResourcesModule: AbstractHumanResourcesModule,
        _adminModule: AbstractAdminModule,

    ) {
        super(
            _usersModule,
            _accountsComponent,
            _invitationsComponent,
            _communicationModule,
            _humanResourcesModule,
            _adminModule
        );
    }


    inviteUser(invitationRequest: { email: string; role: UsersRolEnum; inviterId: number; }): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const invitation = await this._invitationsComponent.createInvitation(invitationRequest);

                const link = `http://localhost:4200/invite/${invitation.token}`
                console.log('link', link);

                this._communicationModule.sendEmailToOne(invitationRequest.email,
                    {
                        body: new InvitationEmailTemplate(link).getHtml(),
                        subject: 'verification '
                    });

                const result: TODResponse = {
                    message: 'invitation sent',
                    payload: { success: true },
                    timestamp: new Date()
                }

                return resolve(result);

            } catch (error) {
                console.log(error);
                return reject(error)
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
                // SendGridEmailServiceInstace.sentToOne(accountCreated.email, email)
                //     .then(console.log)
                //     .catch(console.log)
                // })


                //success resolve.
                resolve({ success: true, message: 'Account registed', used: false });
            } catch (e) {
                console.log(e)
                return reject(e)

            }
        })
    }

    authenticate(credentials: { password: string, email: string }, role: string = "admin"): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

                //authenticate
                const account = await this._accountsComponent.authenticateAccount(credentials);

                //get user account
                const user: IUser = await this._usersModule.getUserById(account.userId)
                let roleProfile = null;
                if (role) {
                    switch (role) {
                        case 'hr':
                            roleProfile = await this._humanResourcesModule.getHRAgentProfile(user.id);
                            break;

                        default:
                            console.log('admin')
                            roleProfile = await this._adminModule.getAdminProfile(user.id);
                            break;
                    }
                }

                if (isNullOrUndefined(roleProfile)) {
                    return reject({ error: 'you have no such a role on the platform' });
                }

                const token = jwt.sign(
                    { userId: account.userId },
                    process.env.SECRET_KEY, { expiresIn: 60000 });

                return resolve({
                    auth: true, token: token,
                    data: { user: user, roleProfile: roleProfile.payload, role: role }, message: 'succesfully authenticated'
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

    verifyEmail(verificationToken: string): Promise<any> {
        return this._accountsComponent.verifyAccountEmail(verificationToken);
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
                const account: any = await this._invitationsComponent.signupInvited(inviteToken, newAccount);

                const result: TODResponse = {
                    message: 'succefully registered',
                    payload: { success: true },
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: 'Something when wrong sorry',
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult);
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



