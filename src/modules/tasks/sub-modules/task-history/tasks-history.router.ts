import { Router, Request, Response } from "express";
import { ITaskComment } from "../../models/task-comment";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { TasksHistoryControllerInstance, TasksHistoryController } from "./tasks-history.controller";


export class TasksHistoryRouter extends WRAbstractRouter<ITaskComment> {

    constructor(protected _controller: TasksHistoryController) {
        super(_controller);
        this.resourcePath = 'history'
    }


    init(): Router {
        const router: Router = Router({ mergeParams: true });
        //Get Resource
        router.get(`/${this.resourcePath}`, this.getAll.bind(this));
        //Delete Resource
        router.delete(`/${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/${this.resourcePath}/:id`, this.update.bind(this));


        return router;
    }

}


export const TasksHistoryRouterInstance: TasksHistoryRouter = new TasksHistoryRouter(TasksHistoryControllerInstance);
