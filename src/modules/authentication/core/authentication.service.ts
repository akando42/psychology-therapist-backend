import { INewAccountDTO } from "../../../dto/new-account.dto";
import { IResetPasswordRequest } from "../../../models/reset-password-request";
import { UsersRolEnum } from "../../../enums/users-rol.enum";


export interface IAuthenticationService {


    registerUser(newAccount: INewAccountDTO): Promise<{ success: boolean, message: string, used: boolean }>;

    authenticate(credentials: { password: string, email: string }): Promise<any>;

    changePassword(email: string, changeRequest: { newPassword: string, oldPassword: string }): Promise<any>;

    verifyEmail(email: string, verificationToken: string): Promise<any>;

    resetPassword(email: string): Promise<IResetPasswordRequest>;

    
    signUpWithInvite(inviteToken: string, newAccount: INewAccountDTO): Promise<any>;

    validateTokenAndReset(token: string, newPassword: string): Promise<{ message: string, valid: boolean }>;


    createInvitationToken(invitationRequest: { email: string, role: UsersRolEnum, inviterId: number }): Promise<string>;

    checkEmailDisponibility(email: string): Promise<boolean>;

}