import { SendGridEmailServiceInstace } from "../../communication/email/sendgrid-email.service";


export class EmailService {

    static sentToOne(email: string, data: any): Promise<any> {
        return SendGridEmailServiceInstace.sentToOne(email, data)
    }
}