import { ICabinetService } from "./cabinet.service.interface";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { AbstractAuthenticationModule } from "../../../authentication/core/abstract-authentication.module";
import { TODResponse } from "../../../../dto/tod-response";
import { IActionRequest } from "../../../../models/action-request";
import { IUser } from "../../../../models/user";


export class CabinetCompont {
    constructor(
        protected _cabinetService: ICabinetService,
    ) { }

    addToCabinet(inviterId: number, newMemberID: number): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                return resolve(await this._cabinetService.addToCabinet(inviterId, newMemberID));
            } catch (error) {
                return reject(error);
            }
        });
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
}