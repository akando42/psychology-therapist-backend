
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { IUser } from "../../../../models/user";
import { ICabinet } from "../../../../models/cabinet";


export interface ICabinetsRepository {


    createCabinet(cabinet: ICabinet): Promise<any>;

    addToCabinet(adminID: number, invitedID: number): Promise<any>;

    getCabinetByAdminID(adminID: number): Promise<any>;

    getAdminCabinetUsers(adminID: any): Promise<IUser[]>;

    getAdminCabinetHRMembers(cabinetId: any): Promise<IUser[]>;

}
