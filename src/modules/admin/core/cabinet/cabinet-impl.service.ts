import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { AccountStatusEnum } from "../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { IUser } from "../../../../models/user";
import { AuthService } from "../../feight-clients/auth.service";
import { ActionRequestsRepoInstance } from "../../dao/repositories/action-request.repository";
import { IActionRequest } from "../../../../models/action-request";
import { AbstractCabinetsRepository } from "../../dao/repositories/cabinet.repository";
import { ICabinetService } from "./cabinet.service.interface";

export class CabinetsImplService implements ICabinetService {

    constructor(private _cabinetRepository: AbstractCabinetsRepository) { }

    requestActionToCabinetUser(memberId: string, request: IActionRequest) {
        throw new Error("Method not implemented.");
    }
    
    getCabinetUsersByAdminID(adminID: number): Promise<IUser[]> {
        return this._cabinetRepository.getAdminCabinetUsers(adminID);
    }

    addToCabinet(inviterID: number, invitedID: number): Promise<{ success: boolean, message: string, used: boolean }> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this._cabinetRepository.addToCabinet(inviterID, invitedID);

                return resolve(result);

            } catch (e) {
                return reject(e)
            }
        })
    }


    requestAction(memberId: any, request: IActionRequest): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                request.requestDate = new Date().getTime();
                request.targetId = memberId;
                const saveResult: any = await ActionRequestsRepoInstance.create(request);
                return resolve(saveResult);
            } catch (error) {
                return reject(error);
            }
        })
    }

}


