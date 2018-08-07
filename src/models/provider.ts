import { IUser } from "./extendables/user";


export interface IProvider extends IUser {
    id?: string
    experience?: string
    qualifications?: string;
    resume?: string;
    adminId?: string

}