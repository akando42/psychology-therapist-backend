import { TODResponse } from "../../../dto/tod-response";
import { IDocumentType } from "../../../models/document-type";
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentsClasificationComponent } from "./documents-type/documents-clasification.component";
import { IDocumentCategory } from "../../../models/document-category";
import { SystemDocumentsComponent } from "./system-documents/system-documents.component";
import { UsersRolEnum } from "../../../enums/users-rol.enum";
import { IRequiredDocument } from "../../../models/required-document";
import { DocumentsReportComponent } from "./documents-reports/documents-report.component";
import { DocumentReportStatusEnum } from "../../../enums/document-report-status.enum";





export abstract class AbstractDocumentModule {
    constructor(
        protected _documentsComponent: DocumentsComponent,
        protected _documentsClasificationComponent: DocumentsClasificationComponent,
        protected _systemDocumentsComponent: SystemDocumentsComponent,
        protected _documentsReportsComponent: DocumentsReportComponent,
    ) {}
  
    abstract uploadDocumentAsBlob(doc): Promise<TODResponse>;
    abstract uploadDocumentToFS(doc): Promise<TODResponse>;
    abstract getDocumentsReportByUserAndRole(userId: number, userRole: UsersRolEnum, status?: DocumentReportStatusEnum): Promise<TODResponse>;

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


    getAllDocumentsTypeByCategory(category: any): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const types: IDocumentType[] =
                    await this._documentsClasificationComponent.getAllDocumentsType();

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


    //basic crud for types and categories

    createCategory(category: IDocumentCategory): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this._documentsClasificationComponent.createCategory(category);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                console.log(error)
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    deleteCategory(id: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                console.log('deliting', id)
                const created = await this._documentsClasificationComponent.deleteCategory(id);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));

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

    async getSystemDocuments(): Promise<TODResponse> {
        try {
            const documents = await this._systemDocumentsComponent.getSystemDocuments();
            return this._createTODDTO(documents, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }

    }


    async uploadSystemDocuments(doc): Promise<TODResponse> {
        try {
            const documents = await this._systemDocumentsComponent.uploadSystemDocument(doc);
            return this._createTODDTO(documents, null);
        } catch (error) {
            console.log(error)
            return this._createTODDTO(null, error);
        }

    }

    async pushToDocumentRequiredByRole(doc: IRequiredDocument): Promise<TODResponse> {
        try {
            const documents = await this._systemDocumentsComponent.pushDocumentRequestToRole(doc);
            return this._createTODDTO(documents, null);
        } catch (error) {
            console.log(error)
            return this._createTODDTO(null, error);
        }

    }

    async getRequiredDocumentsByRole(role: UsersRolEnum): Promise<TODResponse> {
        try {
            const documents = await this._systemDocumentsComponent.getRequiredDocumentsByRole(role);
            return this._createTODDTO(documents, null);
        } catch (error) {
            console.log(error)
            return this._createTODDTO(null, error);
        }

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