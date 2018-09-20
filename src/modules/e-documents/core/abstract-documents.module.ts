import { TODResponse } from "../../../dto/tod-response";
import { IDocumentType } from "../../../models/document-type";
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentsClasificationComponent } from "./documents-type/documents-clasification.component";
import { IDocumentCategory } from "../../../models/document-category";





export abstract class AbstractDocumentModule {
    constructor(
        protected _documentsComponent: DocumentsComponent,
        protected _documentsClasificationComponent: DocumentsClasificationComponent,
    ) {

    }

    getAllDocumentsType(): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const types: IDocumentType[] = await this._documentsClasificationComponent.getAllDocumentsType();

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

    getAllDocumentsCategories(): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const types: IDocumentCategory[] = await this._documentsClasificationComponent.getAllDocumentsCategories();

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

    abstract uploadDocumentAsBlob(doc): Promise<TODResponse>;

    //basic crud for types and categories

    createCategory(category: IDocumentCategory): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this._documentsClasificationComponent.createCategory(category);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    deleteCategory(id: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
            } catch (error) {

            }
        });
    }
    updateCategory(id: number, update: IDocumentCategory): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

            } catch (error) {

            }
        });
    }

    //types
    createTypes(docType: IDocumentType): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this._documentsClasificationComponent.createDocType(docType);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));
            }
        });
    }


    protected _createTODDTO(payload: any, error?: any): TODResponse {
        return {
            error: error || null,
            message: 'succefully',
            timestamp: new Date(),
            payload: payload || null
        }
    }
}