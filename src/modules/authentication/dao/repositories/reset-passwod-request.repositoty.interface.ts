
import { IResetPasswordRequest } from "../../../../models/reset-password-request";
import { AbstractRepository } from "../../../../core/repositories/repository.abstract";


export abstract class AbstractResetPasswordRequestRepository extends AbstractRepository<IResetPasswordRequest> {
    constructor(dao, converter) {
        super(dao, converter);
    }
    abstract getRequestByToken(token: string): Promise<IResetPasswordRequest>;

}