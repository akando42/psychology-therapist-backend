import { IAccount } from "../../models/account";
import { AccountsServiceInstance } from "./sub-modules/accounts/accounts.service";
import * as bc from 'bcrypt';
import { AuthenticationService, AuthenticationServiceInstance } from "./authentication.service";
import { INewAccountDTO } from "../../dto/new-account.dto";
import { IUser } from "../../models/user";
import { UsersServiceInstance } from "../users/users.service";
import { UsersRolEnum } from "../../enums/users-rol.enum";
import { AccountStatusEnum } from "../../enums/account-stats.enum";


export class AuthenticationController {

    constructor(protected _authService: AuthenticationService) {
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
                console.log(result)
                return resolve(result);
            } catch (error) {
                //handle errors     properly here;
                // console.log(error);
                reject(error);
            }
        })
    }

    verifyEmail(email: string, verificationToken: string): Promise<any> {
        return this._authService.verifyEmail(email, verificationToken)
    }

    // changePassword(creds: any): Promise<any> {
    //     return this._authService.changePassword()
    // }

}

export const AuthenticationControllerInstance: AuthenticationController = new AuthenticationController(AuthenticationServiceInstance)


