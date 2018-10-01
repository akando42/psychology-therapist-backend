import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IDocumentType } from "../../../models/document-type";

export interface AbstractDocumentsTypeRepository {

    getById(typeId: number): Promise<IDocumentType[]>;

    getAllDocumentTypes(): Promise<IDocumentType[]>;

    getAllDocumentTypesByCategory(category: any): Promise<IDocumentType[]>;

}