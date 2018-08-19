import { AuthenticationService, AuthenticationServiceInstance } from "./authentication.service";
import { IAccount } from "../../../../models/account";
import { IUser } from "../../../../models/user";
import { AccountStatusEnum } from "../../../../enums/account-stats.enum";
import { UsersService } from "../../feight-clients/users.service";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { AuthService } from "../../feight-clients/auth.service";


export class AuthenticationController {

    constructor(private _authService?: AuthenticationService) {
        this._authService = AuthenticationServiceInstance;
    }

    authenticate(credentials: { password: string, email: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const { user, token } = await AuthService.authenticate(credentials);

                /**
                 * Get the user attached to that account.
                 */
                //send token and user back
                return resolve({ user: user, token: token });

            } catch (error) {
                reject(error);
            }
        })
    }

    signup(account: INewAccountDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const result: { success: boolean, message: string, used: boolean } = await
                    this._authService.registerUser(account);

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

    changePassword(creds: any): Promise<any> {
        return this._authService.changePassword(creds.email, creds)
    }

}



