import { AuthenticationModule } from "./authentication.module";
import { AccountsComponent } from "./core/accounts/accounts.component";
import { AccountsServiceImpl } from "./accounts-impl.service";
import { MySqlAccountsRepositoryInstance } from "./dao/my-sql/repositories/my-sql-accounts.repository";
import { MySqlAccountInviteRepositoryInstance } from "./dao/my-sql/repositories/account-invite.repository";
import { MySqlResetPasswordRequestRepositoryInstance } from "./dao/my-sql/repositories/reset-password-request.repository";
import { MySqlUsersRepository } from "../users/dao/repositories/my-sql-users.repository";




// export function buildBasicTODAuthenticationModule(): AuthenticationModule {
//     const module = new AuthenticationModule(
//         new AccountsComponent(new AccountsServiceImpl(MySqlAccountsRepositoryInstance)),
//         MySqlAccountInviteRepositoryInstance,
//         MySqlResetPasswordRequestRepositoryInstance,
//         MySql
//     );

//     return module;
// }