import { IResetPasswordRequest } from "../../../../../models/reset-password-request";
import { IResetPasswordRequestRepository } from "../../repositories/reset-passwod-request.repositoty.interface";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {}

@ByNameRepository('', {
    converterProps: propsMatch,
    primaryKey: 'ResetPasswordRequest',
    resourceName: 'ResetPasswordRequest'
})
export class MySqlResetPasswordRequestRepository implements IResetPasswordRequestRepository {
    createResetRequest(request: IResetPasswordRequest): Promise<IResetPasswordRequest> {
        return null;
    }

    getRequestByToken(token: string): Promise<IResetPasswordRequest> {
        return null;
    }


}
