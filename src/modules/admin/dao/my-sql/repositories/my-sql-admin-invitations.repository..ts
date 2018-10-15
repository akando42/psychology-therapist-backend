import { AbstractCabinetInvitationRepository } from "../../repositories/cabinet-invitation.repositoty";
import { ICabinetInvitation } from "../../../../../models/cabinet-invitation";
import { Repository } from "../../../../../core/repositories/repositoy.notation";
import { GetByQuery } from "../../../../../core/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../core/converters/converter.notation";
import { CreateQuery } from "../../../../../core/queries/my-sql/create-query.notation";
import { DeleteQuery } from "../../../../../core/queries/my-sql/delete-query.notation";
import { IAdminInvitationsRepository } from "../../repositories/admin-invitation.repository";
import { IAdminInvitation } from "../../../../../models/admin-invitation";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMap = {
    id: 'AdminInvitationID',
    date: 'AdminInvitationDate',
    email: 'AdminInvitationEmail',
    token: 'AdminInvitationToken',
    status: 'AdminInvitationStatus',

}

@ByNameRepository('Admin_Invitation', {
    converterProps: propsMap,
    primaryKey: 'AdminInvitationID',
    resourceName: 'AdminInvitation',
    create: { return: true, primaryKey: 'AdminInvitationID' }
})
export class MySqlAdminInvitationsRepository implements IAdminInvitationsRepository {

    createAdminInvitation(invitation: IAdminInvitation): Promise<IAdminInvitation> {
        return null;
    }
    getInvitationByEmail(email: string): Promise<IAdminInvitation> {
        return null;
    }
    getInvitationByToken(token: string): Promise<IAdminInvitation> {
        return null;
    }
}