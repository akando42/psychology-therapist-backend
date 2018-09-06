import { IAccountInvite } from "../../../../models/account-invite";



export interface IInvitationService {

    getInvitationByToken(token: string): Promise<IAccountInvite>;
}