

export interface IResetPasswordRequest {
    requestID?: number;
    requestEmail?: string;
    requestToken?: string;
    requestDate?: number;
    expired?: boolean;
}