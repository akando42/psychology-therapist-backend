import { IBasicInfo } from "./extendables/basic-info";
import { UsersRolEnum } from "../enums/users-rol.enum";
import { IContactInfo } from "./extendables/contact-info";
import { GenderEnum } from "../enums/gender.enum";

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: GenderEnum;
    email?: string,

    idVerified?: boolean;
    contactInfo?: IContactInfo;
    role: UsersRolEnum;



}