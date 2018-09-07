import { IAccountInvite } from "../../../../models/account-invite";
import { AbstractAccountInviteRepository } from "../../dao/repositories/account-invite.repositoty";
import { TaskHistoryMySqlDAO } from "../../../tasks/dao/my-sql/task-history-mysql.dao";


export class InvitationServiceImpl {

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
}