
import { ICabinetInvitationService } from "./i-cabinet-invitation.service";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { AbstractCabinetInvitationRepository } from "../../dao/repositories/cabinet-invitation.repositoty";

export class CabinetInvitationsImplService implements ICabinetInvitationService {


    constructor(private _cabinetRepository: AbstractCabinetInvitationRepository) { }

    createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation> {
        throw new Error("Method not implemented.");
    }
    cancelInvitation(invitationId: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}


