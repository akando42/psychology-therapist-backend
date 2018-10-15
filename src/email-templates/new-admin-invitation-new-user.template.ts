
export class NewAdminIvitationNewUserTemplate {
    constructor( public link: string) { }

    getHtml(): string {
        return `
        <H2>Congratulations</H2><H5>Massage on Demand</H5>
        </br>
        <H4>Hello </H4>
        <p>You have been invited to join Therapy on Demand under an Admin Role</p>
        <p>Please Click <a href="${this.link}">here</a> to verify you email Address</p>`;
    }
}