import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IDocumentCategory } from "../../../../models/document-category";
import { IDocumentsCategoryMySql } from "../../dao/my-sql/models/my-sql-document-category";


export class MySqlDocumentsCategoriesConverter implements IDualConverter<IDocumentCategory, IDocumentsCategoryMySql>{
    converDomainToDBModel(raw: IDocumentCategory): IDocumentsCategoryMySql {
        if (!raw) { return null; }
        return {
            DocumentsCategoryDescription: raw.description,
            DocumentsCategoryID: raw.id,
            DocumentsCategoryName: raw.name
        }
    }
    convertDBModelToDomain(raw: IDocumentsCategoryMySql): IDocumentCategory {
        if (!raw) { return null; }
        return {
            description: raw.DocumentsCategoryDescription,
            id: raw.DocumentsCategoryID,
            name: raw.DocumentsCategoryName
        }
    }
    converManyDomainToDBModel(raw: IDocumentCategory[]): IDocumentsCategoryMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IDocumentsCategoryMySql[]): IDocumentCategory[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}