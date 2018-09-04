import { IDocumentSignService } from "./document-sign.service";
import { TODResponse } from "../../dto/tod-response";
import { IAppointment } from "../../models/appointment";
import { IDocumentSign } from "../../models/e-sign-document";


export abstract class AbstractAppointmentComponent {
    constructor(
        private _documentSignService: IDocumentSignService,
    ) {
    }

    programateAppointment(appointment: IDocumentSign): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {


                const result: TODResponse = {
                    message: "appointment created",
                    payload: null,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong creating the appointment",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        })
    }

}