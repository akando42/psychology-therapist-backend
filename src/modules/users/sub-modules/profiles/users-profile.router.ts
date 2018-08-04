import { Router, Request, Response } from "express";
import { UsersProfileControllerInstance } from "./users-profile.controller";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { IUserProfile } from "../../../../models/user-profile";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";

export class UsersProfileRouter extends WRAbstractRouter<IUserProfile> {

    constructor(protected _controller: IWriteReadController<IUserProfile>) {
        super(_controller);
        this.resourcePath = 'profile'
    }


    init(): Router {
        const router: Router = Router();

        router.get(`/users/${this.resourcePath}`, this.getAll.bind(this));
        //Get Resource
        router.get(`/users/:id/${this.resourcePath}`, this.getById.bind(this));
        //Delete Resource
        router.delete(`/users/:id/${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/users/:id/${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/users/:id/${this.resourcePath}`, this.update.bind(this));
        return router;
    }

}


export const UsersProfileRouterInstance: UsersProfileRouter = new UsersProfileRouter(UsersProfileControllerInstance);
