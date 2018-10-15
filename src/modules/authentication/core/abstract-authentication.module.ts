import { IAccount } from "../../../models/account";
import { INewAccountDTO } from "../../../dto/new-account.dto";
import { TODResponse } from "../../../dto/tod-response";
import { EmailService } from "../../../core/services/email.service";
import { UsersRolEnum } from "../../../enums/users-rol.enum";
import { AccountsComponent } from "./accounts/accounts.component";
import { AbstractUsersModule } from "../../users/core/users.module";
import { AbtractCommunicationModule } from "../../communication/core/comunication.module";
import { AbstractHumanResourcesModule } from "../../human-resources/core/abstract-human-resources.module";
import { AbstractAdminModule } from "../../admin/core/abstract-admin.module";
import { CabinetComponent } from "../../admin/core/cabinet/cabinet.component";
import { HRProfilesComponent } from "../../human-resources/core/hr-profile/hr-profiles.component";
import { AdminProfilesComponent } from "../../admin/core/admin-profile/admin-profiles.component";
import { AdminInvitationComponent } from "../../admin/core/admin-invitations/admin-invitations.component";
import { ProviderProfileComponent } from "../../providers/core/provider-profile/provider.profile.component";


export abstract class AbstractAuthenticationModule {

    constructor(
        protected _usersModule?: AbstractUsersModule,
        protected _accountsComponent?: AccountsComponent,
        protected _cabinetComponent?: CabinetComponent,
        protected _communicationModule?: AbtractCommunicationModule,
        protected _hrProfileComponent?: HRProfilesComponent,
        protected _adminModule?: AbstractAdminModule,
        protected _adminComponent?: AdminProfilesComponent,
        protected _adminInvitationComponent?: AdminInvitationComponent,
        protected _providerProfileComponent?: ProviderProfileComponent
    ) {
    }

    init(): AbstractAuthenticationModule {
        console.log(this)
        return this;
    }


    abstract authenticate(credentials: { password: string, email: string }, role?: string): Promise<any>;

    abstract signup(account: INewAccountDTO): Promise<any>;

    abstract verifyEmail(email: string, verificationToken: string): Promise<any>;

    abstract changePassword(email: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<any>;

    abstract resetPassword(email: string): Promise<TODResponse>;

    abstract signUpWithInvitation(inviteToken: string, newAccount: INewAccountDTO): Promise<any>;

    abstract signUpWithInvitation(invitationToken: string, newAccount: INewAccountDTO): Promise<TODResponse>;

}
