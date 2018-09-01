import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IResetPasswordRequest } from "../../../../models/reset-password-request";
import { IResetPasswordRequestMySql } from "../../dao/my-sql/models/reset-password-request-my-sql";


export class ResetPasswordRequestConverter implements IDualConverter<IResetPasswordRequest, IResetPasswordRequestMySql> {
    converDomainToDBModel(raw: IResetPasswordRequest): IResetPasswordRequestMySql {
        if (!raw) { return null }
        return {
            ResetPasswordRequestDate: raw.requestDate,
            ResetPasswordRequestID: raw.requestID,
            ResetPasswordRequestToken: raw.requestToken,
            ResetPasswordRequestExpired: raw.expired,
            ResetPasswordRequestEmail: raw.requestEmail
        }
    }
    convertDBModelToDomain(raw: IResetPasswordRequestMySql): IResetPasswordRequest {
        if (!raw) { return null }
        return {
            requestDate: raw.ResetPasswordRequestDate,
            requestID: raw.ResetPasswordRequestID,
            requestToken: raw.ResetPasswordRequestToken,
            expired: raw.ResetPasswordRequestExpired,
            requestEmail: raw.ResetPasswordRequestEmail
        }
    }
    converManyDomainToDBModel(raw: IResetPasswordRequest[]): IResetPasswordRequestMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IResetPasswordRequestMySql[]): IResetPasswordRequest[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const ResetPasswordRequestsConverterInstance: ResetPasswordRequestConverter = new ResetPasswordRequestConverter();