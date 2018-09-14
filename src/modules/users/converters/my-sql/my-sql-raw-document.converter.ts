import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IRawDocument } from "../../../../models/raw-document";
import { IRawDocumentMySql } from "../../dao/my-sql/models/my-sql-raw-document";


export class MySqlRawDocumentConverter implements IDualConverter<IRawDocument, IRawDocumentMySql>{
    converDomainToDBModel(raw: IRawDocument): IRawDocumentMySql {
        if (!raw) { return null; }
        return {}
    }
    convertDBModelToDomain(raw: IRawDocumentMySql): IRawDocument {
        if (!raw) { return null; }
        return {}
    }
    converManyDomainToDBModel(raw: IRawDocument[]): IRawDocumentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IRawDocumentMySql[]): IRawDocument[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}