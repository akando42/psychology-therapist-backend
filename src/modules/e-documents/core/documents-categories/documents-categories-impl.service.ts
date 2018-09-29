import { IDocumentsCategoriesService } from "./i-documents-categories.service";
import { AbstractDocumentsCategoriesRepository } from "../../dao/documents-categories.repository";
import { IDocumentCategory } from "../../../../models/document-category";
import { isNullOrUndefined } from "util";


export class DocumentsCategoriesImplService implements IDocumentsCategoriesService {


    constructor(private _documentCategoriesRepository: AbstractDocumentsCategoriesRepository) { }


    getAllDocumentsCategories(): Promise<IDocumentCategory[]> {
        return this._documentCategoriesRepository.getAllDocumentsCategories();
    }

    async createCategory(category: IDocumentCategory): Promise<any> {

        if (isNullOrUndefined(category)) {
            throw new Error('no category provide');
        }
        console.log('service',category)
        const created = await this._documentCategoriesRepository.create(category);
        return await this._documentCategoriesRepository.getCategoryById(created);

    }
    updateCategory(categoryId: number, category: IDocumentCategory): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: number): Promise<number> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if (isNullOrUndefined(categoryId)) {
                    return reject({ message: 'no id provided provided' });
                }
                const deleted = await this._documentCategoriesRepository.deleteDocumentCategory(categoryId);
                return resolve(true);

            } catch (error) {
                console.log(error)
                return reject(error);
            }
        });
    }

}