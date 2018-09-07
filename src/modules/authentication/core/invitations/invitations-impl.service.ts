import { IAccountInvite } from "../../../../models/account-invite";
import { AbstractAccountInviteRepository } from "../../dao/repositories/account-invite.repositoty";
import { TaskHistoryMySqlDAO } from "../../../tasks/dao/my-sql/task-history-mysql.dao";
import { IInvitationService } from "./invitations.service.interface";


export class InvitationServiceImpl implements IInvitationService {


    constructor(private _invitationsRepository: AbstractAccountInviteRepository) { }

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
        throw new Error("Method not implemented.");
    }
    getInvitationByEmail(token: string): Promise<IAccountInvite> {
        throw new Error("Method not implemented.");
    }
}