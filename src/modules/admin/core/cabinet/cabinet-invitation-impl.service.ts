
import { ICabinetInvitationService } from "./i-cabinet-invitation.service";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { AbstractCabinetInvitationRepository } from "../../dao/repositories/cabinet-invitation.repositoty";
import { isNullOrUndefined } from "util";
import { ComposeValidation, Validate } from "../../../../core/validations/validate.notation";
import { validateEmail, Required } from "../../../../core/validations/validation.function";

function generateInvitationToken(invitation: ICabinetInvitation): string {
    return `${invitation.email}-token`
}
export class CabinetInvitationsImplService implements ICabinetInvitationService {

    constructor(private _cabinetInvitationsRepo: AbstractCabinetInvitationRepository) { }


    async getCabinetInvitations(cabinetId: any): Promise<ICabinetInvitation[]> {
        if (isNullOrUndefined(cabinetId)) {
            throw { message: 'no cabinet id' }
        }

        return await this._cabinetInvitationsRepo.getByCabinetId(cabinetId)
    }

    @ComposeValidation([
        { index: 0, validators: [{ name: 'email', cb: validateEmail }] }])
    async createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation> {
        if (isNullOrUndefined(invitation)) {
            throw new Error('no invitation provided');
        }
        let exist = await
            this._cabinetInvitationsRepo
                .getByEmailAndRoleAndCabinet(invitation.email, invitation.role, invitation.cabinetId)

        if (!isNullOrUndefined(exist)) {
            throw { message: 'email already under invitation for this cabinet and role.' };
        }

        invitation.date = new Date().getTime();
        invitation.token = generateInvitationToken(invitation);
        invitation.expired = false;
        let invitationCreated = await this._cabinetInvitationsRepo.createInvitation(invitation);
        return invitationCreated;
    }

    getInvitationById(invitationId: any): Promise<ICabinetInvitation> {
        return this._cabinetInvitationsRepo.getById(invitationId)
    }

    cancelInvitation(invitationId: number): Promise<boolean> {
        return this._cabinetInvitationsRepo.deleteInvitation(invitationId)
    }

    @Validate([{ parameterIndex: 0, name: 'token', cb: Required }])
    async getInvitationByToken(token: any): Promise<ICabinetInvitation> {

        const invitation = await this._cabinetInvitationsRepo.getInvitationByToken(token);

        return invitation;
    }

}


