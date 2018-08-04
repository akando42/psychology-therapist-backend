import { Router, Request, Response } from "express";
import { UsersProfileControllerInstance } from "./users-profile.controller";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { IAdminProfile } from "../../../../models/user-profile";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";

export class AdminProfileRouter extends WRAbstractRouter<IAdminProfile> {


    constructor(protected _controller: IWriteReadController<IAdminProfile>) {
        super(_controller);

        this.resourcePath = 'profile';
    }


    init(): Router {
        const router: Router = Router();

        router.get(`/users/${this.resourcePath}`, this.getAll.bind(this));
        //Get Resource
        router.get(`/Users/:Users_id/${this.resourcePath}`, this.getById.bind(this));
        //Delete Resource
        router.delete(`/Users/:Users_id//${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/Users/:Users_id//${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/Users/:Users_id//${this.resourcePath}`, this.update.bind(this));
        return router;
    }

}


export const AdminProfileRouterInstance: AdminProfileRouter = new AdminProfileRouter(UsersProfileControllerInstance);
