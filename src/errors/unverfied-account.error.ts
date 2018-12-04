
import { IError } from "./error.interface";
import { HttpResponseCodes } from "../enums/http-response-codes.enum";



export class UnverifiedAccountError implements IError {
    public code: number;
    public message: string;
    constructor(message: string = "The email account its not been verified yet.") {
        this.code = HttpResponseCodes.account_token_error;
        this.message = message;
    }
}