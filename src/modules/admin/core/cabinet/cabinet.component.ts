import { ICabinetService } from "./cabinet.service.interface";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { AbstractAuthenticationModule } from "../../../authentication/core/abstract-authentication.module";
import { TODResponse } from "../../../../dto/tod-response";
import { IActionRequest } from "../../../../models/action-request";
import { IUser } from "../../../../models/user";
import { ICabinet } from "../../../../models/cabinet";
import { ICabinetInvitationService } from "./i-cabinet-invitation.service";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { isNullOrUndefined } from "util";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { Validate } from "../../../../behavior/validations/validate.notation";


export class CabinetComponent {
    constructor(
        protected _cabinetService: ICabinetService,
        protected _cabinetInvitationService: ICabinetInvitationService,


    ) { }

    async getCabinetByAdminID(userId: number): Promise<ICabinet> {
        return this._cabinetService.getCabinetByAdminID(userId)
    }

    addToCabinet(inviterId: number, newMemberID: number): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                return resolve(await this._cabinetService.addToCabinet(inviterId, newMemberID));
            } catch (error) {
                return reject(error);
            }
        });
    }

    async inviteToCabinet(invitation: ICabinetInvitation): Promise<any> {
        const cabinet = await this._cabinetService.getCabinetByAdminID(invitation.inviterId);
        if (isNullOrUndefined(cabinet)) {
            throw { message: 'cabinet dosent exist for that user' }
        }

        invitation.cabinetId = cabinet.id;
        let invitationCreated = await this._cabinetInvitationService.createInvitation(invitation);
        return invitationCreated;

    }

    getCabinetMemberByAdminID(adminID: number): Promise<IUser[]> {
        return new Promise<IUser[]>(async (resolve, reject) => {
            try {
                return resolve(await this._cabinetService.getCabinetUsersByAdminID(adminID));
            } catch (error) {
                return reject(error);
            }
        })
    }

    async createCabinet(cabinet: ICabinet): Promise<ICabinet> {
        const cabinetCreated = await this._cabinetService.createCabinet(cabinet);
        return cabinetCreated;
    }

    async getCabinetInvitation(cabinetId: any): Promise<ICabinetInvitation[]> {
        return this._cabinetInvitationService.getCabinetInvitations(cabinetId);
    }
    async getCabinetInvitationByToken(token: string): Promise<ICabinetInvitation> {
        const invitation = await this._cabinetInvitationService.getInvitationByToken(token);
        return invitation;
    }
    async cancelInvitation(invitationId: number): Promise<any> {
        return await this._cabinetInvitationService.cancelInvitation(invitationId);
    }
    requestActionToCabinetUser(memberId: string, request: IActionRequest): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                console.log(memberId)
                //make action request
                const requestResult: any = await this._cabinetService.requestActionToCabinetUser(memberId, request);

                //create notification 
                // NotificationsService.createNotification({
                //     content: 'You have a action request',
                //     date: new Date().getTime(),
                //     readed: false,
                //     recipentID: memberId,
                //     title: 'Action Request'
                // });

                const result: TODResponse = {
                    message: 'Request succefully!',
                    payload: requestResult,
                    timestamp: new Date()
                };

                return resolve(result);
            } catch (error) {
                const badResult: TODResponse = {
                    message: 'Sorry, an error just happend making that request',
                    error: error,
                    timestamp: new Date()
                };
                return reject(badResult);
            }
        });
    }


    async getMembersByRole(cabinetId: any, role: UsersRolEnum): Promise<any> {
        let members: any[] = [];
        switch (role) {
            case UsersRolEnum.hr:
                members = await this._cabinetService.getHRCabinetMembers(cabinetId);
                break;
            case UsersRolEnum.sales:
                members = await this._cabinetService.getSalesCabinetMembers(cabinetId);
                break;
            default:
                throw { message: 'invalid role' };

        }

        return members;
    }
}