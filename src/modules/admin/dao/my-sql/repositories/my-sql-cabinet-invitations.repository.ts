import { AbstractCabinetInvitationRepository } from "../../repositories/cabinet-invitation.repositoty";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { ICabinetInvitation } from "../../../../../models/cabinet-invitation";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { ICabinetInvitationMySql } from "../models/cabinet-invitation-my-sql";
import { MySqlCabinetInvitationsConverter } from "../../../converters/my-sql/my-sql-cabinet-invitation.converter";


export class MySqlCabinetInvitationsRepository extends AbstractCabinetInvitationRepository {
    constructor() {
        super(new GenericDao('CABINET_INVITATIONS'), new MySqlCabinetInvitationsConverter());
    }

    getByCabinetId(cabinetId: number): Promise<ICabinetInvitation[]> {
        return super.getAllBy(
            new GetByQuery(<ICabinetInvitationMySql>{ CabinetID: cabinetId })
                .toDBQuery('CABINET_INVITATIONS'))
    }

    getInviteByToken(token: string): Promise<ICabinetInvitation> {
        throw new Error("Method not implemented.");
    }
    getByEmail(email: string): Promise<ICabinetInvitation> {
        throw new Error("Method not implemented.");
    }
    getById(id: any): Promise<ICabinetInvitation> {
        return super.getBy(
            new GetByQuery(<ICabinetInvitationMySql>{ CabinetInvitationID: id })
                .toDBQuery('CABINET_INVITATIONS'))
    }


}