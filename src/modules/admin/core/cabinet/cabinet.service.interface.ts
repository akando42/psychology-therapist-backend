import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { IActionRequest } from "../../../../models/action-request";
import { IUser } from "../../../../models/user";
import { ICabinet } from "../../../../models/cabinet";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";


export interface ICabinetService {


    getCabinetByAdminID(userId: number): Promise<ICabinet>;

    createCabinet(cabinet: ICabinet): Promise<ICabinet>;

    getCabinetUsersByAdminID(adminID: number): Promise<IUser[]>

    addToCabinet(inviterId: number, invitedId: number): Promise<any>;

    requestActionToCabinetUser(memberId: string, request: IActionRequest);

    inviteToCabinet(cabinet: ICabinetInvitation): Promise<ICabinetInvitation>;
}