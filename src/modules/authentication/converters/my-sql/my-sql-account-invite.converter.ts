import { IAccount } from "../../../../models/account";
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IAccountInvite } from "../../../../models/account-invite";
import { IAccountInviteMySql } from "../../dao/my-sql/models/account-invite-my-sql";


export class MySqlAccountInviteConverter implements IDualConverter<IAccountInvite, IAccountInviteMySql> {
    converDomainToDBModel(raw: IAccountInvite): IAccountInviteMySql {
        if (!raw) { return null }
        console.log('vonverting',raw)
        return {
            AccountInviteDate: raw.date,
            AccountInviteEmail: raw.email,
            AccountInviteID: raw.id,
            AccountInviteInviterID: raw.inviterId,
            AccountInviteRole: raw.role,
            AccountInviteToken: raw.token,
            AccountInviteExpired: raw.expired
        };
    }
    convertDBModelToDomain(raw: IAccountInviteMySql): IAccountInvite {
        if (!raw) { return null }
        return {
            date: raw.AccountInviteDate,
            email: raw.AccountInviteEmail,
            expired: raw.AccountInviteExpired,
            id: raw.AccountInviteID,
            inviterId: raw.AccountInviteInviterID,
            role: raw.AccountInviteRole,
            token: raw.AccountInviteToken
        };
    }
    converManyDomainToDBModel(raw: IAccountInvite[]): IAccountInviteMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IAccountInviteMySql[]): IAccountInvite[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

