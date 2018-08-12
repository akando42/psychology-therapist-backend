import { IAccount } from "../models/account";
import { IUser } from "../models/user";
import { GenderEnum } from "../enums/gender.enum";
import { UsersRolEnum } from "../enums/users-rol.enum";


export interface INewAccountDTO extends IAccount {
    firstName?: string;
    lastName?: string;
    gender?: GenderEnum;
    phoneNumber: string;
    role?: UsersRolEnum
}