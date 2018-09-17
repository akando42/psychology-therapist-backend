import { IRawDocument } from "../../../../models/raw-document";



export interface IDocumentService {

    uploadDocument(document: any): Promise<any>;

    getRawDocument(rawId: number): Promise<IRawDocument>;
}