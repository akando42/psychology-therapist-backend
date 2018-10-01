import { IDocumentService } from "../documents/i-document.service";
import { IDocumentUploadDTO } from "../../../../dto/document-upload.dto";
import { ISystemDocument } from "../../../../models/system.document";
import { DocumentsComponent } from "../documents/documents.component";
import { ISystemDocumentsService } from "./i-system-document.service";
import { nullPropValidator } from "../../../../validators/null-prop.validator";
import { ISystemDocUpload } from "../../../../dto/system-doc-upload.dto";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { IRequiredDocument } from "../../../../models/required-document";
import { IEDocument } from "../../../../models/e-document";
import { Validate } from "../../../../behavior/validations/validate.notation";


export class SystemDocumentsComponent {
    constructor(
        private _documentComponent: DocumentsComponent,
        private _systemDocumentService?: ISystemDocumentsService) {

    }


    async uploadSystemDocument(document: ISystemDocUpload): Promise<any> {
        const validationResult = nullPropValidator(document, ['typeId', 'name'])
        if (!validationResult.valid) {
            throw { message: 'fields cannot be null', fields: validationResult.missingField }
        }

        const documentCreated: IEDocument = await this._documentComponent.uploadDocument(document);
        //update system stack
        let systemDocument =
            await this._systemDocumentService.uploadDocument({ documentId: documentCreated.id });

        return systemDocument;
    }

    async getSystemDocuments(): Promise<ISystemDocument[]> {
        let documents = await this._systemDocumentService.getSystemDocuments();
        return documents;
    }

    async getRequiredDocumentsByRole(role: UsersRolEnum): Promise<IRequiredDocument[]> {
        let documents = await this._systemDocumentService.getDocumentsRequiredByRole(role);
        return documents;
    }

    async pushDocumentRequestToRole(requireDoc: IRequiredDocument): Promise<any> {
        let documents = await this._systemDocumentService.pushDocumentRequestToRole(requireDoc);
        return documents;
    }
}