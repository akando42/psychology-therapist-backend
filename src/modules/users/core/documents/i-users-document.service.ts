import { IRawDocument } from "../../../../models/raw-document";



export interface IUsersDocumentService {

    uploadDocument(document: any): Promise<any>;

    getRawDocument(rawId: number): Promise<IRawDocument>;
}