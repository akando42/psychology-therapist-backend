import { IAccount } from "../models/account";
import { IUser } from "../models/user";
import { GenderEnum } from "../enums/gender.enum";
import { UsersRolEnum } from "../enums/users-rol.enum";


export interface INewAccountDTO {
    profile: {
        firstName?: string,
        lastName?: string,
        email: string,
        gender?: GenderEnum,
        role?: UsersRolEnum,
        contactInfo: {
            phoneNumber: string
        }
    },
    email: string,
    password: string,
}