import { IAccount } from "../../models/account";
import { AccountsServiceInstance } from "./sub-modules/accounts/accounts.service";
import * as bc from 'bcrypt';


export class AuthenticationController {

    constructor() {
    }

    authenticate(credentials: { password: string, email: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {



                resolve()

            } catch (error) {

                resolve(error);
            }
        })
    }

    signup(account: IAccount): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

               
                } catch (error) {
                //handle errors properly here;

                resolve(error);
            }
        })
    }


}


export const AuthenticationControllerInstance: AuthenticationController = new AuthenticationController();


