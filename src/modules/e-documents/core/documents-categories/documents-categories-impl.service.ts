import { IDocumentsCategoriesService } from "./i-documents-categories.service";
import { AbstractDocumentsCategoriesRepository } from "../../dao/documents-categories.repository";
import { IDocumentCategory } from "../../../../models/document-category";
import { isNullOrUndefined } from "util";


export class DocumentsCategoriesImplService implements IDocumentsCategoriesService {


    constructor(private _documentCategoriesRepository: AbstractDocumentsCategoriesRepository) { }


    getAllDocumentsCategories(): Promise<IDocumentCategory[]> {
        return this._documentCategoriesRepository.getAllDocumentsCategories();
    }

    createCategory(category: IDocumentCategory): Promise<number> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if (isNullOrUndefined(category)) {
                    return reject({ message: 'no category provide' });
                }

                const created = await this._documentCategoriesRepository.create(category);
                return resolve(await this._documentCategoriesRepository.getCategoryById(created));

            } catch (error) {
                return reject(error);
            }
        })
    }
    updateCategory(categoryId: number, category: IDocumentCategory): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

}