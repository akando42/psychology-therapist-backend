import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IUserIDVerification } from "../../../models/user-id-verification";


export abstract class AbstractUsersIDVerificationsRepository extends AbstractRepository<IUserIDVerification>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createIDVerification(Role: IUserIDVerification): Promise<IUserIDVerification>;

    abstract updateIDVerification(id: number, updated: IUserIDVerification): Promise<any>;

    abstract getReportByID(id: number): Promise<IUserIDVerification>;
    
    abstract getReportByUserId(id: number): Promise<IUserIDVerification>;
}