
import { IUsersIDVerificationsRepository } from "../../users-id-verifications.repository";
import { IUserIDVerification } from "../../../../../models/user-id-verification";
import { IUserIDVerificationMySql } from "../models/my-sql-user-id-verification";
import { UpdateQuery } from "../../../../../query-spec/my-sql/update.query";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";

const propsMap = {
    id: 'UserIdVerificationID',
    userId: 'UserID',
    status: 'UserIdVerificationStatus',

}

@Repository('USERS_ID_VERIFICATIONS')
export class MySqlUsersIDVerificationsRepository implements IUsersIDVerificationsRepository {


    createIDVerification(ver: IUserIDVerification): Promise<IUserIDVerification> {
        return null;
    }

    updateIDVerification(id: number, updated: IUserIDVerification): Promise<any> {
        return null;
    }

    getReportByUserId(id: number): Promise<IUserIDVerification> {
        return null;
    }

    getReportByID(id: number): Promise<IUserIDVerification> {
        return null;
    }

}