import { Router, Request, Response } from "express";
import { TODDocumentsModule } from ".";
import { IDocumentCategory } from "../../models/document-category";
import { IDocumentType } from "../../models/document-type";




export class DocumentsRouter {
    constructor() { }

    init(): Router {
        let router = Router();
        //required documents
        router.get('/documents/required', this.getRequiredDocuments.bind(this));

        //system documents
        router.get('/documents/system', this.getSystemDocuments.bind(this));
        router.post('/documents/system', this.uploadSystemDocuments.bind(this));

        //types
        router.get('/documents/types', this.getDocumentsTypes.bind(this));
        router.post('/documents/types', this.createDocumentsType.bind(this));

        //categories
        router.get('/documents/categories', this.getDocumentsCategories.bind(this));
        router.post('/documents/categories', this.createDocumentCategory.bind(this));
        router.delete('/documents/categories/:id', this.deleteDocumentCategory.bind(this));
        return router;
    }


    async createDocumentsType(req: Request, res: Response) {
        try {
            let response = await TODDocumentsModule.createTypes(req.body);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);

        }
    }

    async getDocumentsTypes(req: Request, res: Response) {
        try {
            let response = null;
            let query = <IDocumentType>req.query;
            if (query) {
                response = await TODDocumentsModule.getAllDocumentsTypeByCategory(query.categoryId);
            } else {
                response = await TODDocumentsModule.getAllDocumentsType();
            }
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);

        }
    }

    async getSystemDocuments(req: Request, res: Response) {
        try {
            let response = await TODDocumentsModule.getSystemDocuments();
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getRequiredDocuments(req: Request, res: Response) {
        try {
            const { role } = req.query;
            console.log(role)
            let response = await TODDocumentsModule.getRequiredDocumentsByRole(role);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);
        }
    }


    async uploadSystemDocuments(req: Request, res: Response) {
        try {
            const { files, body } = <any>req;
            const { document } = files;
            const docInfo = JSON.parse(body.docInfo);
            let obj = {
                raw: {
                    mimeType: document.mimetype,
                    blob: document.data
                },
                typeId: docInfo.typeId,
                name: docInfo.name
            }
          
            let response = await TODDocumentsModule.uploadSystemDocuments(obj);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getDocumentsCategories(req: Request, res: Response): void {
        TODDocumentsModule.getAllDocumentsCategories()
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }


    createDocumentCategory(req: Request, res: Response): void {
        TODDocumentsModule.createCategory(req.body)
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    deleteDocumentCategory(req: Request, res: Response): void {
        TODDocumentsModule.deleteCategory(req.params['id'])
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
}