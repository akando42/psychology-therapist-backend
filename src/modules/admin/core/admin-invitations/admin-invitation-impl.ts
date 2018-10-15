import * as bc from 'bcrypt';
import { IAdminInvitationService } from "./admin-invitations.service";
import { IAdminInvitation } from "../../../../models/admin-invitation";
import { IAdminInvitationsRepository } from "../../dao/repositories/admin-invitation.repository";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { validateEmail } from "../../../../core/validations/validation.function";
import { InvitationStatusEnum } from '../../../../enums/invitation-status.enum';



export class AdminInvitationImplService implements IAdminInvitationService {

    constructor(private _invitationsRepository: IAdminInvitationsRepository) {

    }

    @ComposeValidation([{
        index: 0, validators: [
            { name: 'email', cb: validateEmail }
        ]
    }])
    async createAdminInvitation(invitation: IAdminInvitation): Promise<IAdminInvitation> {

        //generate token
        invitation.date = new Date().getTime();
        invitation.token = bc.hashSync(JSON.stringify({ email: invitation.email, date: invitation.date }), 10)
        invitation.status = 'pending'
        const createdInvitation = await this._invitationsRepository.createAdminInvitation(invitation);
        return createdInvitation;

    }
    async verifyAdminInvitation(token: string): Promise<IAdminInvitation> {

        const invitation = await this._invitationsRepository.getInvitationByToken(token);
        switch (invitation.status) {
            case InvitationStatusEnum.CANCELED:
                throw { message: 'invalid token invitation canceled' };
            case InvitationStatusEnum.USED:
                //alert someone its trying to use a old invitation token
                throw { message: 'invalid token already used' };
            default:

                return invitation;
               
        }
    }


}