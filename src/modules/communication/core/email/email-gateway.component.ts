import { IEmailService } from "./i-email-service";


export class EmailGatewayComponent {

    constructor(
        private _emailService: IEmailService
    ) { }
}