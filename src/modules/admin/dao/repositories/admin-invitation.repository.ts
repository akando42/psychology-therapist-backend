import { IAdminInvitation } from "../../../../models/admin-invitation";

export interface IAdminInvitationsRepository {

    createAdminInvitation(invitation: IAdminInvitation): Promise<IAdminInvitation>;

    getInvitationByEmail(email: string): Promise<IAdminInvitation>;

    getInvitationByToken(token: string): Promise<IAdminInvitation>;


}