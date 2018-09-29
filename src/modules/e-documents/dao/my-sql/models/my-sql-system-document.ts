import { IDocumentMySql } from "./my-sql-document";


export interface ISystemDocumentMySql extends IDocumentMySql{
    SystemDocumentID?:number;
    DocumentID?: number;
}
