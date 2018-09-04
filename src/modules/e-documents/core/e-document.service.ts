import { IEDocument } from "../../../models/e-document";

export interface IEDocumentService {

    getNDA(): Promise<IEDocument>;

    getBAAContract(): Promise<IEDocument>;

}