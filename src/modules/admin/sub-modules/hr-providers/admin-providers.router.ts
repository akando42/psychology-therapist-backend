import { Router, Request, Response } from "express";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { IProvider } from "../../../../models/provider";
import { AdminProvidersControllerInstance } from "./admin-providers.controller";

export class AdminProvidersRouter extends WRAbstractRouter<IProvider> {


    constructor(protected _controller: IWriteReadController<IProvider>) {
        super(_controller);

        this.resourcePath = 'providers';
    }


    init(): Router {
        const router: Router = Router();
        //Get Resource
        router.get(`/admin/${this.resourcePath}`, this.getAll.bind(this));
        return router;
    }


    getAll(req: Request, res: Response): void {
        req.query['hrAcceptanceID'] = req['adminId'];
        super.getAll(req, res);
    }

}


export const AdminProvidersRouterInstance: AdminProvidersRouter = new AdminProvidersRouter(AdminProvidersControllerInstance);
