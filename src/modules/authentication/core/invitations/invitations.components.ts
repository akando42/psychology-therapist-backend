import * as bc from 'bcrypt';
import { IAccountInvite } from "../../../../models/account-invite";
import { IInvitationService } from "./invitations.service.interface";
import { IAccountsService } from "../accounts/accounts.service.interface";
import { IAccount } from "../../../../models/account";
import * as crypto from 'crypto';

export class InvitationsComponent {
    constructor(
        private _invitationService: IInvitationService,
        private _accountsService: IAccountsService) {

    }


    createInvitation(invitation: IAccountInvite): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {
            try {
                //check that email its not already on account.
                const disponibility = await this.checkEmailDisponibility(invitation.email);
                if (!disponibility) {
                    return reject({ error: 'email already on use' });
                }

                const inv: IAccountInvite = {
                    date: new Date().getTime(),
                    email: invitation.email,
                    expired: false,
                    inviterId: invitation.inviterId,
                    role: invitation.role,
                    token: this._generateInviteToken(invitation)
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
                if (!inviteToken) {
                    return reject({ message: 'no invitation token provided' })
                }

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

    checkEmailDisponibility(email: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {

                const exist: IAccount = await this._accountsService.getByEmail(email);
                //handle better
                if (exist) {
                    return resolve(false);
                }
                const invitation: IAccountInvite = await this._invitationService.getInvitationByEmail(email);
                //still on recerved;

                if (invitation) {
                    return resolve(invitation.expired);
                }

                // agregar el cc bcc a los correos investigar q es

                return resolve(true);

            } catch (error) {
                return reject(error);
            }
        });
    }

    //move password for encrypt
    private _generateInviteToken(inv: IAccountInvite): string {
        const token = crypto.createHmac('sha256', 'mypassword')
            .update(JSON.stringify({ email: inv.email, inviter: inv.inviterId }))
            .digest('hex');

        return token;
    }
}