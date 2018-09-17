import { IDocumentCategory } from "../../../../models/document-category";


export interface IDocumentsCategoriesService {

    createCategory(category: IDocumentCategory): Promise<number>;

    updateCategory(categoryId: number, category: IDocumentCategory): Promise<number>;

    deleteCategory(categoryId: number): Promise<number>;

}