import { IAccountInvite } from "../../../../models/account-invite";
import { IInvitationService } from "./invitations.service";




export class InvitationsComponent {
    constructor(private _invitationService: IInvitationService) {

    }


    createInvitation(invitation: IAccountInvite): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {

        })
    }

    validateInvitation(inviteToken: string): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {
            try {

                const invitation: IAccountInvite =
                    await this._invitationService.getInvitationByToken(inviteToken);
                //no token 
                if (!invitation) {
                    return reject({ message: 'invalid invite token', success: false });
                }
                //Token already has expired
                if (invitation.expired) {
                    return reject({ message: 'invite token expired', success: false });
                }
                return resolve(invitation);
            } catch (error) {
                return reject(error);
            }
        })
    }
}