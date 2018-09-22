import { Router, Request, Response } from "express";
import { TODAdminModule } from ".";



export class AdminRouter {
    constructor() { }

    init(): Router {
        let router = Router();

        router.post('/cabinets', this.createCabinet.bind(this));

        return router;
    }

    createCabinet(req: Request, res: Response): void {
        TODAdminModule.createAdminProfile(req.body)
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }


}