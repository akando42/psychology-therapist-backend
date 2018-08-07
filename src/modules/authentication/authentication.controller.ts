import { IAccount } from "../../models/account";
import { AccountsServiceInstance } from "./sub-modules/accounts/accounts.service";
import * as bc from 'bcrypt';
import { AuthenticationService, AuthenticationServiceInstance } from "./authentication.service";
import { INewAccountDTO } from "../../dto/new-account.dto";
import { IUser } from "../../models/user";
import { UsersServiceInstance } from "../users/users.service";
import { UsersRolEnum } from "../../enums/users-rol.enum";


export class AuthenticationController {

    constructor(protected _authService: AuthenticationService) {
    }

    authenticate(credentials: { password: string, email: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const result: { token: string, auth: boolean, message: string, userAccount: IAccount | null } =
                    await this._authService.authenticate(credentials);
                //sugar
                const { auth, userAccount, token } = result;

                if (!auth) {
                    //throw error
                    reject(result);
                }
                /**
                 * Get the user attached to that account.
                 */
                const user: IUser = await UsersServiceInstance.getByEmail(userAccount.email);
                //send token and user back
                return resolve({ user: user, token: token });

            } catch (error) {

                resolve(error);
            }
        })
    }

    signup(account: INewAccountDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                //simple register set rol to user. before procced.
                account.userInfo.userRol = UsersRolEnum.user;

                const result: { success: boolean, message: string, used: boolean } = await this._authService.registerUser(account);

                return resolve(result);
            } catch (error) {
                //handle errors     properly here;

                resolve(error);
            }
        })
    }


}

export const AuthenticationControllerInstance: AuthenticationController = new AuthenticationController(AuthenticationServiceInstance)


