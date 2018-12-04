import { ISystemDocument } from "./system.document";
import { UsersRolEnum } from "../enums/users-rol.enum";


export interface IRequiredDocument extends ISystemDocument {
    role: UsersRolEnum;
    active:boolean;
    systemDocumentId?:any;
}