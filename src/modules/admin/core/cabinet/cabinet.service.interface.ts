import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { IActionRequest } from "../../../../models/action-request";
import { IUser } from "../../../../models/user";
import { ICabinet } from "../../../../models/cabinet";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";


export interface ICabinetService {


    getCabinetByAdminID(userId: number): Promise<ICabinet>;

    createCabinet(cabinet: ICabinet): Promise<ICabinet>;

    getCabinetUsersByAdminID(adminID: number): Promise<IUser[]>

    addToCabinet(inviterId: number, invitedId: number): Promise<any>;

    requestActionToCabinetUser(memberId: string, request: IActionRequest);

    inviteToCabinet(cabinet: ICabinetInvitation): Promise<ICabinetInvitation>;

    getHRCabinetMembers(cabinetId: any): Promise<any[]>;

    getSalesCabinetMembers(cabinetId: any): Promise<any[]>;
}