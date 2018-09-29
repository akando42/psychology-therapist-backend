import { AccountStatusEnum } from "../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../enums/gender.enum";


export interface ICabinetInvitationMySql {
    CabinetInvitationID?: number;
    CabinetInvitationDate?: number;
    CabinetInvitationToken?: string;
    CabinetInvitationInviterID?: number;
    CabinetInvitationEmail?: string;
    CabinetInvitationRole?: UsersRolEnum;
    CabinetInvitationExpired?: boolean;
    CabinetID?:number;
}