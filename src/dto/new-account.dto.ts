import { IAccount } from "../models/account";
import { IUser } from "../models/user";


export interface INewAccountDTO extends IAccount {
    userInfo: IUser;
}