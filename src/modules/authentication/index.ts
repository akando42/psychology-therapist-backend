import { MySqlAccountsRepository } from "./dao/my-sql/repositories/my-sql-accounts.repository";
import { AccountsServiceImpl } from "./core/accounts/accounts-impl.service";
import { MySqlResetPasswordRequestRepository } from "./dao/my-sql/repositories/my-sql-reset-password-request.repository";
import { AccountsComponent } from "./core/accounts/accounts.component";
import { AuthenticationImplModule } from "./core/authentication-impl.module";
import { TODUsersModule, TODUserProfileService } from "../users";
import { AuthenticationRouter } from "./authentication.router";
import { TODCommunicationModuleInstance } from "../communication";
import { TODAdminModule, TODCabinetComponent, TODAdminProfileComponent } from "../admin";
import { TODHRprofilesComponent } from "../human-resources";


//repositories
const mysqlAccountsRepo = new MySqlAccountsRepository();
const mysqlResetPasswordRepo = new MySqlResetPasswordRequestRepository();

//services
const accountsService = new AccountsServiceImpl(mysqlAccountsRepo, mysqlResetPasswordRepo);
//components
const accountsComponent = new AccountsComponent(accountsService, TODUserProfileService);


const TODAuthenticationModule =
    new AuthenticationImplModule(
        TODUsersModule,
        accountsComponent,
        TODCabinetComponent,
        TODCommunicationModuleInstance,
        TODHRprofilesComponent,
        TODAdminModule,
        TODAdminProfileComponent);

export {
    TODAuthenticationModule,
    AuthenticationRouter
}