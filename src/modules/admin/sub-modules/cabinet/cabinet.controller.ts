import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { IUser } from "../../../../models/user";
import { CabinetsServiceInstance, CabinetsService } from "./cabinet.service";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { MailGunEmailServiceInstance } from "../../../communication/email/mailgun-email.service";
import { resolve } from "path";
import { TODResponse } from "../../../../dto/tod-response";
import { NotificationsService } from "../../feight-clients/notifications.service";
import { IActionRequest } from "../../../../models/action-request";
import { AuthenticationService, AuthenticationServiceInstance } from "../../../authentication/authentication.service";


export class CabinetController {
    constructor(
        private _cabinetService: CabinetsService,
        private _authService: AuthenticationService
    ) {
    }

    inviteToCabinet(inviterId: number, account: INewAccountDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const result: { success: boolean, message: string, used: boolean } = await
                    this._cabinetService.inviteToCabinet(inviterId, account);

                if (result.success) {
                    //use mail service to notify user that account has been created
                    //sent credentials on email so user can login and change his password.
                    MailGunEmailServiceInstance
                        .sentToOne(account.email, { body: '', subject: '' })
                }

                return resolve(result);
            } catch (error) {
                //handle errors     properly here;

                resolve(error);
            }
        })
    }


    getCabinetUsers(adminId: string): Promise<IUser[]> {

        return CabinetsServiceInstance.getCabinetUsers(adminId);
    }

    requestActionToCabinetUser(memberId: string, request: IActionRequest): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                console.log(memberId)
                //make action request
                const requestResult: any = await this._cabinetService.requestAction(memberId, request);

                //create notification 
                NotificationsService.createNotification({
                    content: 'You have a action request',
                    date: new Date().getTime(),
                    readed: false,
                    recipentID: memberId,
                    title: 'Action Request'
                });

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
        })
    }



}

export const CabinetControllerInstance: CabinetController =
    new CabinetController(
        CabinetsServiceInstance,
        AuthenticationServiceInstance);