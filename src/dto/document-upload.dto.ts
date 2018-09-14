import { IEDocument } from "../models/e-document";
import { IRawDocument } from "../models/raw-document";

export interface IDocumentUploadDTO extends IEDocument {
    raw: IRawDocument
}
