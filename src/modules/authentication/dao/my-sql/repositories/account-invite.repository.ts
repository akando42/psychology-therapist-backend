import { IResetPasswordRequest } from "../../../../../models/reset-password-request";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ResetPasswordRequestsConverterInstance } from "../../../converters/my-sql/reset-password-request.converter";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { AbstractCabinetInvitationRepository } from "../../../../admin/dao/repositories/cabinet-invitation.repositoty";
import { ICabinetInvitation } from "../../../../../models/cabinet-invitation";
import { MySqlCabinetInvitationConverter } from "../../../converters/my-sql/my-sql-account-invite.converter";



export class MySqlCabinetInvitationRepository extends AbstractCabinetInvitationRepository {
    constructor() {
        super(new GenericDao('CABINET_INVITATIONS'), new MySqlCabinetInvitationConverter());
    }

    getById(id: string): Promise<ICabinetInvitation> {
        return super.getBy(new GetByQuery({ CabinetInvitationID: id })
            .toDBQuery('CABINET_INVITATIONS'));
    }

    getByEmail(email: string): Promise<ICabinetInvitation> {
        return super.getBy(new GetByQuery({ CabinetInvitationEmail: email })
            .toDBQuery('CABINET_INVITATIONS'));
    }
    
    getInviteByToken(token: string): Promise<ICabinetInvitation> {
        return super.getBy(new GetByQuery({ CabinetInvitationToken: token })
            .toDBQuery('CABINET_INVITATIONS'));
    }
}
