import { IResetPasswordRequest } from "../../../../../models/reset-password-request";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ResetPasswordRequestsConverterInstance } from "../../../converters/my-sql/reset-password-request.converter";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { AbstractAccountInviteRepository } from "../../repositories/account-invite.repositoty";
import { IAccountInvite } from "../../../../../models/account-invite";
import { MySqlAccountInviteConverter } from "../../../converters/my-sql/my-sql-account-invite.converter";



export class MySqlAccountInviteRepository extends AbstractAccountInviteRepository {
    constructor() {
        super(new GenericDao('CABINET_INVITATIONS'), new MySqlAccountInviteConverter());
    }

    getById(id: string): Promise<IAccountInvite> {
        return super.getBy(new GetByQuery({ AccountInviteID: id })
            .toDBQuery('CABINET_INVITATIONS'));
    }

    getByEmail(email: string): Promise<IAccountInvite> {
        return super.getBy(new GetByQuery({ AccountInviteEmail: email })
            .toDBQuery('CABINET_INVITATIONS'));
    }
    
    getInviteByToken(token: string): Promise<IAccountInvite> {
        return super.getBy(new GetByQuery({ AccountInviteToken: token })
            .toDBQuery('CABINET_INVITATIONS'));
    }
}
