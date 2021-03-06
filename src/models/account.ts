import { UsersRolEnum } from "../enums/users-rol.enum";
import { AccountStatusEnum } from "../enums/account-stats.enum";
import { IBasicInfo } from "./extendables/basic-info";


export interface IAccount {
    id?: any;
    email?: string;
    password?: string;
    accountStatus?: AccountStatusEnum;
    signUpDate?: any;
    verificationHash?: string;
    userId?: any;
    emailVerified?: boolean;
}