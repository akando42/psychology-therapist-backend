import { ILoginAttemp } from "../../../../models/login-attemp";
import { ILoginAttempsService } from "./login-attemps.service.interface";
import { TODResponse } from "../../../../dto/tod-response";

export abstract class AbstractLoginAttempsComponent {
    constructor(
        private _LoginAttempService: ILoginAttempsService) {
    }

    registerLoginAttemp(LoginAttemp: ILoginAttemp): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const LoginAttempCreated: ILoginAttemp = await this._LoginAttempService.registerLoginAttemp(LoginAttemp);

                const result: TODResponse = {
                    message: "attemp to login",
                    payload: LoginAttempCreated,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong creating the LoginAttemp",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        })
    }

}