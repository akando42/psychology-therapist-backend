import { IDocumentsTypeService } from "./i-documents-type.service";
import { IDocumentType } from "../../../../models/document-type";
import { AbstractDocumentsTypeRepository } from "../../dao/documents-type.repository";


export class DocumentsTypeImplService implements IDocumentsTypeService {

    constructor(private _documentsTypeRepo: AbstractDocumentsTypeRepository) { }

    getAllDocumentsType(): Promise<IDocumentType[]> {
        return new Promise<IDocumentType[]>(async (resolve, reject) => {
            try {
                return resolve(await this._documentsTypeRepo.getAllDocumentTypes());
            } catch (error) {
                return reject(error);
            }
        });
    }
    createDocType(docType: IDocumentType): Promise<any> {
        throw new Error("Method not implemented.");
    }

}