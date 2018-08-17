import { Router, Request, Response } from "express";

import { TasksControllerInstance } from "./tasks.controller";
import { IWriteReadController } from "../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../behavior/routers/w-r-abstract.router";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
import { ITask } from "../../models/task";

export class TasksRouter extends WRAbstractRouter<ITask> {

    constructor(protected _controller: IWriteReadController<ITask>) {
        super(_controller);
        this.resourcePath = 'tasks'
    }


    init(): Router {
        const router: Router = Router({mergeParams:true});
        //Get All Resource
        router.get(`/${this.resourcePath}`, this.getByAssignedUser.bind(this));
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

    getByAssignedUser(req: Request, res: Response): void {
        console.log(req.params)
        console.log(req.path)
        this._controller['getByUserAssigned'](req.params['userId'])
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

}


export const TasksRouterInstance: TasksRouter = new TasksRouter(TasksControllerInstance);
