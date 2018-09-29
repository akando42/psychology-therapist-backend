import { IEDocument } from "../../../../models/e-document";
import { ISystemDocument } from "../../../../models/system.document";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";

/**
 * this documents may be stored on filesystem becouse they dont have any realation with
 * any entity or user. beside self organization.
 */
export interface ISystemDocumentsService {
    /**
     * upload a document to the platform
     * @param document 
     */
    uploadDocument(document: ISystemDocument): Promise<number>;

    /**
     * Add a new document requirement 
     * @param documentId document to be add to requirements
     * @param role role to be added the document 
     */
    pushDocumentRequestToRole(documentId: any, role: any): Promise<any>;

    /**
     *return documents that below to the system and no to a particular user
     *this document have multiple porpuse. 
     */
    getSystemDocuments(): Promise<ISystemDocument[]>;

    /**
     * return the documents attached to a role in specficic
     */
    getDocumentsRequiredByRole(role:UsersRolEnum):Promise<any>
}