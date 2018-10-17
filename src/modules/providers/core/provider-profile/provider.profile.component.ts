import { IProvidersProfileService } from "./I-providers-profile.service";
import { IProviderDisponibilityService } from "../provider-disponibility/i-provider-disponibility.service";
import { IProviderProfile } from "../../../../models/provider-profile";
import { IProviderDisponibility } from "../../../../models/provider-disponibility";
import { ISystemDocumentsService } from "../../../e-documents/core/system-documents/i-system-document.service";
import { IDocumentsReportsService } from "../../../e-documents/core/documents-reports/i-documents-report.service";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";


export class ProviderProfileComponent {
    constructor(
        private _providerProfileService: IProvidersProfileService,
        private _providerDisponibilityService: IProviderDisponibilityService,
        private _systemDocumentsService: ISystemDocumentsService,
        private _reportDocsService: IDocumentsReportsService
    ) { }

    async createProviderProfile(providerProfile: IProviderProfile): Promise<IProviderProfile> {

        const profileCreated = await this._providerProfileService.createProviderProfile(providerProfile);

        //Get documents required by role and 
        this._systemDocumentsService.getDocumentsRequiredByRole(UsersRolEnum.provider)
            .then((docsRequireds) => {
                for (const doc of docsRequireds) {
                    this._reportDocsService.createDocumentReport({
                        userId: profileCreated.userId,
                        role: UsersRolEnum.hr,
                        status: DocumentReportStatusEnum.MISSING,
                        //dont have document uploaded yet
                        documentId: null,
                        documentRequiredId: doc.id
                    });
                }
            })

        return profileCreated;
    }

    async setDisponibility(disponibility: IProviderDisponibility): Promise<IProviderDisponibility> {
        const disponibilityCreted = await this._providerDisponibilityService.setProviderDisponibility(disponibility);
        return disponibility;
    }

}