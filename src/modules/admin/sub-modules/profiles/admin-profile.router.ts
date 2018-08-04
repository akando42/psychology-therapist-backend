import { Router, Request, Response } from "express";
import { AdminProfileControllerInstance } from "./admin-profile.controller";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { IAdminProfile } from "../../../../models/admin-profile";

export class AdminProfileRouter extends WRAbstractRouter<IAdminProfile> {


    constructor(protected _controller: IWriteReadController<IAdminProfile>) {
        super(_controller);

        this.resourcePath = 'profile';
    }


    init(): Router {
        const router: Router = Router();

        router.get(`/admin/${this.resourcePath}`, this.getAll.bind(this));
        //Get Resource
        router.get(`/admin/:id/${this.resourcePath}`, this.getById.bind(this));
        //Delete Resource
        router.delete(`/admin/:id//${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/admin/:id//${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/admin/:id//${this.resourcePath}`, this.update.bind(this));
        return router;
    }

}


export const AdminProfileRouterInstance: AdminProfileRouter = new AdminProfileRouter(AdminProfileControllerInstance);
