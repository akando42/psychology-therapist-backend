import { Router, Request, Response } from "express";
import { TODDocumentsModule } from ".";




export class DocumentsRouter {
    constructor() { }

    init(): Router {
        let router = Router();
        router.get('/documents/types', this.getDocumentsTypes.bind(this));

        //categories
        router.get('/documents/categories', this.getDocumentsCategories.bind(this));
        router.post('/documents/categories', this.createDocumentCategory.bind(this));
        return router;
    }


    getDocumentsTypes(req: Request, res: Response): void {
        TODDocumentsModule.getAllDocumentsType()
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
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
}