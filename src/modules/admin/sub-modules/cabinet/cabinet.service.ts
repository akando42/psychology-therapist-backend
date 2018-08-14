import { UsersService } from "../../../users/users.service";
import { UsersRepoInstance } from "../../../users/dao/repositories/users.repository";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { AccountStatusEnum } from "../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../enums/users-rol.enum";
import { IUser } from "../../../../models/user";
import { CabinetsRepoInstance } from "../../dao/repositories/cabinet.repository";

export class CabinetsService extends AuthenticationService {
    constructor() {
        super();
    }

    registerUser(newAccount: INewAccountDTO): Promise<{ success: boolean, message: string, used: boolean }> {
        return new Promise(async (resolve, reject) => {
            try {

                const rol = newAccount.role;
                if (rol !== `${UsersRolEnum.hr}` || rol !== `${UsersRolEnum.sales}`) {
                    reject({ message: 'invalid rol assign' });
                }

                newAccount.accountStatus = AccountStatusEnum.waiting;

                const result = await super.registerUser(newAccount);

                return resolve(result);
            } catch (e) {

                reject(e)

            }
        })
    }

    getCabinetUsers(adminId: string): Promise<IUser[]> {
        return CabinetsRepoInstance.getAdminCabinetUsers(adminId);
    }

}


export const CabinetsServiceInstance: CabinetsService = new CabinetsService();