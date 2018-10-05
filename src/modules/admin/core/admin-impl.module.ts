import { AdminProfilesComponent } from "./admin-profile/admin-profiles.component";
import { AbstractAdminModule } from "./abstract-admin.module";
import { TODResponse } from "../../../dto/tod-response";
import { ICabinet } from "../../../models/cabinet";
import { IAdminProfile } from "../../../models/admin-profile";
import { CabinetComponent } from "./cabinet/cabinet.component";
import { ICabinetInvitation } from "../../../models/cabinet-invitation";
import { AbtractCommunicationModule } from "../../communication/core/comunication.module";
import { InvitationEmailTemplate } from "../../../email-templates/invitation-email.template";
import { AbstractUsersModule } from "../../users/core/users.module";
import { NewRoleInvitationTemplate } from "../../../email-templates/new-role-invitation-email.template";
import { UsersRolEnum } from "../../../enums/users-rol.enum";


export class AdminModuleImpl extends AbstractAdminModule {


    async getCabinetMembers(cabinetId: number, role: any): Promise<any> {

    }

    constructor(
        adminProfileComponent: AdminProfilesComponent,
        cabinetComponent: CabinetComponent,
        comunicationModule: AbtractCommunicationModule,
        usersModule: AbstractUsersModule
    ) {
        super(
            adminProfileComponent,
            cabinetComponent,
            comunicationModule,
            usersModule)
    }
    createAdminProfile(profile: IAdminProfile): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this._adminProfileComponent.createProfile(profile);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    getAdminCabinet(userId: number): Promise<any> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this.cabinetComponent.getCabinetByAdminID(userId);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                console.log(error)
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    async getCabinetInvitations(cabinetId: number): Promise<any> {
        try {
            const invitations = await this.cabinetComponent.getCabinetInvitation(cabinetId);
            return this._createTODDTO(invitations, null);
        } catch (error) {
            console.log(error)
            if (error['sqlState']) {
                error = { message: 'unexpexted  error' };
            }
            return this._createTODDTO(null, error);
        }

    }

    createAdminCabinet(cabinet: ICabinet): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this.cabinetComponent.createCabinet(cabinet);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    createCabinetInvitation(invitation: ICabinetInvitation): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await <ICabinetInvitation>this.cabinetComponent.inviteToCabinet(invitation);
                //check if usre already have and account 
                const user = await this._usersModule.getUserByEmail(created.email)
                let template = null;
                if (user) {
                    template = new NewRoleInvitationTemplate(created).getHtml();
                } else {
                    template = new InvitationEmailTemplate(created).getHtml()
                }
                console.log(template)
                this._comunicationModule.sendEmailToOne(created.email, {
                    body: template,
                    subject: 'verification '
                })
                    .then((res) => {
                        // console.log(res['body'])
                    })
                // .catch(console.log);

                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                console.log(error)
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    getAdminProfile(userId: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const profile = await this._adminProfileComponent.getProfile(userId);
                return resolve({ message: 'admin profile found!', payload: profile, timestamp: new Date() });
            } catch (error) {
                return reject({ error: error })
            }
        })
    }

    cancelInvitation(invitationID: number): Promise<any> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const result = await this.cabinetComponent.cancelInvitation(invitationID);
                console.log(result)
                return resolve(this._createTODDTO(result, null));
            } catch (error) {
                console.log(error)
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    async getCabinetMembersByRole(cabinetId: any, role: UsersRolEnum): Promise<TODResponse> {
        try {
            const members = await this.cabinetComponent.getMembersByRole(cabinetId, role);
            return this._createTODDTO(members, null);
        } catch (error) {
            console.log(error['sqlMessage'] || error['message'])
            if (error['sqlState']) {
                error = { message: 'unexpexted  error' };
            }
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