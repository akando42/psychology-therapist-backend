import { AccountStatusEnum } from "../../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../../enums/gender.enum";


export interface IAccountMySql {
    accountId?: string;
    email: string;
    password?: string;
    userRol?: UsersRolEnum
    lastName?: string;
    firstName?: string;
    gender?: GenderEnum;
    signUpDate: any;
    accountStatus?: AccountStatusEnum;
}