
export class InvitationEmailTemplate {
    constructor(public link: string) { }

    getHtml(): string {
        return `
        <H2>Invitation </H2><H5>Massage on Demand</H5>
        </br>
        <H4>Hello! you have been invited to join TOD Team<strong></strong></H4>
        <p>Please Click here to join the Team<a  href="${this.link}" >Join</a> </p>`;
    }
}