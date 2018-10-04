
import { IUser } from "../../../../models/user";
import { ActionRequestsRepoInstance } from "../../dao/repositories/action-request.repository";
import { IActionRequest } from "../../../../models/action-request";
import { ICabinetsRepository } from "../../dao/repositories/cabinet.repository";
import { ICabinetService } from "./cabinet.service.interface";
import { ICabinet } from "../../../../models/cabinet";
import { isNullOrUndefined } from "util";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";
import { Validate } from "../../../../behavior/validations/validate.notation";
import { Required } from "../../../../behavior/validations/validation.function";

export class CabinetsImplService implements ICabinetService {



    constructor(private _cabinetRepository: ICabinetsRepository) { }

    async getCabinetByAdminID(userId: number): Promise<ICabinet> {
        if (isNullOrUndefined(userId)) {
            throw new Error('no admin id provided');
        }
        return this._cabinetRepository.getCabinetByAdminID(userId);
    }

    requestActionToCabinetUser(memberId: string, request: IActionRequest) {
        throw new Error("Method not implemented.");
    }

    inviteToCabinet(cabinetInvi: ICabinetInvitation): Promise<ICabinetInvitation> {
        return new Promise<ICabinetInvitation>(async (resolve, reject) => {
            try {
                if (isNullOrUndefined(cabinetInvi)) {
                    return reject({ message: 'no invitation provided' });
                }

                // const invitation


            } catch (error) {

            }
        })
    }

    async createCabinet(cabinet: ICabinet): Promise<ICabinet> {

        if (isNullOrUndefined(cabinet)) {
            throw { message: 'no cabinet provided.' };
        }

        const created: any = await this._cabinetRepository.createCabinet(cabinet);
        return created;

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


    @Validate([{ name: 'Cabiner ID', parameterIndex: 0, cb: Required }])
    async getHRCabinetMembers(cabinetId: any): Promise<any[]> {
        let members = await this._cabinetRepository.getAdminCabinetHRMembers(cabinetId);
        return members;
    }

}


