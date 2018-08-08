import { AccountStatusEnum } from "../../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../../enums/gender.enum";


export interface IAccountMySql {
    AccountID?: string;
    AccountEmail: string;
    AccountPassword?: string;
    AccountSignUpDate: any;
    AccountUserID: string;
    AccountStatus?: AccountStatusEnum;

}