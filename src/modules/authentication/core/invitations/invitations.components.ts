import { IAccountInvite } from "../../../../models/account-invite";
import { IInvitationService } from "./invitations.service.interface";
import { IAccountsService } from "../accounts/accounts.service.interface";


// Sorry, we are not able to process your request. Please try again later.


export class InvitationsComponent {
    constructor(
        private _invitationService: IInvitationService,
        private _accountsService?: IAccountsService) {

    }


    createInvitation(invitation: IAccountInvite): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {
            try {
                const invitationCreated: IAccountInvite = await this._invitationService.createInvitation(invitation);

                return resolve(invitationCreated);

            } catch (error) {
                return reject(error);
            }
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