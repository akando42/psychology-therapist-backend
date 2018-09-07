import { IBasicInfo } from "./extendables/basic-info";
import { UsersRolEnum } from "../enums/users-rol.enum";
import { IContactInfo } from "./extendables/contact-info";

export interface IUser {
    id?: number;
    idVerified?: boolean;
    contactInfo: IContactInfo;
    basicInfo?: IBasicInfo;
    role: UsersRolEnum;



}