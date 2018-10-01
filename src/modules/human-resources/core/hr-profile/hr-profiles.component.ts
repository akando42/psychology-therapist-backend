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
        let user = await this._userService.getUserById(profile.id);
        if (!user) {
            throw { message: `user with ID=${profile.id} do not exist.` };
        }

        //create the profile.
        const profileCreated = await this._hrProfilesService.createHRProfile(profile);

        //after user create check if that role have documents required
        let docsRequired: IRequiredDocument[] = await this._systemDocumentsService.getDocumentsRequiredByRole(UsersRolEnum.hr);
        //if documents required create reports for users
        if (docsRequired.length > 0) {
            let reports: IRequiredDocumentReport[] = [];
            docsRequired.forEach((doc) => {
                reports.push({
                    userId: profile.userId,
                    role: UsersRolEnum.hr,
                    status: DocumentReportStatusEnum.MISSING,
                    documentId:doc.id
                });
            });
            // insert many
        }

        return profileCreated;

    }

    getProfile(userId: number): Promise<IHRProfile> {
        return new Promise<IHRProfile>(async (resolve, reject) => {
            try {
                const profile = await this._hrProfilesService.getHRProfile(userId);
                return resolve(profile);
            } catch (error) {
                return reject(error);

            }
        })
    }
}