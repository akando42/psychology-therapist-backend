import { IDocumentsTypeService } from "./i-documents-type.service";
import { IDocumentType } from "../../../../models/document-type";
import { AbstractDocumentsTypeRepository } from "../../dao/documents-type.repository";
import { isNullOrUndefined } from "util";
import { nullPropValidator } from "../../../../validators/null-prop.validator";


export class DocumentsTypeImplService implements IDocumentsTypeService {

    constructor(private _documentsTypeRepo: AbstractDocumentsTypeRepository) { }

    async  getAllDocumentsTypeByCategory(categoryId: number): Promise<IDocumentType[]> {
        if (isNullOrUndefined(categoryId)) {
            throw { message: 'no category provided on query' };
        }

        const types = this._documentsTypeRepo.getAllDocumentTypesByCategory(categoryId);
        return types;
    }

    getAllDocumentsType(): Promise<IDocumentType[]> {
        return new Promise<IDocumentType[]>(async (resolve, reject) => {
            try {

                return resolve(await this._documentsTypeRepo.getAllDocumentTypes());
            } catch (error) {
                return reject(error);
            }
        });
    }
    async createDocType(docType: IDocumentType): Promise<any> {

        const validationResult = nullPropValidator(docType, ['categoryId']);

        if (!validationResult.valid) {
            throw {
                message: 'missing fields',
                fields: validationResult.missingField,
                request_payload: docType
            };

        }

        if (isNullOrUndefined(docType)) {
            throw { message: 'no type provided' };
        }
        const type: any = await this._documentsTypeRepo.createType(docType);
        return type;
    }

}