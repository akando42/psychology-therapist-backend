import { EmailService } from "../../../behavior/services/email.service";
const mailgun = require('mailgun-js');
import { port } from "_debugger";

export class MailGunEmailService implements EmailService {

    public client: any;

    constructor(creds: { API_KEY: string, USERNAME: string }) {
        console.log(creds)
        this.client = mailgun({
            username: creds.USERNAME,
            apiKey: creds.API_KEY
        })
    }

    sentToMany(recipents: string[], data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {

                var data = {
                    from: 'Therapy on Demand <postmaster@therapyondemand.xyz>',
                    to: recipents,
                    subject: data.subject,
                    html: data.body
                };

                this.client.message.create(data)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } catch (error) {
                //too handle errors here
                console.log(error)
            }
        });

    }

    sentToOne(email: string, data: { subject: string, body: string }): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {

                var data = {
                    from: 'Therapy on Demand <postmaster@therapyondemand.xyz>',
                    to: email,
                    subject: data.subject,
                    html: data.body
                };

                this.client.message.create(data)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } catch (error) {
                //too handle errors here
                console.log(error)
            }
        });
    }
};

export const MailGunEmailServiceInstance: MailGunEmailService = new MailGunEmailService({
    API_KEY: process.env.MAILGUN_API_KEY,
    USERNAME: process.env.MAILGUN_USERNAME
})