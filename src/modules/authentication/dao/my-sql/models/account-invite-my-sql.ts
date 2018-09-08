import { AccountStatusEnum } from "../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../enums/gender.enum";


export interface IAccountInviteMySql {
    AccountInviteID?: number;
    AccountInviteDate?: number;
    AccountInviteToken?: string;
    AccountInviteInviterID?: number;
    AccountInviteCabinetID?: number;
    AccountInviteEmail?: string;
    AccountInviteRole?: UsersRolEnum;
    AccountInviteExpired?: boolean;

}