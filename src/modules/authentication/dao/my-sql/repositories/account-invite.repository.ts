import { IResetPasswordRequest } from "../../../../../models/reset-password-request";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ResetPasswordRequestsConverterInstance } from "../../../converters/my-sql/reset-password-request.converter";
import { AbstractResetPasswordRequestRepository } from "../../repositories/reset-passwod-request.repositoty.interface";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { AbstractAccountInviteRepository } from "../../repositories/account-invite.repositoty";
import { IAccountInvite } from "../../../../../models/account-invite";
import { AccountsInviteConverterInstance } from "../../../converters/my-sql/account-invite.converter";



export class MySqlAccountInviteRepository extends AbstractAccountInviteRepository {
    constructor(dao, converter?) {
        super(dao, converter);
    }

    getInviteByToken(token: string): Promise<IAccountInvite> {
        return super.getBy(new GetByQuery({ ResetPasswordRequestToken: token })
            .toDBQuery('CABINET_INVITE'));
    }
}


export const MySqlAccountInviteRepositoryInstance: MySqlAccountInviteRepository
    = new MySqlAccountInviteRepository(
        new GenericDao('CABINET_INVITE'),
        AccountsInviteConverterInstance);