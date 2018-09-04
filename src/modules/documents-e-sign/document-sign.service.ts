import { IDocumentSign } from "../../models/e-sign-document";


export interface IDocumentSignService {

    /**
     * mark a document as signed.
     * @param documentSignRecord 
     */
    markAsSigned(documentSignRecord: IDocumentSign): Promise<IDocumentSign>;

}