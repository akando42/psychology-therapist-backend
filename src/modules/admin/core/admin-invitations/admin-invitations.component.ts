import { IAdminInvitationService } from "./admin-invitations.service";
import { IAdminInvitation } from "../../../../models/admin-invitation";
import { IUserProfileService } from "../../../users/core/user-profile/user-profile.service.interface";
import { isNullOrUndefined } from "util";
import { NewAdminIvitationNewUserTemplate } from "../../../../email-templates/new-admin-invitation-new-user.template";
import { AbtractCommunicationModule } from "../../../communication/core/comunication.module";


export class AdminInvitationComponent {
    constructor(
        private _invitationsService: IAdminInvitationService,
        private _userService: IUserProfileService,
        private _emailService: AbtractCommunicationModule
    ) { }

    async createInvitation(invitation: IAdminInvitation): Promise<IAdminInvitation> {

        const created = await this._invitationsService.createAdminInvitation(invitation);

        //probably get more info abput the user;
        const userExist = await this._userService.getUserByEmail(invitation.email);
        let template = null;

        if (isNullOrUndefined(userExist)) {
            let link = 'http://localhost:4200/admin/invitation/' + created.token;
            template = new NewAdminIvitationNewUserTemplate(link).getHtml();
            this._emailService.sendEmailToOne(created.email, {
                body: template,
                subject: 'Invitation '
            });
        }

        return created;
    }

    async verifyAdminInvitation(token: string): Promise<IAdminInvitation> {
        const invitation = this._invitationsService.verifyAdminInvitation(token);
        return invitation;
    }
}