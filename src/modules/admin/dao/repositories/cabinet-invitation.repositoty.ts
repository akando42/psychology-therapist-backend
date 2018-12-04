
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";

export interface AbstractCabinetInvitationRepository {

    getByCabinetId(cabinetId: any): Promise<ICabinetInvitation[]>
    getInvitationByToken(token: string): Promise<ICabinetInvitation>

    getByEmail(email: string): Promise<ICabinetInvitation>
    getById(id: string): Promise<ICabinetInvitation>
    getByEmailAndRoleAndCabinet(email, role, cabinetId): Promise<ICabinetInvitation>;

    createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation>;

    deleteInvitation(invitationID:number):Promise<any>;
}