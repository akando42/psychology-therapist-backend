import { TODCommunicationModule } from "./core/tod-communication.module";
import { SendGridEmailService } from "./core/email/sendgrid-email.service";
import { EmailGatewayComponent } from "./core/email/email-gateway.component";


//services
const sendgridService = new SendGridEmailService({
    API_KEY: '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',
    sender: 'Therapy on Demand <postmaster@therapyondemand.xyz>'
});


// components
const emailGatewayComponent = new EmailGatewayComponent(sendgridService);

const TODCommunicationModuleInstance = new TODCommunicationModule(emailGatewayComponent);


export {
    emailGatewayComponent,
    TODCommunicationModuleInstance
}