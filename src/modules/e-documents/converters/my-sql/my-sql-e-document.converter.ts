import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IEDocument } from "../../../../models/e-document";
import { IDocumentMySql } from "../../dao/my-sql/models/my-sql-document";

// crear tipos de documents y conectar con frontend
// crear modelos en base de datos para poder probar

export class MySqlEDocumentConverter implements IDualConverter<IEDocument, IDocumentMySql>{
    converDomainToDBModel(raw: IEDocument): IDocumentMySql {
        if (!raw) { return null; }
        return {
            DocumentID: raw.id,
            DocumentRawRef: raw.rawReference,
            DocumentTypeID: raw.typeId,
            DocumentUploadDate: raw.uploadDate
        }
    }
    convertDBModelToDomain(raw: IDocumentMySql): IEDocument {
        if (!raw) { return null; }
        return {
            id: raw.DocumentID,
            rawReference: raw.DocumentRawRef,
            typeId: raw.DocumentTypeID,
            uploadDate: raw.DocumentUploadDate
        }
    }
    converManyDomainToDBModel(raw: IEDocument[]): IDocumentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IDocumentMySql[]): IEDocument[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}