import { ICabinetInvitation } from "../models/cabinet-invitation";

export class InvitationEmailTemplate {
    constructor(public Invitation: ICabinetInvitation) { }

    getHtml(): string {
        return `
        <H2>Invitation </H2><H5>Massage on Demand</H5>
        </br>
        <H4>Hello! you have been invited to join TOD Team as a ${this.Invitation.role}<strong></strong></H4>
        <p>Please Click here to join the Team
        <a  href="http://localhost/4200/invited/${this.Invitation.token}" >Join</a> </p>`;
    }
}