import { ICabinetInvitation } from "../../../../models/cabinet-invitation";


export interface ICabinetInvitationService {

    createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation>;

    cancelInvitation(invitationId: any): Promise<boolean>;
}