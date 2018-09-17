import { IDocumentType } from "../../../../models/document-type";


export interface IDocumentsTypeService {

    getAllDocumentsType(): Promise<IDocumentType[]>

    createDocType(docType: IDocumentType): Promise<any>;
}