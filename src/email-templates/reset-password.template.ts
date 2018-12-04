
export class ResetPasswordTemplate {
    constructor(public resetLink) { }

    getHtml(): string {
        return `
        <H2>Reset Link</H2><H5>Massage on Demand</H5>
        </br>
        <p>You have requested to reset you password</p>
        <p>Please Click <a href="${this.resetLink}">here</a> to confirm you email Address</p>`;
    }
}