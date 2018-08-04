import { IError } from "./error.interface";
import { HttpResponseCodes } from "../enums/http-response-codes.enum";



export class InvalidTokenError implements IError {
    public code: number;
    public message: string;
    constructor(message: string = "The accoun token is not valid.") {
        this.code = HttpResponseCodes.account_token_error;
        this.message = message;
    }
}