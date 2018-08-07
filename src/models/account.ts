import { UsersRolEnum } from "../enums/users-rol.enum";
import { AccountStatusEnum } from "../enums/account-stats.enum";
import { IBasicInfo } from "./extendables/basic-info";


export interface IAccount {
    accountId?: string;
    email?: string;
    password?: string;
    accountStatus?: AccountStatusEnum;
    signUpDate: any;
    //array of ids for usrs
    userId: string;
}