import { AbtractCommunicationModule } from "./comunication.module";
import { EmailGatewayComponent } from "./email/email-gateway.component";


export class TODCommunicationModule extends AbtractCommunicationModule {

    constructor(
        _emailGatewayComponent: EmailGatewayComponent
    ) {
        super(_emailGatewayComponent);
    }
    sendEmailToOne(email: string, data: { subject: string, body: string }): Promise<any> {
        return this.emailGatewayComponent.sentEmailToOne(email, data);
    }
}