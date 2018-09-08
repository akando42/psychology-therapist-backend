import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { IActionRequest } from "../../../../models/action-request";
import { IUser } from "../../../../models/user";


export interface ICabinetService {

    getCabinetUsersByAdminID(adminID: number): Promise<IUser[]>

    addToCabinet(inviterId: number, invitedId: number): Promise<any>;

    requestActionToCabinetUser(memberId: string, request: IActionRequest);
}