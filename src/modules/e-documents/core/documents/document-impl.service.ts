import { IDocumentService } from "./i-document.service";
import { IEDocument } from "../../../../models/e-document";
import { IRawDocument } from "../../../../models/raw-document";
import { AbstractRawDocumentRepository } from "../../dao/raw-document.repository";
import { isNullOrUndefined } from "util";
import { AbstractUserDocumentRepository } from "../../dao/user-document.repository";
import { IDocumentUploadDTO } from "../../../../dto/document-upload.dto";
import { AbstractEDocumentRepository } from "../../dao/e-document.repository";



export class DocumentServiceImpl implements IDocumentService {
    constructor(
        private _documentsRefRepository: AbstractEDocumentRepository,
        private _rawDocumentRepository: AbstractRawDocumentRepository
    ) {

    }
    uploadDocument(document: IDocumentUploadDTO): Promise<IEDocument> {
        return new Promise<IEDocument>(async (resolve, reject) => {
            try {
                console.log(document)
                if (isNullOrUndefined(document)) {
                    return reject({ message: 'no document provided' });
                }

                // uploadDocument
                const rawDocument: number =
                    await this._rawDocumentRepository.saveRawDocument(document.raw);

                document.rawReference = rawDocument

                const documentRef: IEDocument =
                    await this._documentsRefRepository.createDocumentRef(document);

                return resolve(documentRef);
            } catch (error) {
                return reject(error);
            }
        });
    }

    getRawDocument(rawId: number): Promise<IRawDocument> {
        return new Promise<IRawDocument>(async (resolve, reject) => {
            try {

                if (isNullOrUndefined(rawId)) {
                    return reject({ message: 'no id provided' });
                }

                const rawDocument: IRawDocument =
                    await this._rawDocumentRepository.getRawDocument(rawId);

                return resolve(rawDocument);
            } catch (error) {
                return reject(error);
            }
        })
    }
}