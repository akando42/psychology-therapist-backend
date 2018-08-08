import { IBasicInfo } from "./extendables/basic-info";
import { UsersRolEnum } from "../enums/users-rol.enum";
import { IContactInfo } from "./extendables/contact-info";

export interface IUser {
    id: string;
    contactInfo: IContactInfo
    basicInfo?: IBasicInfo;
    //should be a array
    userRol: UsersRolEnum;

    

}