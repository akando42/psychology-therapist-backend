import { Router, Request, Response } from "express";

import { UsersControllerInstance } from "./users.controller";
import { IWriteReadController } from "../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../behavior/routers/w-r-abstract.router";
import { IUser } from "../../models/user";
import { roleValidationMiddleware } from "../../middlewares/role-validation.middleware";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";

export class UsersRouter extends WRAbstractRouter<IUser> {

    constructor(protected _controller: IWriteReadController<IUser>) {
        super(_controller);
        this.resourcePath = 'users'
    }


    init(): Router {
        const router: Router = Router();
        //Get All Resource
        router.get(`/${this.resourcePath}/`, this.getAll.bind(this));
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


export const UsersRouterInstance: UsersRouter = new UsersRouter(UsersControllerInstance);