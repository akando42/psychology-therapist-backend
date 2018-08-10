import { Router, Request, Response } from "express";

import { IWriteReadController } from "../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../behavior/routers/w-r-abstract.router";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
import { INotification } from "../../models/notification";
import { NotificationsControllerInstance } from "./notifications.controller";

export class NotificationsRouter extends WRAbstractRouter<INotification> {

    constructor(protected _controller: IWriteReadController<INotification>) {
        super(_controller);
        this.resourcePath = 'notifications'
    }


    init(): Router {
        const router: Router = Router();
        //Get All Resource
        router.get(`/${this.resourcePath}`, this.getAll.bind(this));
        //Get Resource
        router.get(`/${this.resourcePath}/:id/${this.resourcePath}`, this.getById.bind(this));
        //Delete Resource
        router.delete(`/${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/${this.resourcePath}/:id`, TokenValidationMiddleware, this.update.bind(this));


        return router;
    }

}


export const NotificationsRouterInstance: NotificationsRouter =
    new NotificationsRouter(NotificationsControllerInstance);
