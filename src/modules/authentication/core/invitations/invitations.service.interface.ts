import { IAccountInvite } from "../../../../models/account-invite";



export interface IInvitationService {

    createInvitation(invitation: IAccountInvite): Promise<IAccountInvite>;

    getInvitationByEmail(token: string): Promise<IAccountInvite>;

    getInvitationByToken(token: string): Promise<IAccountInvite>;

    checkEmailDisponibility(email: string): boolean;
}