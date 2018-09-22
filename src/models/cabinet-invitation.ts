import { IBasicInfo } from "./extendables/basic-info";
import { UsersRolEnum } from "../enums/users-rol.enum";
import { IContactInfo } from "./extendables/contact-info";

export interface ICabinetInvitation {
    id?: number;
    inviterId?: number;
    token?: string;
    date?: number;
    email?: string;
    expired?: boolean;
    cabinetId?: number;
    role?: UsersRolEnum;
}