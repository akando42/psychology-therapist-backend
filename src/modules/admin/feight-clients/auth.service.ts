import { UsersControllerInstance } from "../../users/users.controller";
import { IUser } from "../../../models/user";
import { AuthenticationControllerInstance } from "../../authentication/authentication.controller";
import { INewAccountDTO } from "../../../dto/new-account.dto";
import { UsersRolEnum } from "../../../enums/users-rol.enum";


export class AuthService {

    static authenticate(credentials: { password: string, email: string }): Promise<any> {
        return AuthenticationControllerInstance.authenticate(credentials);
    }

    static invite(invite: { email: string, role: UsersRolEnum, inviterId: number }): Promise<any> {
        return AuthenticationControllerInstance.inviteUser(invite);
    }


}