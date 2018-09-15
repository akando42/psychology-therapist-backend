
import { AbstractUsersIDVerificationsRepository } from "../../users-id-verifications.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlUserIDVerificationConverter } from "../../../converters/my-sql/my-sql-user-id-verification.converter";
import { IUserIDVerification } from "../../../../../models/user-id-verification";

export class MySqlUsersIDVerificationsRepository extends AbstractUsersIDVerificationsRepository {

    constructor() {
        super(new GenericDao('USERS_ID_VERIFICATIONS'), new MySqlUserIDVerificationConverter());
    }

    createIDVerification(ver: IUserIDVerification): Promise<IUserIDVerification> {
        return super.create(ver);
    }

    updateIDVerification(id: number, updated: IUserIDVerification): Promise<any> {
        return super.update(id, updated);
    }

}