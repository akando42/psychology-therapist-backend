
import { IResetPasswordRequest } from "../../../../models/reset-password-request";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAccountInvite } from "../../../../models/account-invite";


export abstract class AbstractAccountInviteRepository extends AbstractRepository<IAccountInvite> {
    constructor(dao, converter) {
        super(dao, converter);
    }

    abstract getInviteByToken(token: string): Promise<IAccountInvite>

    abstract getByEmail(email: string): Promise<IAccountInvite>
    abstract getById(id: string): Promise<IAccountInvite>

}