import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IDocumentSign } from "../../../../models/e-sign-document";
import { IDocumentSignMySql } from "../../dao/my-sql/models/my-sql-document-sign";


export class MySqlDocumentSignConverter implements IDualConverter<IDocumentSign, IDocumentSignMySql>{
    converDomainToDBModel(raw: IDocumentSign): IDocumentSignMySql {
        if (!raw) { return null; }
        return {}
    }
    convertDBModelToDomain(raw: IDocumentSignMySql): IDocumentSign {
        if (!raw) { return null; }
        return {}
    }
    converManyDomainToDBModel(raw: IDocumentSign[]): IDocumentSignMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IDocumentSignMySql[]): IDocumentSign[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}