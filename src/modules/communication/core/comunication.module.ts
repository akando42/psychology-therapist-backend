
import { EmailGatewayComponent } from "./email/email-gateway.component";



export abstract class AbtractCommunicationModule {
    constructor(
        protected emailGatewayComponent: EmailGatewayComponent
    ) {
    }

    abstract sendEmailToOne(email: string, data: { subject: string, body: string }): Promise<any>;

}