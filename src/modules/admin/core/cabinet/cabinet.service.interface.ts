import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { IActionRequest } from "../../../../models/action-request";


export interface ICabinetService {

    inviteToCabinet(inviterId: number, newAccount: INewAccountDTO): Promise<any>;

    requestActionToCabinetUser(memberId: string, request: IActionRequest);
}