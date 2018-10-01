
import { ICabinetInvitationService } from "./i-cabinet-invitation.service";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { AbstractCabinetInvitationRepository } from "../../dao/repositories/cabinet-invitation.repositoty";
import { isNullOrUndefined } from "util";

function generateInvitationToken(invitation: ICabinetInvitation): string {
    return `${invitation.email}-token`
}
export class CabinetInvitationsImplService implements ICabinetInvitationService {





    constructor(private _cabinetInvitationsRepo: AbstractCabinetInvitationRepository) { }


    async getCabinetInvitations(cabinetId: any): Promise<ICabinetInvitation[]> {
        if (isNullOrUndefined(cabinetId)) {
            throw { message: 'no cabinet id' }
        }
        console.log('atemptim to get cabinet', cabinetId)
        return await this._cabinetInvitationsRepo.getByCabinetId(cabinetId)
    }

    async createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation> {
        try {
            if (isNullOrUndefined(invitation)) {
                throw new Error('no invitation provided');
            }

            invitation.date = new Date().getTime();
            invitation.token = generateInvitationToken(invitation);
            invitation.expired = false;
            return await this._cabinetInvitationsRepo.create(invitation);

        } catch (error) {
            throw error;
        }

    }

    getInvitationById(invitationId: any): Promise<ICabinetInvitation> {
        return this._cabinetInvitationsRepo.getById(invitationId)
    }
    cancelInvitation(invitationId: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getInvitationByToken(token: any): Promise<ICabinetInvitation> {
        if (!token) {
            throw { message: 'no token provided' }
        }
        const invitation = await this._cabinetInvitationsRepo.getInvitationByToken(token);

        return invitation;
    }

}


