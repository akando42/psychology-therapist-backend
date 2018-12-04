import { IEDocument } from "../models/e-document";
import { IRawDocument } from "../models/raw-document";
import { IUserIDVerification } from "../models/user-id-verification";

export interface IDocumentUploadDTO extends IEDocument,IUserIDVerification {
    
    raw: IRawDocument
}
