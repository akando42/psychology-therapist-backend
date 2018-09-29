import { IDocumentType } from "../../../../models/document-type";


export interface IDocumentsTypeService {

    getAllDocumentsType(query?): Promise<IDocumentType[]>
    
    getAllDocumentsTypeByCategory(categoryId:number): Promise<IDocumentType[]>
    createDocType(docType: IDocumentType): Promise<any>;
}