import { IEDocument } from "../../../models/e-document";

export interface IEDocumentService {

    getNDA(): Promise<IEDocument>;

    getBAAContract(): Promise<IEDocument>;

    createContract(contract: IEDocument): Promise<IEDocument>;

    updateContract(id: any, updated: IEDocument): Promise<IEDocument>;

    invalidContract(id: any): Promise<IEDocument>;


}