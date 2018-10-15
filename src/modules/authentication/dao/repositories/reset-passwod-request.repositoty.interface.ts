
import { IResetPasswordRequest } from "../../../../models/reset-password-request";


export interface IResetPasswordRequestRepository {

    getRequestByToken(token: string): Promise<IResetPasswordRequest>;

    createResetRequest(request: IResetPasswordRequest): Promise<IResetPasswordRequest>;

}