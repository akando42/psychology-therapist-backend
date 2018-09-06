import { UsersRolEnum } from "../../../enums/users-rol.enum";


export class AuthService {

    static authenticate(credentials: { password: string, email: string }): Promise<any> {
        // return AuthenticationControllerInstance.authenticate(credentials);
        return null;
    }

    static invite(invite: { email: string, role: UsersRolEnum, inviterId: number }): Promise<any> {
        // return AuthenticationControllerInstance.inviteUser(invite);
        return null;
    }


}