import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IDocumentCategory } from "../../../../models/document-category";
import { IDocumentsCategoryMySql } from "../../dao/my-sql/models/my-sql-document-category";


export class MySqlDocumentsCategoriesConverter implements IDualConverter<IDocumentCategory, IDocumentsCategoryMySql>{
    converDomainToDBModel(raw: IDocumentCategory): IDocumentsCategoryMySql {
        if (!raw) { return null; }
        return {
            DocumentCategoryDescription: raw.description,
            DocumentCategoryID: raw.id,
            DocumentCategoryName: raw.name
        }
    }
    convertDBModelToDomain(raw: IDocumentsCategoryMySql): IDocumentCategory {
        if (!raw) { return null; }
        return {
            description: raw.DocumentCategoryDescription,
            id: raw.DocumentCategoryID,
            name: raw.DocumentCategoryName
        }
    }
    converManyDomainToDBModel(raw: IDocumentCategory[]): IDocumentsCategoryMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IDocumentsCategoryMySql[]): IDocumentCategory[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}