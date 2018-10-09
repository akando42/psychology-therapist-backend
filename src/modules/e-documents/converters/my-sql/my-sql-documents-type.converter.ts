import { IDualConverter } from "../../../../core/converters/converter.interface";
import { IDocumentType } from "../../../../models/document-type";
import { IDocumentsTypeMySql } from "../../dao/my-sql/models/my-sql-documents-type";


export class MySqlDocumentsTypeConverter implements IDualConverter<IDocumentType, IDocumentsTypeMySql>{
    converDomainToDBModel(raw: IDocumentType): IDocumentsTypeMySql {
        if (!raw) { return null; }
        return {
            DocumentTypeDescription: raw.description,
            DocumentTypeID: raw.id,
            DocumentTypeName: raw.name,
            CategoryID:raw.categoryId
        }
    }
    convertDBModelToDomain(raw: IDocumentsTypeMySql): IDocumentType {
        if (!raw) { return null; }
        return {
            description: raw.DocumentTypeDescription,
            id: raw.DocumentTypeID,
            name: raw.DocumentTypeName,
            categoryId:raw.CategoryID
        }
    }
    converManyDomainToDBModel(raw: IDocumentType[]): IDocumentsTypeMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IDocumentsTypeMySql[]): IDocumentType[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}