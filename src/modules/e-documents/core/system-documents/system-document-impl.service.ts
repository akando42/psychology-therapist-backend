import { ISystemDocumentsService } from "./i-system-document.service";
import { IEDocument } from "../../../../models/e-document";
import { ISystemDocument } from "../../../../models/system.document";
import { AbstractSystemDocumentRepository } from "../../dao/system-document.repository";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { AbstractRequiredDocumentsRepository } from "../../dao/required-document.repository";
import { IRequiredDocument } from "../../../../models/required-document";



export class SystemDocumentService implements ISystemDocumentsService {

    constructor(
        private systemDocumentRepo: AbstractSystemDocumentRepository,
        private _requiredDocumentsRepo: AbstractRequiredDocumentsRepository) { }

    async uploadDocument(document: ISystemDocument): Promise<number> {
        // const validation =  
        let id = await this.systemDocumentRepo.createSystemDocument(document);

        return id;
    }
    async getSystemDocuments(): Promise<ISystemDocument[]> {
        let documents = await this.systemDocumentRepo.getSystemDocument();
        console.log(documents)
        return documents;
    }

    async getDocumentsRequiredByRole(role: UsersRolEnum): Promise<any> {
        let documentsRequired = [];
        switch (role) {
            case UsersRolEnum.hr:
                documentsRequired = await this._requiredDocumentsRepo.getDocumentsRequiredByRole(role);
                break;
                
                default:
                throw { message: 'no valid role' }
                
            }
            
        return documentsRequired;
    }
    async pushDocumentRequestToRole(systemDoc: IRequiredDocument): Promise<any> {
        if (!systemDoc.role) {
            throw { message: 'no role provided!' };
        }
        const doc = await this.systemDocumentRepo.getSystemDocumentById(systemDoc.systemDocumentId);
        if (!doc) {
            throw { message: 'document do not exist, or was recently removed' }
        }
       
        systemDoc.documentId = doc.documentId;
      
        
        const saved = await this._requiredDocumentsRepo.saveDocumentsRequiredToRole(systemDoc);
        return saved;
    }
}