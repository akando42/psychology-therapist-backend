import { IDocumentMySql } from "./my-sql-document";
import { ISystemDocumentMySql } from "./my-sql-system-document";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";


export interface IRequiredDocumentMySql extends ISystemDocumentMySql, IDocumentMySql {
    DocumentRequiredID?: number;
    DocumentRequiredRole?:UsersRolEnum;
}
