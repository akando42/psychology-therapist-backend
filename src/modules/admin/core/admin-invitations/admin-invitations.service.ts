import { IAdminInvitation } from "../../../../models/admin-invitation";

export interface IAdminInvitationService {

    createAdminInvitation(invitation: IAdminInvitation): Promise<IAdminInvitation>;

    verifyAdminInvitation(token: string): Promise<IAdminInvitation>;
}