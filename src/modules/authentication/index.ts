import { MySqlAccountsRepository } from "./dao/my-sql/repositories/my-sql-accounts.repository";
import { MySqlAccountInviteRepository } from "./dao/my-sql/repositories/account-invite.repository";
import { AccountsServiceImpl } from "./core/accounts/accounts-impl.service";
import { MySqlResetPasswordRequestRepository } from "./dao/my-sql/repositories/my-sql-reset-password-request.repository";
import { AccountsComponent } from "./core/accounts/accounts.component";
import { InvitationsComponent } from "./core/invitations/invitations.components";
import { InvitationServiceImpl } from "./core/invitations/invitations-impl.service";
import { AuthenticationImplModule } from "./core/authentication-impl.module";
import { TODUsersModule, usersComponent } from "../users";
import { AuthenticationRouter } from "./authentication.router";
import { TODCommunicationModuleInstance } from "../communication";
import { TODAdminModule } from "../admin";
import { TODHumanResourcesModule } from "../human-resources";


//repositories
const mysqlAccountsRepo = new MySqlAccountsRepository();
const mysqlResetPasswordRepo = new MySqlResetPasswordRequestRepository();
const mysqlAccountInviteRepo = new MySqlAccountInviteRepository();

//services
const accountsService = new AccountsServiceImpl(mysqlAccountsRepo, mysqlResetPasswordRepo);
const invitationsService = new InvitationServiceImpl(mysqlAccountInviteRepo);
//components
const accountsComponent = new AccountsComponent(accountsService, invitationsService, usersComponent);
const invitationsComponent = new InvitationsComponent(invitationsService, accountsService, usersComponent);


const TODAuthenticationModule =
    new AuthenticationImplModule(
        TODUsersModule,
        accountsComponent,
        invitationsComponent,
        TODCommunicationModuleInstance,
        TODHumanResourcesModule,
        TODAdminModule);

export {
    TODAuthenticationModule,
    AuthenticationRouter
}