
import { AbstractUsersIDVerificationsRepository } from "../../users-id-verifications.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlUserIDVerificationConverter } from "../../../converters/my-sql/my-sql-user-id-verification.converter";
import { IUserIDVerification } from "../../../../../models/user-id-verification";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { IUserIDVerificationMySql } from "../models/my-sql-user-id-verification";
import { UpdateQuery } from "../../../../../query-spec/my-sql/update.query";

export class MySqlUsersIDVerificationsRepository extends AbstractUsersIDVerificationsRepository {


    constructor() {
        super(new GenericDao('USERS_ID_VERIFICATIONS'), new MySqlUserIDVerificationConverter());
    }

    createIDVerification(ver: IUserIDVerification): Promise<IUserIDVerification> {
        return super.create(ver);
    }

    updateIDVerification(id: number, updated: IUserIDVerification): Promise<any> {
        return super.update(
            new UpdateQuery(<IUserIDVerificationMySql>{ UserIdVerificationID: id })
                .toDBQuery('USERS_ID_VERIFICATIONS'),
            updated);
    }

    getReportByUserId(id: number): Promise<IUserIDVerification> {
        return super.getBy(
            new GetByQuery(<IUserIDVerificationMySql>{ UserIdVerificationUser: id })
                .toDBQuery('USERS_ID_VERIFICATIONS'));
    }

    getReportByID(id: number): Promise<IUserIDVerification> {
        return super.getBy(new GetByQuery({}).toDBQuery('USERS_ID_VERIFICATIONS'));
    }

}