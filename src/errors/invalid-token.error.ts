import { HttpResponseCodes } from "@core/enums/http-response-codes.enum";
import { IError } from "./error.interface";



export class InvalidTokenError implements IError {
    public code: number;
    public message: string;
    constructor(message: string = "The accoun token is not valid.") {
        this.code = HttpResponseCodes.account_token_error;
        this.message = message;
    }
}