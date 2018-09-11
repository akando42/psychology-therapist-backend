import * as sendgrid from '@sendgrid/mail';
import { IEmailService } from './i-email-service';

// TOO IMPLEMENTAR METODOS DE MANDAR EMAIL EXPORTARLOS EN INDEX
// USER EL RECORD SERVICE EN EL EMAIL SERVICIO, CREAR EMAIL COMPONENT QUE SE ENCCARGA
// DE CREAR TEMPLATES Y TODO ESO
export class SendGridEmailService implements IEmailService {

    public email: string;

    constructor(config: { API_KEY: string, sender: string }) {
        this.email = config.sender;
        sendgrid.setApiKey(config.API_KEY);
    }

    sentMailToMany(recipents: string[], data: { subject: string, body: string }): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                //implement
            } catch (error) {
                //too handle errors here
                console.log(error)
            }
        });

    }
    sentMailToOne(recipent: string, email: { subject: string, body: string }): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            console.log(email)
            try {
                const msg = {
                    to: recipent,
                    from: this.email,
                    subject: email.subject,
                    text: 'and easy to do anywhere, even with Node.js',
                    html: email.body,
                };

                return sendgrid.send(msg);

            } catch (error) {
                //too handle errors here
                console.log(error)
            }
        });
    }
};


export const SendGridEmailServiceInstace: SendGridEmailService =
    new SendGridEmailService(
        {
            API_KEY: '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',
            sender: 'Therapy on Demand <postmaster@therapyondemand.xyz>'
        })