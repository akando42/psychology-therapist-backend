import { IAccount } from "../../../models/account";
import * as bc from 'bcrypt';
import { INewAccountDTO } from "../../../dto/new-account.dto";
import { IUser } from "../../../models/user";
import { AccountStatusEnum } from "../../../enums/account-stats.enum";
import { TODResponse } from "../../../dto/tod-response";
import { IResetPasswordRequest } from "../../../models/reset-password-request";
import { EmailService } from "../../../behavior/services/email.service";
import { NoAccountHolderResetTemplate } from "../../../email-templates/no-account-holder-reset.template";
import { ResetPasswordTemplate } from "../../../email-templates/reset-password.template";
import { UsersRolEnum } from "../../../enums/users-rol.enum";
import { InvitationEmailTemplate } from "../../../email-templates/invitation-email.template";
import { IUserService } from "../../users/core/users.service";
import { IAuthenticationService } from "./authentication.service";
import { AccountsComponent } from "./accounts/accounts.component";
import { InvitationsComponent } from "./invitations/invitations.components";


export abstract class AbstractAuthenticationModule {

    constructor(
        protected _accountsComponent?: AccountsComponent,
        protected _invitationsComponent?: InvitationsComponent,
        protected _usersComponent?: IUserService,
        private _emailService?: EmailService,
    ) {
    }

    init(): AbstractAuthenticationModule {

        return this;
    }
    

    abstract authenticate(credentials: { password: string, email: string }): Promise<any>

    abstract signup(account: INewAccountDTO): Promise<any>

    abstract verifyEmail(email: string, verificationToken: string): Promise<any>

    abstract changePassword(email: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<any>

    abstract resetPassword(email: string): Promise<TODResponse>

    abstract signUpWithInvitation(invitationToken: string, newAccount: INewAccountDTO): Promise<TODResponse>

    abstract inviteUser(invitationRequest: { email: string, role: UsersRolEnum, inviterId: number }): Promise<TODResponse>

    //remove maybe?
    abstract validateResetToken(token: string): Promise<TODResponse>

}
