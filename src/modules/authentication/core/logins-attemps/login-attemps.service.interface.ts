import { ILoginAttemp } from "../../../../models/login-attemp";

export interface ILoginAttempsService {

    /**
     * Create and Transaction.
     * @param Transaction 
     */
    registerLoginAttemp(attemp: ILoginAttemp): Promise<ILoginAttemp>;

}