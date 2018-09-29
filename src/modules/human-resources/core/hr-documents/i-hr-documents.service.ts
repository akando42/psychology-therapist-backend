import { IEDocument } from "../../../../models/e-document";



export interface IHRDocumentsService {

    getUnsignedDocuments(): Promise<IEDocument[]>;

    pushDocumentRequired(): Promise<number>;

}