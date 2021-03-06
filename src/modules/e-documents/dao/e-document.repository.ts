import { AbstractRepository } from "../../../core/repositories/repository.abstract";
import { IEDocument } from "../../../models/e-document";

export interface AbstractEDocumentRepository {

    createDocumentRef(document: IEDocument): Promise<IEDocument>;

    getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument>;


}