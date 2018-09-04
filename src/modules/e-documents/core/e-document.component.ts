import { IEDocumentService } from "./e-document.service";
import { TODResponse } from "../../../dto/tod-response";
import { IEDocument } from "../../../models/e-document";


export abstract class AbstractEDocumentComponent {
    constructor(
        private _documentSignService: IEDocumentService,
    ) {
    }

    markAsSigned(documetnSignReport: IEDocument): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                // const signed = await this._documentSignService.markAsSigned(documetnSignReport)

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