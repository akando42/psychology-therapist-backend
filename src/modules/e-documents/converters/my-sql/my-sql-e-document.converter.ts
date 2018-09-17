import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IEDocument } from "../../../../models/e-document";
import { IDocumentMySql } from "../../dao/my-sql/models/my-sql-document";

// crear tipos de documents y conectar con frontend
// crear modelos en base de datos para poder probar

export class MySqlEDocumentConverter implements IDualConverter<IEDocument, IDocumentMySql>{
    converDomainToDBModel(raw: IEDocument): IDocumentMySql {
        if (!raw) { return null; }
        return {
            UsersDocumentID: raw.id,
            UsersDocumentOwnerID: raw.ownerId,
            UsersDocumentRawRef: raw.rawReference,
            UsersDocumentTypeID: raw.typeId,
            UsersDocumentUploadDate: raw.uploadDate
        }
    }
    convertDBModelToDomain(raw: IDocumentMySql): IEDocument {
        if (!raw) { return null; }
        return {
            id: raw.UsersDocumentID,
            ownerId: raw.UsersDocumentOwnerID,
            rawReference: raw.UsersDocumentRawRef,
            typeId: raw.UsersDocumentTypeID,
            uploadDate: raw.UsersDocumentUploadDate
        }
    }
    converManyDomainToDBModel(raw: IEDocument[]): IDocumentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IDocumentMySql[]): IEDocument[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}