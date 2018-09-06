import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { AccountStatusEnum } from "../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { IUser } from "../../../../models/user";
import { CabinetsRepoInstance } from "../../dao/repositories/cabinet.repository";
import { AuthService } from "../../feight-clients/auth.service";
import { ActionRequestsRepoInstance } from "../../dao/repositories/action-request.repository";
import { IActionRequest } from "../../../../models/action-request";

export class CabinetsService {
    constructor() {

    }

    inviteToCabinet(inviterId: number, newAccount: INewAccountDTO): Promise<{ success: boolean, message: string, used: boolean }> {
        return new Promise(async (resolve, reject) => {
            try {

                const rol = newAccount.role;
                if (rol !== `${UsersRolEnum.hr}` || rol !== `${UsersRolEnum.sales}`) {
                    reject({ message: 'invalid rol assign' });
                }

                newAccount.accountStatus = AccountStatusEnum.waiting;

                const result = await AuthService
                    .invite({
                        email: newAccount.email,
                        role: newAccount.role,
                        inviterId: inviterId
                    });

                return resolve(result);
            } catch (e) {

                reject(e)

            }
        })
    }

    getCabinetUsers(adminId: string): Promise<IUser[]> {
        return CabinetsRepoInstance.getAdminCabinetUsers(adminId);
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


export const CabinetsServiceInstance: CabinetsService = new CabinetsService();