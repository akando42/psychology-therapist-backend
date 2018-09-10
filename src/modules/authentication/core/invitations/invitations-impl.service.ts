import { IAccountInvite } from "../../../../models/account-invite";
import { AbstractAccountInviteRepository } from "../../dao/repositories/account-invite.repositoty";
import { IInvitationService } from "./invitations.service.interface";



export class InvitationServiceImpl implements IInvitationService {


    constructor(private _invitationsRepository: AbstractAccountInviteRepository) { }

    async checkEmailDisponibility(email: string): boolean {
        try {
            //todo validate email;     
            const invitation: IAccountInvite = await this._invitationsRepository.getByEmail(email);
            if (invitation) {
                return false;
            }
            if (invitation.expired) {
                return true;
            }
            return true;
        } catch (error) {
            throw error
        }

    }

    getInvitationByToken(token: string): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {
            try {

                //get from repository
                const invitation: IAccountInvite = await this._invitationsRepository.getInviteByToken(token);

                return resolve(invitation);
            } catch (error) {

                return reject(error);
            }
        });

    }

    createInvitation(invitation: IAccountInvite): Promise<IAccountInvite> {
        return new Promise<IAccountInvite>(async (resolve, reject) => {
            try {
                //todo validations here

                const invitationCreated = await this._invitationsRepository.create(invitation);

                return resolve(invitationCreated)

            } catch (error) {
                return reject(error);
            }
        })
    }
    getInvitationByEmail(email: string): Promise<IAccountInvite> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                //todo validate email   
                const invitation = await this._invitationsRepository.getByEmail(email);
                return resolve(invitation);
            } catch (error) {
                return reject(error);
            }
        });
    }
}