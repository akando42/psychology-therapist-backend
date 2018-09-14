import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IEDocument } from "../../../../models/e-document";
import { IEDocumentMySql } from "../../dao/my-sql/models/my-sql-e-document";


export class MySqlEDocumentConverter implements IDualConverter<IEDocument, IEDocumentMySql>{
    converDomainToDBModel(raw: IEDocument): IEDocumentMySql {
        if (!raw) { return null; }
        return {}
    }
    convertDBModelToDomain(raw: IEDocumentMySql): IEDocument {
        if (!raw) { return null; }
        return {}
    }
    converManyDomainToDBModel(raw: IEDocument[]): IEDocumentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IEDocumentMySql[]): IEDocument[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}