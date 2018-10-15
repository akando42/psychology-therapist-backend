import { IAdminProfileService } from "./i-admin-profile.service";
import { IAdminProfile } from "../../../../models/admin-profile";
import { ISuperAdminService } from "../super-admin/i-super-admin.service";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { ISystemDocumentsService } from "../../../e-documents/core/system-documents/i-system-document.service";
import { IDocumentsReportsService } from "../../../e-documents/core/documents-reports/i-documents-report.service";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";


export class AdminProfilesComponent {
    constructor(
        private _adminProfilesService: IAdminProfileService,
        private _superAdminProfilesService: ISuperAdminService,
        private _systemDocumentsService: ISystemDocumentsService,
        private _reportDocsService: IDocumentsReportsService
    ) { }

    async getMasterAdmin(userId): Promise<any> {
        const master = await this._superAdminProfilesService.getSuperAdminProfile(userId);
        return master;
    }

    @ComposeValidation([{ index: 0, validators: [{ name: 'userId', cb: Required }] }])
    async createProfile(profile: IAdminProfile): Promise<any> {
        try {
            const profileCreated = await this._adminProfilesService.createAdminProfile(profile);

            const docsRequired = await this._systemDocumentsService.getDocumentsRequiredByRole(UsersRolEnum.admin);
            //if documents required create reports for users
            if (docsRequired.length > 0) {

                for (const doc of docsRequired) {
                    //create one by one, no bulk almost not performance issue here actually.
                    let created = await this._reportDocsService.createDocumentReport({
                        userId: profile.userId,
                        role: UsersRolEnum.hr,
                        status: DocumentReportStatusEnum.MISSING,
                        //dont have document uploaded yet
                        documentId: null,
                        documentRequiredId: doc.id
                    });

                }
            }

            return profileCreated;
        } catch (error) {
            return error;
        }

    }

    async getProfile(userId: number): Promise<IAdminProfile> {
        try {
            const profile = await this._adminProfilesService.getAdminProfile(userId);
            return profile;
        } catch (error) {
            return error;
        }
    }

    async getAllAdminsProfiles(): Promise<any[]> {
        return this._adminProfilesService.getAllAdmins()
    }
}