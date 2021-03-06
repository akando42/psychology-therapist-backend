import { IEmailService } from "./i-email-service";

// poner los metodos aqui
export class EmailGatewayComponent {

    constructor(
        private _emailService: IEmailService
    ) { }

    sentEmailToOne(recipent, data: { subject: string, body: string }): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                //send mail
                const result = await this._emailService.sentMailToOne(recipent, data);
                //keep register of email;    
                // here

                
                return resolve(result);

            } catch (error) {
                return reject(error);
            }
        });
    }
}