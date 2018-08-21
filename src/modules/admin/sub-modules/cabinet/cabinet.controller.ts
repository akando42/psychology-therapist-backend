import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { IUser } from "../../../../models/user";
import { CabinetsServiceInstance, CabinetsService } from "./cabinet.service";
import { AuthenticationServiceInstance, AuthenticationService } from "../../../authentication/authentication.service";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { MailGunEmailServiceInstance } from "../../../communication/email/mailgun-email.service";
import { ICabinetActionRequest } from "../../../../models/cabinet-action-request";


export class CabinetController {
    constructor(private _authService: CabinetsService) {
    }

    signup(account: INewAccountDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const result: { success: boolean, message: string, used: boolean } = await
                    this._authService.inviteToCabinet(account);

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

    requestActionToCabinetUser(request: ICabinetActionRequest): Promise<any> {
        return null;
    }



}

export const CabinetControllerInstance: CabinetController =
    new CabinetController(CabinetsServiceInstance);