import { ICabinetInvitation } from "../../../../models/cabinet-invitation";


export interface ICabinetInvitationService {

    getCabinetInvitations(cabinetId: any): Promise<ICabinetInvitation[]>;

    createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation>;

    cancelInvitation(invitationId: any): Promise<boolean>;

    getInvitationById(invitationId: any): Promise<ICabinetInvitation>;
}