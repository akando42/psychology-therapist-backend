import { ISystemDocumentsService } from "./i-system-document.service";
import { IEDocument } from "../../../../models/e-document";
import { ISystemDocument } from "../../../../models/system.document";
import { AbstractSystemDocumentRepository } from "../../dao/system-document.repository";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { AbstractRequiredDocumentsRepository } from "../../dao/required-document.repository";



export class SystemDocumentService implements ISystemDocumentsService {

    constructor(
        private systemDocumentRepo: AbstractSystemDocumentRepository,
        private _requiredDocumentsRepo: AbstractRequiredDocumentsRepository) { }

    async uploadDocument(document: ISystemDocument): Promise<number> {
        console.log('attempting to query', document)
        // const validation =  
        let id = await this.systemDocumentRepo.createSystemDocument(document);
        console.log('system repo result', id)

        return id;
    }
    async getSystemDocuments(): Promise<ISystemDocument[]> {
        let documents = await this.systemDocumentRepo.getSystemDocument();
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
    async pushDocumentRequestToRole(systemDocId: any, role: any): Promise<any> {
        if (!role) {
            throw { message: 'no role provided!' };
        }
        const doc = await this.systemDocumentRepo.getSystemDocumentById(systemDocId);
        if (!doc) {
            throw { message: 'document do not exist, or was recently removed' }
        }

        const saved = await this._requiredDocumentsRepo.saveDocumentsRequiredToRole({
            documentId: doc.documentId,
            systemDocumentId: doc.id,
            role: role,
            active: true
        });
        return saved;
    }
}