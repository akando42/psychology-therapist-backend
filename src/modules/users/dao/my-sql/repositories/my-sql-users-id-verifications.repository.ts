
import { IUsersIDVerificationsRepository } from "../../users-id-verifications.repository";
import { IUserIDVerification } from "../../../../../models/user-id-verification";
import { IUserIDVerificationMySql } from "../models/my-sql-user-id-verification";
import { UpdateQuery } from "../../../../../query-spec/my-sql/update.query";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";

const propsMap = {
    id: 'UserIdVerificationID',
    userId: 'UserID',
    status: 'UserIdVerificationStatus',

}

@Repository('USERS_ID_VERIFICATIONS')
export class MySqlUsersIDVerificationsRepository implements IUsersIDVerificationsRepository {

    @CreateQuery({ return: true, primary: 'UserIdVerificationID' }, propsMap)
    createIDVerification(ver: IUserIDVerification): Promise<IUserIDVerification> { return null; }

    updateIDVerification(id: number, updated: IUserIDVerification): Promise<any> {
        return null;
    }

    @Convert(propsMap)
    @GetByQuery({ UserID: 0 })
    getReportByUserId(id: number): Promise<IUserIDVerification> { return null; }

    @Convert(propsMap)
    @GetByQuery({ UserIdVerificationID: 0 })
    getReportByID(id: number): Promise<IUserIDVerification> {
        return null;
    }

}