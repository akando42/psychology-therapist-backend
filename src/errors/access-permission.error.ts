import { IError } from "./error.interface";
import { HttpResponseCodes } from "@core/enums/http-response-codes.enum";


export class AccessPermissionError implements IError {
    code: number;
    message: string;
    constructor(message: string = "You dont have valid access rights") {
        this.code = HttpResponseCodes.accessError;
        this.message = message;

    }
}