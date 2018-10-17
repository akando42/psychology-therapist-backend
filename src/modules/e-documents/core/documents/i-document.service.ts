import { IRawDocument } from "../../../../models/raw-document";
import { IEDocument } from "../../../../models/e-document";



export interface IDocumentService {

    uploadDocumentToFileSystem(document:any):Promise<IEDocument>

    uploadDocument(document: any): Promise<any>;

    getRawDocument(rawId: number): Promise<IRawDocument>;
}