import { UsersControllerInstance } from "../../users/users.controller";
import { IUser } from "../../../models/user";
import { AuthenticationControllerInstance } from "../../authentication/authentication.controller";
import { INewAccountDTO } from "../../../dto/new-account.dto";


export class AuthService {

    static authenticate(credentials: { password: string, email: string }): Promise<any> {
        return AuthenticationControllerInstance.authenticate(credentials);
    }

    static signUp(newAccount: INewAccountDTO): Promise<any> {
        return AuthenticationControllerInstance.signup(newAccount);
    }


}