import { IRawDocument } from "../../../../models/raw-document";
import { IUsersDocumentService } from "./i-users-document.service";
import { IEDocument } from "../../../../models/e-document";
import { IDocumentUploadDTO } from "../../../../dto/document-upload.dto";


export class UserDocumentsComponent {
    constructor(
        private _usersDocumentService?: IUsersDocumentService
    ) {

    }



    uploadDocument(document: IDocumentUploadDTO): Promise<IEDocument> {
        return new Promise<IEDocument>(async (resolve, reject) => {
            try {
                const savedRef: IEDocument = await this._usersDocumentService.uploadDocument(document);

                return resolve(savedRef);
            } catch (error) {

                return reject(error);
            }
        });
    }

    getRawDocument(rawId: number): Promise<IRawDocument> {
        return new Promise<IRawDocument>(async (resolve, reject) => {
            try {
                const raw: IRawDocument = await this._usersDocumentService.getRawDocument(rawId);

                return resolve(raw);
            } catch (error) {
                return reject(error);
            }
        });
    }
}