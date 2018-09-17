import { TODResponse } from "../../../dto/tod-response";
import { IDocumentType } from "../../../models/document-type";
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentsClasificationComponent } from "./documents-type/documents-clasification.component";





export abstract class AbstractDocumentModule {
    constructor(
        protected _documentsComponent: DocumentsComponent,
        protected _documentsTypeComponent: DocumentsClasificationComponent,
    ) {

    }

    getAllDocumentsType(): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const types: IDocumentType[] = await this._documentsTypeComponent.getAllDocumentsType();

                const result: TODResponse = {
                    message: 'success request',
                    payload: types,
                    timestamp: new Date()
                }
                return resolve(result)

            } catch (error) {

                const badResult: TODResponse = {
                    message: 'Sorry!,something went wrong',
                    error: error,
                    timestamp: new Date()
                }
                return reject(badResult)
            }
        })
    }

    abstract uploadDocumentAsBlob(): Promise<TODResponse>;
}