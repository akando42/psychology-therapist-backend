import * as fs from 'fs'
import { IRawDocument } from "../../../../models/raw-document";
import { IDocumentService } from "./i-document.service";
import { IEDocument } from "../../../../models/e-document";
import { IDocumentUploadDTO } from "../../../../dto/document-upload.dto";


export class DocumentsComponent {
    constructor(
        private _documentService?: IDocumentService
    ) {

        if (!fs.existsSync('uploads/')) {
            fs.mkdirSync('uploads/');
        }
    }


    async uploadDocumentToFileSystem(name: IEDocument, document: any): Promise<any> {
        const ref =await this._documentService.uploadDocumentToFileSystem(name, document)
        return ref;
    }
    uploadDocument(document: any): Promise<IEDocument> {
        return new Promise<IEDocument>(async (resolve, reject) => {
            try {
                const savedRef: IEDocument = await this._documentService.uploadDocument(document);

                return resolve(savedRef);
            } catch (error) {

                return reject(error);
            }
        });
    }

    getRawDocument(rawId: number): Promise<IRawDocument> {
        return new Promise<IRawDocument>(async (resolve, reject) => {
            try {
                const raw: IRawDocument = await this._documentService.getRawDocument(rawId);

                return resolve(raw);
            } catch (error) {
                return reject(error);
            }
        });
    }
}