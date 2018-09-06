import { IBasicInfo } from "./extendables/basic-info";
import { UsersRolEnum } from "../enums/users-rol.enum";
import { IContactInfo } from "./extendables/contact-info";

export interface IUser {
    id?: string;
    idVerified?: boolean;
    contactInfo: IContactInfo;
    basicInfo?: IBasicInfo;
    role: UsersRolEnum;



}