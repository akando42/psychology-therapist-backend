import { IDualConverter } from "../../../../core/converters/converter.interface";
import { ISystemDocument } from "../../../../models/system.document";
import { ISystemDocumentMySql } from "../../dao/my-sql/models/my-sql-system-document";


export class MySqlSystemDocumentsFullConverter implements IDualConverter<ISystemDocument, ISystemDocumentMySql>{
    converDomainToDBModel(raw: ISystemDocument): ISystemDocumentMySql {
        if (!raw) { return null; }
        return {
            DocumentID: raw.documentId,
            SystemDocumentID: raw.documentId,


        }
    }
    convertDBModelToDomain(raw: ISystemDocumentMySql): ISystemDocument {
        if (!raw) { return null; }
        return {
            documentId: raw.DocumentID,
            id: raw.SystemDocumentID,

            typeId: raw.DocumentTypeID,
            rawReference: raw.RawDocumentID,
            uploadDate: raw.DocumentUploadDate,
            path: raw.DocumentPath

        }
    }
    converManyDomainToDBModel(raw: ISystemDocument[]): ISystemDocumentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ISystemDocumentMySql[]): ISystemDocument[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}