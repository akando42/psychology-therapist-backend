import { TODResponse } from "../../../dto/tod-response";
import { DocumentsTypeComponent } from "./documents-type/documents-type.component";
import { IDocumentType } from "../../../models/document-type";





export abstract class AbstractDocumentModule {
    constructor(private _documentsTypeComponent: DocumentsTypeComponent) {

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
}