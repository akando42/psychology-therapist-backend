import { IEmailService } from "./i-email-service";

var mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_USERNAME
});


export class MailGunEmailService implements IEmailService {


    public client: any;

    constructor(creds?: { API_KEY: string, USERNAME: string }) {
        // this.client = mailgun({
        //     username: creds.USERNAME,
        //     apiKey: creds.API_KEY
        // })
    }

    sentMailToMany(recipents: string[], data: any): Promise<any> {
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

    sentMailToOne(recipent: string, data: { subject: string, body: string }): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            var email = {
                from: 'Therapy on Demand <postmaster@therapyondemand.xyz>',
                to: recipent,
                subject: data.subject,
                html: data.body
            };
            return mailgun.messages().send(email)

        });
    }
};

export const MailGunEmailServiceInstance: MailGunEmailService = new MailGunEmailService()