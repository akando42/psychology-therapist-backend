import { AbstractRepository } from "../../../core/repositories/repository.abstract";
import { IUserIDVerification } from "../../../models/user-id-verification";


export interface IUsersIDVerificationsRepository {

    createIDVerification(Role: IUserIDVerification): Promise<IUserIDVerification>;

    updateIDVerification(id: number, updated: IUserIDVerification): Promise<any>;

    getReportByID(id: number): Promise<IUserIDVerification>;

    getReportByUserId(id: number): Promise<IUserIDVerification>;
}