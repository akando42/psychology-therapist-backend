

export interface IResetPasswordRequestMySql {
    ResetPasswordRequestID?: number;
    ResetPasswordRequestDate?: number;
    ResetPasswordRequestEmail?: string;
    ResetPasswordRequestToken?: string;
    ResetPasswordRequestExpired?: boolean;
}