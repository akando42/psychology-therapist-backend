import { IAccount } from "../../../../models/account";
import { IDualConverter } from "../../../../core/converters/converter.interface";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { ICabinetInvitationMySql } from "../../../admin/dao/my-sql/models/cabinet-invitation-my-sql";


export class MySqlCabinetInvitationConverter implements IDualConverter<ICabinetInvitation, ICabinetInvitationMySql> {
    converDomainToDBModel(raw: ICabinetInvitation): ICabinetInvitationMySql {
        if (!raw) { return null }
        console.log('vonverting',raw)
        return {
            CabinetInvitationDate: raw.date,
            CabinetInvitationEmail: raw.email,
            CabinetInvitationID: raw.id,
            CabinetInvitationInviterID: raw.inviterId,
            CabinetInvitationRole: raw.role,
            CabinetInvitationToken: raw.token,
            CabinetInvitationExpired: raw.expired
        };
    }
    convertDBModelToDomain(raw: ICabinetInvitationMySql): ICabinetInvitation {
        if (!raw) { return null }
        return {
            date: raw.CabinetInvitationDate,
            email: raw.CabinetInvitationEmail,
            expired: raw.CabinetInvitationExpired,
            id: raw.CabinetInvitationID,
            inviterId: raw.CabinetInvitationInviterID,
            role: raw.CabinetInvitationRole,
            token: raw.CabinetInvitationToken
        };
    }
    converManyDomainToDBModel(raw: ICabinetInvitation[]): ICabinetInvitationMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ICabinetInvitationMySql[]): ICabinetInvitation[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

