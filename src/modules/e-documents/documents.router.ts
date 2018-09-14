import { Router, Request, Response } from "express";
import { TODDocumentsModule } from ".";


export class DocumentsRouter {

    constructor() { }

    init(): Router {
        const router: Router = Router();

        router.get('/documents/types', (req, res) => this.getAllDocuments(req, res));

        return router;

    }

    getAllDocuments(req: Request, res: Response): void {
        TODDocumentsModule.getAllDocumentsType()
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);
            }).catch((err) => {
                //handler error propertly
                res.status(500).json(err)
                console.log(err)
            });
    }


}