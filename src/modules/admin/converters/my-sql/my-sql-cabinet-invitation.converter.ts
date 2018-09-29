import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { ICabinetInvitationMySql } from "../../dao/my-sql/models/cabinet-invitation-my-sql";


export class MySqlCabinetInvitationsConverter implements IDualConverter<ICabinetInvitation, ICabinetInvitationMySql> {
    converDomainToDBModel(raw: ICabinetInvitation): ICabinetInvitationMySql {
        if (!raw) { return null }
        return {
            CabinetID: raw.cabinetId,
            CabinetInvitationDate: raw.date,
            CabinetInvitationEmail: raw.email,
            CabinetInvitationExpired: raw.expired,
            CabinetInvitationID: raw.id,
            CabinetInvitationInviterID: raw.inviterId,
            CabinetInvitationRole: raw.role,
            CabinetInvitationToken: raw.token
        }
    }
    convertDBModelToDomain(raw: ICabinetInvitationMySql): ICabinetInvitation {
        if (!raw) { return null }
        return {
            cabinetId: raw.CabinetID,
            date: raw.CabinetInvitationDate,
            email: raw.CabinetInvitationEmail,
            expired: raw.CabinetInvitationExpired,
            id: raw.CabinetInvitationID,
            inviterId: raw.CabinetInvitationInviterID,
            role: raw.CabinetInvitationRole,
            token: raw.CabinetInvitationToken

        }
    }
    converManyDomainToDBModel(raw: ICabinetInvitation[]): ICabinetInvitationMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ICabinetInvitationMySql[]): ICabinetInvitation[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

