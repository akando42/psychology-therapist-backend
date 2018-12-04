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
import { ISuperAdminRepository } from "../../repositories/super-admin.repository";

const propsMap = {
    id: 'SuperAdminID',
    userId: 'UserID'
}

@ByNameRepository('SUPER_ADMIN_PROFILE', {
    converterProps: propsMap,
    primaryKey: 'SuperAdminID',
    resourceName: 'SuperAdminProfile',
    create: { return: true, primaryKey: 'AdminInvitationID' }
})
export class MySqlSuperAdminProfileRepository implements ISuperAdminRepository {

    getSuperAdminProfileByUserId(userId: any): Promise<any> { return null; }

}