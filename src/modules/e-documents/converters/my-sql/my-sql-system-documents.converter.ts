import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ISystemDocument } from "../../../../models/system.document";
import { ISystemDocumentMySql } from "../../dao/my-sql/models/my-sql-system-document";


export class MySqlSystemDocumentsConverter implements IDualConverter<ISystemDocument, ISystemDocumentMySql>{
    converDomainToDBModel(raw: ISystemDocument): ISystemDocumentMySql {
        if (!raw) { return null; }
        return {
            DocumentID: raw.documentId,
            SystemDocumentID: raw.id
        }
    }
    convertDBModelToDomain(raw: ISystemDocumentMySql): ISystemDocument {
        if (!raw) { return null; }
        return {
            documentId: raw.DocumentID,
            id: raw.SystemDocumentID
        }
    }
    converManyDomainToDBModel(raw: ISystemDocument[]): ISystemDocumentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ISystemDocumentMySql[]): ISystemDocument[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}