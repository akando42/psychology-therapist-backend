import { IAccountInvite } from "../../../../models/account-invite";
import { IInvitationService } from "./invitations.service.interface";
import { IAccountsService } from "../accounts/accounts.service.interface";
import { IAccount } from "../../../../models/account";


// Sorry, we are not able to process your request. Please try again later.


export class InvitationsComponent {
    constructor(
        private _invitationService: IInvitationService,
        private _accountsService: IAccountsService) {

    }


    createInvitation(invitation: IAccountInvite): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {
            try {

                const exist: IAccount = await this._accountsService.getByEmail(invitation.email);
                console.log('exist compoenent invi',exist)
                //check that its not a email on use.
                if (exist) {
                    return reject({ message: 'email already on use', success: false });
                }

                const inv: IAccountInvite = {
                    date: new Date().getTime(),
                    email: invitation.email,
                    expired: false,
                    inviterId: invitation.inviterId,
                    role: invitation.role,
                    token: this._generateInviteToken()
                };
                const invitationCreated: IAccountInvite =
                 await this._invitationService.createInvitation(inv);

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

    private _generateInviteToken(): string {
        return '';
    }
}