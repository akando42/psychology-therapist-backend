
import { IError } from "./error.interface";
import { HttpResponseCodes } from "../enums/http-response-codes.enum";



export class InvalidCredentialsError implements IError {
    public code: number;
    public message: string;
    constructor(message: string = "The email or password dont match.") {
        this.code = 403;
        this.message = message;
    }
}