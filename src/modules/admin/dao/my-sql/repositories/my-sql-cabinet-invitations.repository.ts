import { AbstractCabinetInvitationRepository } from "../../repositories/cabinet-invitation.repositoty";
import { ICabinetInvitation } from "../../../../../models/cabinet-invitation";
import { Repository } from "../../../../../core/repositories/repositoy.notation";
import { GetByQuery } from "../../../../../core/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../core/converters/converter.notation";
import { CreateQuery } from "../../../../../core/queries/my-sql/create-query.notation";
import { DeleteQuery } from "../../../../../core/queries/my-sql/delete-query.notation";

const propsMap = {
    cabinetId: 'CabinetID',
    date: 'CabinetInvitationDate',
    email: 'CabinetInvitationEmail',
    expired: 'CabinetInvitationExpired',
    id: 'CabinetInvitationID',
    inviterId: 'CabinetInvitationInviterID',
    role: 'CabinetInvitationRole',
    token: 'CabinetInvitationToken'

}

@Repository('CABINET_INVITATIONS')
export class MySqlCabinetInvitationsRepository implements AbstractCabinetInvitationRepository {


    @Convert(propsMap, true)
    @GetByQuery({ CabinetID: 0 })
    getByCabinetId(cabinetId: number): Promise<ICabinetInvitation[]> { return null; }

    @Convert(propsMap)
    @GetByQuery({ CabinetInvitationToken: 0 })
    getInvitationByToken(token: string): Promise<ICabinetInvitation> { return null; }

    @Convert(propsMap)
    @GetByQuery({ CabinetInvitationEmail: 0 })
    getByEmail(email: string): Promise<ICabinetInvitation> { return null; }

    @Convert(propsMap)
    @GetByQuery({ CabinetInvitationID: 0 })
    getById(id: any): Promise<ICabinetInvitation> { return null; }

    @Convert(propsMap)
    @GetByQuery({ CabinetInvitationEmail: 0, CabinetInvitationRole: 1, CabinetID: 2 })
    getByEmailAndRoleAndCabinet(email: any, role: any, cabinetId: any): Promise<ICabinetInvitation> { return null; }

    @CreateQuery({ return: true, primary: 'CabinetInvitationID' }, propsMap)
    createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation> { return null; }

    @DeleteQuery({CabinetInvitationID:0})
    deleteInvitation(invitationID: number): Promise<any> { return null; }
}