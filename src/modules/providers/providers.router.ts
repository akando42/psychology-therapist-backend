import { Router, Request, Response } from "express";

import { ProvidersControllerInstance } from "./providers.controller";
import { IWriteReadController } from "../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../behavior/routers/w-r-abstract.router";
import { IProvider } from "../../models/provider";

export class ProvidersRouter extends WRAbstractRouter<IProvider> {

    constructor(protected _controller: IWriteReadController<IProvider>) {
        super(_controller);
        this.resourcePath = 'profile'
    }


    init(): Router {
        const router: Router = Router();

        router.get(`/${this.resourcePath}/`, this.getAll.bind(this));
        //Get Resource
        router.get(`/${this.resourcePath}/:id/${this.resourcePath}`, this.getById.bind(this));
        //Delete Resource
        router.delete(`/${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/${this.resourcePath}/:id`, this.update.bind(this));

        return router;
    }

}


export const ProvidersRouterInstance: ProvidersRouter = new ProvidersRouter(ProvidersControllerInstance);
