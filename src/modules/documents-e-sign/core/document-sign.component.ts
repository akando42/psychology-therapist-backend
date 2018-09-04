import { IDocumentSignService } from "./document-sign.service";
import { TODResponse } from "../../../dto/tod-response";
import { IAppointment } from "../../../models/appointment";
import { IDocumentSign } from "../../../models/e-sign-document";


export abstract class AbstractDocumentSignComponent {
    constructor(
        private _documentSignService: IDocumentSignService,
    ) {
    }

    markAsSigned(documetnSignReport: IDocumentSign): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const signed = await this._documentSignService.markAsSigned(documetnSignReport)

                const result: TODResponse = {
                    message: "document signed",
                    payload: null,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        })
    }



}