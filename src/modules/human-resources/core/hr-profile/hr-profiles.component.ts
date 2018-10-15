import { IHRProfileService } from "./i-hr-profile.service";
import { IHRProfile } from "../../../../models/hr-profile";
import { IUserProfileService } from "../../../users/core/user-profile/user-profile.service.interface";
import { SystemDocumentsComponent } from "../../../e-documents/core/system-documents/system-documents.component";
import { ISystemDocumentsService } from "../../../e-documents/core/system-documents/i-system-document.service";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { IDocumentsReportsService } from "../../../e-documents/core/documents-reports/i-documents-report.service";
import { IRequiredDocumentReport } from "../../../../models/required-document-report";
import { IRequiredDocument } from "../../../../models/required-document";
import { DocumentReportStatusEnum } from "../../../../enums/document-report-status.enum";


export class HRProfilesComponent {
    constructor(
        private _hrProfilesService: IHRProfileService,
        private _userService: IUserProfileService,
        private _systemDocumentsService: ISystemDocumentsService,
        private _reportDocsService: IDocumentsReportsService
    ) { }


    async createProfile(profile: IHRProfile): Promise<any> {
        // create the profile
        let user = await this._userService.getUserById(profile.userId);
        if (!user) {
            throw { message: `user with ID=${profile.userId} do not exist.` };
        }

        //create the profile.
        let profileCreated = await this._hrProfilesService.createHRProfile(profile);

        //after user create check if that role have documents required
        let docsRequired: IRequiredDocument[] =
            await this._systemDocumentsService.getDocumentsRequiredByRole(UsersRolEnum.hr);

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
                    documentRequiredId:doc.id
                });
               
            }
        }

        return profileCreated;

    }

    async getProfile(userId: number): Promise<IHRProfile> {
        try {

            const profile = await this._hrProfilesService.getHRProfile(userId);
            return profile;

        } catch (error) {
            return error;

        }

    }
}