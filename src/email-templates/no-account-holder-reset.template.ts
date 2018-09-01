
export class NoAccountHolderResetTemplate {
    constructor(public email: string) { }

    getHtml(): string {
        return `
        <H2>Verify Your Email Address</H2><H5>Massage on Demand</H5>
        </br>
        <H4>Hello <strong></strong></H4>
        <p>Thanks for join  us</p>
        <p>Please Click <a >here</a> to verify you email Address</p>`;
    }
}