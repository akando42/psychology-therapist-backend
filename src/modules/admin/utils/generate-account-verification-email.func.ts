import { IUser } from "../../../models/user";
import { IAccount } from "../../../models/account";
import { NewAccountVerificationTemplate } from "../../communication/email/templates/new-account-verification.template";


export function generateAccountVerificationEmail(user: IUser, account: IAccount): { subject: string, body: any } {
    const fullName: string = `${user.basicInfo.firstName}  ${user.basicInfo.lastName}`;
    const verificatinLink: string =
        `http://localhost:3000/api/v1/authentication/verify-email?email=${account.email}&hash=${account.verificationHash}'`;

    const email = {

        subject: 'Verification Mail | Massage On Demand',
        body: new NewAccountVerificationTemplate(fullName, verificatinLink).getHtml()
    }

    return email;
}