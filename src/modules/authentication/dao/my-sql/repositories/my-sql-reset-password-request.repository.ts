import { IResetPasswordRequest } from "../../../../../models/reset-password-request";
import { GenericDao } from "../../../../../core/mysql/generic.dao";
import { ResetPasswordRequestsConverterInstance } from "../../../converters/my-sql/reset-password-request.converter";
import { AbstractResetPasswordRequestRepository } from "../../repositories/reset-passwod-request.repositoty.interface";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";



export class MySqlResetPasswordRequestRepository extends AbstractResetPasswordRequestRepository {
    constructor() {
        super(new GenericDao('RESET_PASSWORD_REQUEST'), ResetPasswordRequestsConverterInstance);
    }

    getRequestByToken(token: string): Promise<IResetPasswordRequest> {
        return super.getBy(new GetByQuery({ ResetPasswordRequestToken: token })
            .toDBQuery('RESET_PASSWORD_REQUEST'));
    }
}


export const MySqlResetPasswordRequestRepositoryInstance: MySqlResetPasswordRequestRepository
    = new MySqlResetPasswordRequestRepository();